import styled from "styled-components";

const SearchCardRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 1em;
`;

// const HighLightBox = styled.div`
//   width: 90px;
//   height: 90px;
//   background-color: pink;
//   transform: rotate(45deg);
// `;

const Card = styled.div`
  background-color: gray;
  width: 335px;
  height: 62px;
  border-radius: 5px;
  background: linear-gradient(65deg, gray 70%, pink 30%);
`;

export default function SearchCard() {
  return (
    <Card>
      <SearchCardRow>
        <div>EC2001-01 | 박창수</div>
        <div>3학점</div>
      </SearchCardRow>
      <SearchCardRow>
        <div>회로이론</div>
        <div>4.5/5</div>
      </SearchCardRow>
    </Card>
  );
}
