import { SkeletonDiv } from "./Skeleton.styled";

export function ProfilePageSkeleton() {
  return (
    <>
        <SkeletonDiv 
        widthSize="100%" 
        heightSize="50px"
        style={{borderRadius: "10px", marginTop: "6px"}}
        />
        <SkeletonDiv 
        widthSize="100%" 
        heightSize="120px" 
        style={{borderRadius: "10px", marginTop: "6px"}}
        />
    </>
  )
}