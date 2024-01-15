import { Link } from "react-router-dom";
import { SearchBar } from "../SearchPage/components/SearchBar";

export default function MainPage() {
  return (
    <>
      <div> 강의 평가 검색</div>
      <div> 기초과목부터 버클리까지 검색해보세요</div>

      <Link to="/">
        <div>이번학기 어떻게 보내셨나요? 강의 등록하러 가기</div>
      </Link>
    </>
  );
}
