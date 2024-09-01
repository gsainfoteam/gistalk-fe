import { SkeletonDiv } from "./Skeleton.styled";

export function WritePageSkeleton() {
  const skeletonNumber = new Array(8).fill(null); //skeleton component를 위한 8개의 null이 있는 배열
  return (
    <>{
    skeletonNumber.map((skeleton, index) => 
        <div key={index} style={{marginBottom: `${index === 1 ? "30px" : "5px"}`}}>
            <br />
            <SkeletonDiv 
            widthSize="80px"
            heightSize="20px"/>
            <SkeletonDiv heightSize="30px">
            &nbsp;
            </SkeletonDiv>
            {index > 1 && 
            <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
            <SkeletonDiv widthSize="400px" heightSize="50px" />
            </div>
            }
        </div>)
        }
        <SkeletonDiv 
        widthSize="80px"
        heightSize="20px"/>
        <div style={{width: "100%", display: "flex", justifyContent: "space-between"}}>
            <SkeletonDiv widthSize="100px" heightSize="25px"/>
            <SkeletonDiv widthSize="100px" heightSize="25px"/>
            <SkeletonDiv widthSize="100px" heightSize="25px"/>
        </div>
        <SkeletonDiv 
        widthSize="80px"
        heightSize="20px"
        style={{marginTop: "40px"}} />
        <SkeletonDiv widthSize="250px" heightSize="30px" />
        <SkeletonDiv
        widthSize="100%"
        heightSize="200px"/>
        <SkeletonDiv
        heightSize="50px"
        widthSize="100%"
        style={{marginTop: "40px"}} />
    </>
  )
}