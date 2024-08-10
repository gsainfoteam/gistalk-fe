import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import NavigationHeader from "@components/NavigationHeader";
import Title from "@components/Title";
import {
  COURSE_TAKEN_SEMESTER,
  COURSE_TAKEN_YEAR,
  RATING_QUESTIONS,
  RECOMMEND_TEXT,
} from "./WriteReviewPage.const";
import {
  Button,
  Description,
  FormField,
  LeftLabel,
  RightLabel,
  StarRating,
  TextArea,
  Wrapper,
  Label,
  Form,
  RadioContainer,
  RadioButton,
  RadioCheckText,
  Circle,
} from "./WriteReviewPage.styled";
import ReactSelect from "react-select";
import { convertLectureCodeToList } from "@/utils";
import { useIsMutating, useMutation, useQuery } from "@tanstack/react-query";
import { getLectureList, getLectureSingleInfo } from "@/apis/lectures";
import { postLectureEvaluation } from "@/apis/records";
import { REDIRECT_PATH } from "@/constants/localStorageKeys";
import { isAxiosError } from "axios";
import { SearchBar } from "../SearchPage/components/SearchBar";
import { useSearch } from "@/hooks/useSearch";
import { checkValidation } from "./WriteReviewPage.util";
import Card from "@components/Card";
import TitleWithDescription from "@components/TitleWithDescription";

const initialRatings = RATING_QUESTIONS.reduce((acc, question) => {
  acc[question.id] = 0;
  return acc;
}, {} as { [key: number]: number | null });

interface Option {
  value: number;
  label: string;
}

interface SelectedValues {
  year: Option | null;
  semester: Option | null;
}

export function WriteReviewGuidePage() {
  const {
    searchText,
    setSearchText,
    searchTextEnter,
    enterSearchText,
    clearSearchText,
  } = useSearch();

  localStorage.removeItem(REDIRECT_PATH); // 로그인 페이지에서 리다이렉션 링크가 걸려 들어온 경우 제거

  useEffect(() => {
    window.scrollTo(0, 0); // 리스트뷰에서 강의평을 들어갈 경우 스크롤 위치가 그대로 남아있는 것을 방지
  }, []);

  const {
    isLoading: isLectureListLoading,
    data: lectureListData,
    isError,
  } = useQuery({
    queryKey: ["getEvaluationList"],
    queryFn: getLectureList,
  });

  const { data: lectureList } = { ...lectureListData };

  return (
    <>
      <NavigationHeader text={"강의평 작성"} />
      <Wrapper>
        <Card>
          <TitleWithDescription
            title="강의평 검색"
            description="강의평을 작성할 강의를 검색해서 선택해주세요."
          />
        </Card>
        <SearchBar
          data={lectureList}
          setSearchText={setSearchText}
          searchText={searchText}
          searchTextEnter={searchTextEnter}
          enterSearchText={enterSearchText}
          clearSearchText={clearSearchText}
          isSearchWrite={true}
        />
      </Wrapper>
    </>
  );
}
