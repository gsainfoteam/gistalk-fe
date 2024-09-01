import { SkeletonDiv } from "./Skeleton.styled";

export function ReplySkeleton() {
    return (
        <>
          <div style={{display: "flex"}}>
            <SkeletonDiv widthSize="45px" heightSize="20px"/>&ensp;
            <SkeletonDiv widthSize="35px" heightSize="20px"/>&ensp;
            <SkeletonDiv widthSize="85px" heightSize="20px"/>
          </div>
          <SkeletonDiv>
            &nbsp;<br />&nbsp;
          </SkeletonDiv>
        </>
    )
}