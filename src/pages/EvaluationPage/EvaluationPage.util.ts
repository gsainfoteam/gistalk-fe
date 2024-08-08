import { recordInfo } from "@/Interfaces/interfaces";

export const ReviewAmount = (selectedReview: recordInfo[][]) => {
    let count = 0;
    selectedReview.map((review) => count += review.length)

    return count;
  };