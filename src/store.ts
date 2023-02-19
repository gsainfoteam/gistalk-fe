import { atom } from "jotai";
import { ISortOption } from "@/Interfaces/interfaces";

/** 담는 형식은 [[...fullKorean],[...korean],[...subjectCode]], 여기에 현재 필터 분과 정보를 저장함. */
export const departmentOptionAtom = atom<[string[], string[], string[]]>([
  [],
  [],
  [],
]);
export const sortOptionAtom = atom<ISortOption>("평균점수");

export const isLoggedInAtom = atom<boolean>(false);
