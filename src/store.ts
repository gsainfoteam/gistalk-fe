import {atom} from "jotai";
import {ISortOption} from "@/Interfaces/interfaces";

export const departmentOptionAtom = atom<[string[],string[],string[]]>([[], [], []]);
export const sortOptionAtom = atom<ISortOption>("평균점수");