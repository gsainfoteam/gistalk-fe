import { reviewInfo } from "@/Interfaces/interfaces";

export const ReviewAmount = (selectedReview: reviewInfo[][]) => {
    let count = 0;
    selectedReview.map((review) => count += review.length)

    return count;
  };