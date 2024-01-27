import { theme } from "@/style/theme";
import Card from "@components/Card";
import WithTitleAndDescription from "@components/TitleWithDescription";
import styled from "styled-components";

const Percentage = styled.div`
  border-radius: 10px;
  background: ${theme.colors.cardBackGround};
  padding: 20px;
  margin-bottom: 1em;
`;
const CompareContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const FlexCard = styled.div`
  flex: 1;
  margin: 8px 4px; /* 원하는 간격을 지정할 수 있습니다. */
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column; /* 세로 방향으로 정렬하기 위해 추가 */
`;

export default function ComparePage() {
  return (
    <>
      <WithTitleAndDescription
        title={"강의 비교"}
        description={"관심 있는 두 강의를 골라서 비교해보세요"}
      >
        <Card>
          <div> banner image</div>
        </Card>
      </WithTitleAndDescription>

      <WithTitleAndDescription
        title={"지금 뜨는 강의 대결"}
        description={"다른 사람들이 올린 비교글에 투표해주세요"}
      >
        <CompareContainer>
          <FlexContainer>
            <FlexCard>
              <Card>
                <div className="selection"> A </div>
                <div> 컴퓨터 프로그래밍 </div>
                <div> 홍길동 </div>
              </Card>
            </FlexCard>

            <FlexCard>
              <Percentage>20% </Percentage>
            </FlexCard>
          </FlexContainer>

          <FlexContainer>
            <FlexCard>
              <Card>
                <div className="selection"> B </div>
                <div> 컴퓨터 프로그래밍 </div>
                <div> 홍길동 </div>
              </Card>
            </FlexCard>

            <FlexCard>
              <Percentage>80% </Percentage>
            </FlexCard>
          </FlexContainer>
        </CompareContainer>
      </WithTitleAndDescription>
    </>
  );
}
