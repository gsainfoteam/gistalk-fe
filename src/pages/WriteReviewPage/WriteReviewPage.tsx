import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
  Select,
  Star,
  StarRating,
  TextArea,
  Wrapper,
  Label,
  Form,
} from "./WriteReviewPage.styled";

const initialRatings = RATING_QUESTIONS.reduce((acc, question) => {
  acc[question.id] = null;
  return acc;
}, {} as { [key: number]: number | null });

export function WriteReviewPage() {
  const [ratings, setRatings] = useState(initialRatings);
  const [recommendation, setRecommendation] = useState(1); // 0 비추천, 1 보통, 2 추천
  const params = useParams() as { id: string };
  const id = Number(params.id);

  const tempData = tempdb.find((value) => value.id === id) || tempdb[0]; //undefined인 경우 default 값: tempdb[0]

  useEffect(() => {
    window.scrollTo(0, 0); // 리스트뷰에서 강의평을 들어갈 경우 스크롤 위치가 그대로 남아있는 것을 방지
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert(`Rating: ${ratings}`);
  };

  const handleRatingChange = (questionId: number, newRating: number) => {
    setRatings((prevRatings) => ({ ...prevRatings, [questionId]: newRating }));
  };

  //TODO: 추천/비추 UI

  return (
    <>
      <NavigationHeader text={"강의평 작성"} />
      <Wrapper>
        <Title
          subjectTitle={tempData.subjectName}
          professorName={tempData.professorName}
          subjectCode={tempData.subjectCode}
        />
        <Form onSubmit={handleSubmit}>
          <FormField>
            <Label>수강 년도</Label>
            <Select>
              {COURSE_TAKEN_YEAR.map((year) => (
                <option key={year}>{year}</option>
              ))}
            </Select>
          </FormField>

          <FormField>
            <Label>수강 학기</Label>
            <Select>
              {COURSE_TAKEN_SEMESTER.map((semester) => (
                <option key={semester}>{semester}</option>
              ))}
            </Select>
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
