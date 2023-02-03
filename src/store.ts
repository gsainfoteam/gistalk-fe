import {atom} from "jotai";

export const departmentOptionAtom = atom<[string[],string[],string[]]>([[], [], []]);