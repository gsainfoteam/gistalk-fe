import { SkeletonDiv } from "./Skeleton.styled";

export function SearchCardSkeleton() {
    return (
        <div style={{width: "100%", display: "flex", alignItems: "center", marginBottom: "10px", paddingLeft: "20px", paddingRight: "20px"}}>
          <SkeletonDiv widthSize="40px" heightSize="40px" style={{borderRadius: "20px"}} />&ensp;
          <div style={{width: "100%", display: "flex", flexDirection: "column"}}>
            <SkeletonDiv widthSize="80%" heightSize="25px" />
            <SkeletonDiv widthSize="60%" heightSize="20px"/>
          </div>
        </div>
    )
}