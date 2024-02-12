import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { tempdb } from "@/tempdb/tempdb";
import NavigationHeader from "@components/NavigationHeader";
import Title from "@components/Title";
import {
  COURSE_TAKEN_SEMESTER,
  COURSE_TAKEN_YEAR,
  EMPTY_STAR,
  FILLED_STAR,
  RATING_QUESTIONS,
  RECOMMEND_TEXT,
  Recommendation,
} from "./WriteReviewPage.const";
import {
  Button,
  Description,
  FormField,
  LeftLabel,
  RadioButton,
  RadioCheckText,
  RadioContainer,
  RightLabel,
  Star,
  StarRating,
  TextArea,
  Wrapper,
  Label,
  Form,
} from "./WriteReviewPage.styled";
import ReactSelect from "react-select";
import { convertLectureCodeToList } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { getLectureSingleInfo } from "@/apis/lectures";

const initialRatings = RATING_QUESTIONS.reduce((acc, question) => {
  acc[question.id] = 0;
  return acc;
}, {} as { [key: number]: number | null });

export function WriteReviewPage() {
  const navigate = useNavigate();

  const [ratings, setRatings] = useState(initialRatings);
  const [recommendation, setRecommendation] = useState(Recommendation.Normal); // 0 비추천, 1 보통, 2 추천
  const params = useParams() as { id: string };
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleCheckboxChange = (id: number) => {
    setSelectedId(id === selectedId ? null : id);
  };

  const id = Number(params.id);
  const tempData = tempdb.find((value) => value.id === id) ?? tempdb[0]; //undefined인 경우 default 값: tempdb[0]

  if (!tempData) {
    navigate("/error");
  }

  useEffect(() => {
    window.scrollTo(0, 0); // 리스트뷰에서 강의평을 들어갈 경우 스크롤 위치가 그대로 남아있는 것을 방지
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(event);
    alert(`Rating: ${ratings[0]}`);
  };

  const handleRatingChange = (questionId: number, newRating: number) => {
    setRatings((prevRatings) => ({ ...prevRatings, [questionId]: newRating }));
  };

  const {
    isLoading: isLectureInfoLoading,
    data: lectureInfoData,
    isError,
  } = useQuery({
    queryKey: [`getLectureSingleInfo/${id}`],
    queryFn: () => getLectureSingleInfo(id),
    retry: 0,
  });

  const { data: lectureInfo } = { ...lectureInfoData };

  return (
    <>
      <NavigationHeader prevUrl={`/${id}/evaluation`} text={"강의평 작성"} />
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
            />
          </FormField>

          <FormField>
            <Label>수강 학기</Label>
            <ReactSelect
              options={COURSE_TAKEN_SEMESTER}
              placeholder={"수강 학기를 선택해주세요"}
            />
          </FormField>
          {RATING_QUESTIONS.map((question, index) => (
            <FormField key={index}>
              <Label>{question.question}</Label>
              <Description>{question.description}</Description>
              <StarRating>
                <LeftLabel>{question.leftText}</LeftLabel>
                {[1, 2, 3, 4, 5].map((num) => (
                  <Star
                    key={num}
                    onClick={() => handleRatingChange(question.id, num)}
                  >
                    {num <= (ratings[question.id] ?? 0)
                      ? FILLED_STAR
                      : EMPTY_STAR}
                  </Star>
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
            <TextArea placeholder="강의에 대해 사람들이 꼭 알았으면 하는 것들을 적어주세요" />
          </FormField>

          <Button type="submit">강의평가 제출</Button>
        </Form>
      </Wrapper>
    </>
  );
}
