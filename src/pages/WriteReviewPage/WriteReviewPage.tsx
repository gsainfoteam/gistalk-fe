import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import NavigationHeader from "@components/NavigationHeader";
import Title from "@components/Title";
import {
  COURSE_TAKEN_SEMESTER,
  COURSE_TAKEN_YEAR,
  RATING_QUESTIONS,
  RECOMMEND_TEXT,
} from "./WriteReviewPage.const";
import {
  Button,
  Description,
  FormField,
  LeftLabel,
  RightLabel,
  StarRating,
  TextArea,
  Wrapper,
  Label,
  Form,
  RadioContainer,
  RadioButton,
  RadioCheckText,
  Circle,
} from "./WriteReviewPage.styled";
import ReactSelect from "react-select";
import { convertLectureCodeToList } from "@/utils";
import { useIsMutating, useMutation, useQuery } from "@tanstack/react-query";
import { getLectureSingleInfo, postLectureEvaluation } from "@/apis/lectures";
import { REDIRECT_PATH } from "@/constants/localStorageKeys";
import { AxiosError, isAxiosError } from "axios";

const initialRatings = RATING_QUESTIONS.reduce((acc, question) => {
  acc[question.id] = 0;
  return acc;
}, {} as { [key: number]: number | null });

interface Option {
  value: number;
  label: string;
}

interface SelectedValues {
  year: Option | null;
  semester: Option | null;
}

