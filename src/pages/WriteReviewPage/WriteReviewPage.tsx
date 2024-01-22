import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { theme } from "@/style/theme";
import { tempdb } from "@/tempdb/tempdb";
import NavigationHeader from "@components/NavigationHeader";
import Title from "@components/Title";

const Wrapper = styled.div`
  margin: 0 20px;
`;

const Button = styled.button`
  padding: 15px;
  background-color: ${theme.colors.primary};
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

const Form = styled.form`
  margin-top: 6%;
  background-color: white;
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 5px;
  font-family: NSBold;
`;

const Description = styled.p`
  margin-bottom: 10px;
  font-size: 14px;
`;

const Select = styled.select`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

const LeftLabel = styled.span`
  margin-right: 10px;
  font-size: 14px;
  color: ${theme.colors.secondaryText};
`;

const RightLabel = styled.span`
  margin-left: 10px;
  font-size: 14px;
  color: ${theme.colors.secondaryText};
`;

const StarRating = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Star = styled.span`
  cursor: pointer;
  color: gold;
  margin: 0 8px;
  font-size: 32px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  height: 100px;
`;

const RadioCheckText = styled.span`
  font-size: 14px;
  width: 110px;
  height: 35px;
  border-radius: 50px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${theme.colors.secondaryText};
  background: ${theme.colors.inputBg};
`;

const RadioButton = styled.input.attrs({ type: "radio" })`
  &:checked {
    display: inline-block;
    background: none;
    padding: 0px 10px;
    text-align: center;
    height: 35px;
    line-height: 33px;
    font-weight: 500;
    display: none;
  }
  &:checked + ${RadioCheckText} {
    background: ${theme.colors.primary};
    color: #fff;
  }
  display: none;
`;

const RadioContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const COURSE_TAKEN_YEAR = [
  "2023",
  "2022",
  "2021",
  "2020",
  "2019",
  "2018",
  "2017",
  "2016",
  "2015",
];
const COURSE_TAKEN_SEMESTER = ["봄학기", "여름학기", "가을학기", "겨울학기"];

const RATING_QUESTIONS = [
  {
    id: 1,
    question: "수업 난이도는 어땠나요?",
    description: "과제, 시험 등 강의의 모든 부분을 고려하여 선택해주세요.",
    leftText: "쉬움",
    rightText: "어려움",
  },
  {
    id: 2,
    question: "수업 난이도는 어땠나요?",
    description: "과제, 시험 등 강의의 모든 부분을 고려하여 선택해주세요.",
    leftText: "쉬움",
    rightText: "어려움",
  },
];

const RECOMMEND_TEXT = {
  question: "이 강의를 추천하시겠어요?",
  options: ["추천", "보통", "추천하지 않음"],
};

const initialRatings = RATING_QUESTIONS.reduce((acc, question) => {
  acc[question.id] = null;
  return acc;
}, {} as { [key: number]: number | null });

const EMPTY_STAR = "☆";
const FILLED_STAR = "★";

export default function WriteReviewPage() {
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
