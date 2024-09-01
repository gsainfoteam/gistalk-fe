import Card from "@components/Card";
import { SkeletonDiv } from "./Skeleton.styled";

export function MainPageSkeleton(isLoading: boolean) {
  const skeletonNumber = new Array(4).fill(null);
  return (
    skeletonNumber.map((skeleton, index) =>
        <Card key={index} isSkeleton={isLoading}>
          <div style={{display: "flex", alignItems: "center"}}>
            <SkeletonDiv widthSize="20%">
              &nbsp;
            </SkeletonDiv>
            &ensp;
            <SkeletonDiv widthSize="150px" heightSize="20px"/>
          </div>
            <SkeletonDiv widthSize="15%">
              &nbsp;
            </SkeletonDiv>
          <SkeletonDiv style={{marginTop: "6px"}}>&nbsp;</SkeletonDiv>
        </Card> 
      )
  )
}