export function WriteReviewPage() {
  const [ratings, setRatings] = useState(initialRatings);
  const [selectedValues, setSelectedValues] = useState({
    year: null,
    semester: null,
  });
  const [recommendation, setRecommendation] = useState(-1); // 0 비추천, 1 추천, 2 보통 (왜 반대지?)
  const [text, setText] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const params = useParams() as { id: string };
  const id = Number(params.id);
  const isMutating = useIsMutating();

  localStorage.removeItem(REDIRECT_PATH); // 로그인 페이지에서 리다이렉션 링크가 걸려 들어온 경우 제거

  useEffect(() => {
    window.scrollTo(0, 0); // 리스트뷰에서 강의평을 들어갈 경우 스크롤 위치가 그대로 남아있는 것을 방지
  }, []);

  const handleRatingChange = (questionId: number, newRating: number) => {
    setRatings((prevRatings) => ({ ...prevRatings, [questionId]: newRating }));
  };

  const handleSelectChange = (
    fieldName: keyof SelectedValues,
    selectedOption: Option | null
  ) => {
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [fieldName]: selectedOption,
    }));
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setText(event.target.value);

  const handleCheckboxChange = (id: number) => {
    setSelectedId(id === selectedId ? null : id);
  };

  const {
    isLoading: isLectureInfoLoading,
    data: lectureInfoData,
    isError: isErrorLoadingLectureInfo,
  } = useQuery({
    queryKey: [`getLectureSingleInfo/${id}`],
    queryFn: () => getLectureSingleInfo(id),
    retry: 0,
  });

  const { data: lectureInfo } = { ...lectureInfoData };

  const checkValidation = () => {
    if (selectedId === null) {
      alert("교수자를 선택해주세요");
      return false;
    }
    if (selectedValues.year === null) {
      alert("수강 년도를 선택해주세요");
      return false;
    }
    if (selectedValues.semester === null) {
      alert("수강 학기를 선택해주세요");
      return false;
    }
    if (Object.values(ratings).some((rating) => rating === 0)) {
      alert("평가하지 않은 항목이 있습니다. 모든 항목을 평가해주세요.");
      return false;
    }
    if (recommendation === -1) {
      alert("강의를 추천하시는지 선택해주세요");
      return false;
    }
    if (text === "") {
      alert("총평을 작성해주세요");
      return false;
    }
    // 15자 이상으로 작성해야 함
    if (text.length < 15) {
      alert("총평을 15자 이상으로 작성해주세요");
      return false;
    }
    return true;
  };

  //TODO: 토큰 만료 상황 대비해서 로그인 페이지로 리다이렉트

  const addEvaluationMutate = useMutation({
    mutationFn: () =>
      postLectureEvaluation(
        text,
        id,
        selectedId,
        selectedValues.semester ? (selectedValues.semester as Option).value : 0,
        selectedValues.year ? (selectedValues.year as Option).label : "2000",
        recommendation,
        ratings
      ),

    onSuccess: (data, variables, context) => {
      alert("강의평가가 성공적으로 등록되었습니다");

      window.location.replace(`/${id}/evaluation`);
    },
    onError: (error: unknown, variables, context) => {
      if (isAxiosError(error)) {
        const errorMessage = error.response?.data.message;
        if (errorMessage === "Unauthorized") {
          alert(`토큰이 만료됐습니다. 다시 로그인 후 이용 부탁드립니다.`);
        } else {
          alert(`강의평가 등록에 실패했습니다 ${errorMessage}`);
        }
      }
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const isValid = checkValidation();

    if (isValid) {
      addEvaluationMutate.mutate();
    }
  };

  return (
    <>
      <NavigationHeader text={"강의평 작성"} />
      <Wrapper>
        {!isLectureInfoLoading && lectureInfo && (
          <Title
            handleCheckboxChange={handleCheckboxChange}
            subjectTitle={lectureInfo[0].lecture_name}
            professorInfo={lectureInfo[0].prof}
            subjectCode={convertLectureCodeToList(lectureInfo[0].lecture_code)}
            selectedId={selectedId}
          />
        )}

        <Form onSubmit={handleSubmit}>
          <FormField>
            <Label>수강 년도</Label>
            <ReactSelect
              options={COURSE_TAKEN_YEAR}
              placeholder={"수강 년도를 선택해주세요"}
              value={selectedValues.year}
              onChange={(selectedOption) =>
                handleSelectChange("year", selectedOption)
              }
            />
          </FormField>

          <FormField>
            <Label>수강 학기</Label>
            <ReactSelect
              options={COURSE_TAKEN_SEMESTER}
              placeholder={"수강 학기를 선택해주세요"}
              value={selectedValues.semester}
              onChange={(selectedOption) =>
                handleSelectChange("semester", selectedOption)
              }
            />
          </FormField>
          {RATING_QUESTIONS.map((question, index) => (
            <FormField key={index}>
              <Label>{question.question}</Label>
              <Description>{question.description}</Description>
              <StarRating>
                <LeftLabel>{question.leftText}</LeftLabel>

                {[1, 2, 3, 4, 5].map((num) => (
                  <Circle
                    key={num}
                    rating={num}
                    onClick={() => handleRatingChange(question.id, num)}
                    isSelected={ratings[question.id] === num}
                  />
                ))}
                <RightLabel>{question.rightText}</RightLabel>
              </StarRating>
            </FormField>
          ))}

          <FormField>
            <Label>{RECOMMEND_TEXT.question}</Label>
            <RadioContainer>
              {RECOMMEND_TEXT.options.map((option, index) => (
                <label key={option}>
                  <RadioButton
                    type="radio"
                    value={option}
                    checked={index === recommendation}
                    onChange={() => setRecommendation(() => index)}
                  />
                  <RadioCheckText> {option}</RadioCheckText>
                </label>
              ))}
            </RadioContainer>
          </FormField>

          <FormField>
            <Label>총평을 적어주세요</Label>
            <Description>
              {text.length}자 작성 (최소 15자 이상으로 작성해주세요)
            </Description>

            <TextArea
              minRows={10}
              onChange={handleTextChange}
              placeholder="과제, 시험, 출석 등 강의에 대해 사람들이 꼭 알았으면 하는 점을 적어주세요"
            />
          </FormField>

          <Button disabled={isMutating > 0} type="submit">
            강의평가 제출
          </Button>
        </Form>
      </Wrapper>
    </>
  );
}
