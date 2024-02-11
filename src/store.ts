import { atom } from "jotai";
import { ISortOption, UserInfo, lectureInfo } from "@/Interfaces/interfaces";
import { atomWithReset } from "jotai/utils";

/** 담는 형식은 [[...fullKorean],[...korean],[...subjectCode]], 여기에 현재 필터 분과 정보를 저장함. */
export const departmentOptionAtom = atom<[string[], string[], string[]]>([
  [],
  [],
  [],
]);
export const sortOptionAtom = atom<ISortOption>("평균점수");

export const isLoggedInAtom = atom<boolean>(false);

export const userInfoAtom = atomWithReset<UserInfo>({
  user_uuid: "",
  user_email_id: "",
  user_name: "",
  user_phone_number: "",
  student_id: "",
});
