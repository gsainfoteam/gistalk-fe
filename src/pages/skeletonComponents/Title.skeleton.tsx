import { SkeletonDiv } from "./Skeleton.styled";

export function TitleSkeleton() {
  return (
    <>
        <SkeletonDiv widthSize="70%" heightSize="30px" />
        <div style={{display: "flex", justifyContent: "start"}}>
            <SkeletonDiv widthSize="40px" heightSize="18px" style={{marginRight: "6px"}} />
            <SkeletonDiv widthSize="80%" heightSize="25px"/>
        </div>
    </>
  )
}