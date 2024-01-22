import { theme } from "@/style/theme";
import { tempdb } from "@/tempdb/tempdb";
import NavigationHeader from "@components/NavigationHeader";
import Title from "@components/Title";
import TitleWithDescription from "@components/TitleWithDescription";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 0 20px;
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const Select = styled.select`
  padding: 8px;
`;

const StarRating = styled.div`
  font-size: 24px;
  cursor: pointer;
`;

const TextArea = styled.textarea`
  flex: 1;
  margin-bottom: 10px;
  border-radius: 10px;
  border: 1px solid ${theme.colors.grayStroke};
  padding: 10px;
`;

const Button = styled.button`
  padding: 15px;
  background-color: ${theme.colors.primary};
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
`;

export default function WriteReviewPage() {
  const [professor, setProfessor] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [semester, setSemester] = useState<string>("");
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState<string>("");

  /** Radar Chart에 들어갈 임시 데이터 */
  const params = useParams() as { id: string };
  /**강의별 id */
  const id = Number(params.id);
  const tempData = tempdb.find((value) => value.id === id) || tempdb[0]; //undefined인 경우 default 값: tempdb[0]

  useEffect(() => {
    window.scrollTo(0, 0); // 리스트뷰에서 강의평을 들어갈 경우 스크롤 위치가 그대로 남아있는 것을 방지
  });

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleSubmit = () => {
    // TODO: 평가 제출 로직 추가
    console.log("평가 제출:", { professor, year, semester, rating, comment });
  };

  return (
    <>
      <NavigationHeader text={"강의평 작성"} />
      <Wrapper>
        <Title
          subjectTitle={tempData.subjectName}
          professorName={tempData.professorName}
          subjectCode={tempData.subjectCode}
        />
        <div>
          <Select
            onChange={(e) => setYear(e.target.value)}
            placeholder="수강 년도 선택"
          >
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            {/* 추가 년도 옵션들 */}
          </Select>

          <Select
            onChange={(e) => setSemester(e.target.value)}
            placeholder="수강 학기 선택"
          >
            <option value="Spring">봄학기</option>
            <option value="Fall">가을학기</option>
            {/* 추가 학기 옵션들 */}
          </Select>
        </div>

        <div>
          <span>수업 난이도는 어떠나요?</span>
          <StarRating onClick={() => handleRatingChange(1)}>★</StarRating>
          <StarRating onClick={() => handleRatingChange(2)}>★★</StarRating>
          <StarRating onClick={() => handleRatingChange(3)}>★★★</StarRating>
          <StarRating onClick={() => handleRatingChange(4)}>★★★★</StarRating>
          <StarRating onClick={() => handleRatingChange(5)}>★★★★★</StarRating>
        </div>

        <TitleWithDescription
          title="총평을 적어주세요"
          description="강의에 대해 알리고 싶은 내용을 적어주세요"
        >
          <TextArea
            onChange={(e) => setComment(e.target.value)}
            placeholder="총평을 적어주세요"
            value={comment}
          />
        </TitleWithDescription>

        <Button onClick={handleSubmit}>강의평가 제출</Button>
      </Wrapper>
    </>
  );
}
