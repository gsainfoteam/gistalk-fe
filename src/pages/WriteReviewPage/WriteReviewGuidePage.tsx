import { useQuery } from "@tanstack/react-query";

import { concatProfessorNames } from "@/utils";
import { getLectureList } from "@/apis/lectures";
import { REDIRECT_PATH } from "@/constants/localStorageKeys";
import { useSearch } from "@/hooks/useSearch";
import Card from "@components/Card";
import NavigationHeader from "@components/NavigationHeader";
import { StyledLink } from "@components/StyledLink";
import TitleWithDescription from "@components/TitleWithDescription";
import { lectureInfo } from "@/Interfaces/interfaces";
import CatBlankList_Svg from "@assets/svgs/catBlankList.svg";
import { theme } from "@/style/theme";

//TODO : SearchPage 컴포넌트 의존성 제거. 공용 컴포넌트로 묶을 수 있도록 수정
import { SearchBar } from "../SearchPage/components/SearchBar";
import { filterLectureList } from "../SearchPage/SearchPage.const";
import SearchCard from "../SearchPage/components/SearchCard";
import {
  BlankSvg,
  BlankText,
  BlankWrap,
  ItemList,
} from "../SearchPage/SearchPage.styled";
import { SearchCardSkeleton } from "../skeletonComponents/SearchCard.skeleton";
import { Wrapper } from "./WriteReviewPage.styled";

export function WriteReviewGuidePage() {
  const {
    searchText,
    setSearchText,
    searchTextEnter,
    enterSearchText,
    clearSearchText,
  } = useSearch();

  localStorage.removeItem(REDIRECT_PATH); // 로그인 페이지에서 리다이렉션 링크가 걸려 들어온 경우 제거

  const {
    isLoading: isLectureListLoading,
    data: lectureListData,
    isError,
  } = useQuery({
    queryKey: ["getEvaluationList"],
    queryFn: getLectureList,
  });

  const { data: lectureList } = { ...lectureListData };

  // 강의 리스트를 보여주는 함수
  // TODO: 의존성 분리 필요. 함수를 실행하는 형식이 아니라 컴포넌트 형태로 분리할 것.
  function DisplayItemList() {
    const skeletonNumber = new Array(500).fill(null);
    if (isLectureListLoading) {
      return skeletonNumber.map((skeleton, index) => (
        <div key={index}>{SearchCardSkeleton}</div>
      ));
    }
    const filteredLectureList = filterLectureList(
      lectureList,
      [[], [], []],
      searchTextEnter
    );

    if (filteredLectureList === null || filteredLectureList === undefined) {
      return null;
    }

    return filteredLectureList.map((item: lectureInfo) => {
      const professorNames = concatProfessorNames(item.LectureSection);
      return (
        <StyledLink key={item.id} to={`/write/${item.id}`}>
          <SearchCard
            subjectCode={item.LectureCode}
            professorName={professorNames}
            subjectName={item.name}
          />
        </StyledLink>
      );
    });
  }

  return (
    <>
      <NavigationHeader text={"강의평 작성"} isNavigateHome={true} />
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
        <ItemList>
          {!isLectureListLoading && DisplayItemList()}
          {DisplayItemList() === null ? (
            <BlankWrap>
              <BlankSvg size={160} src={CatBlankList_Svg} />
              <BlankText fontSize={16} color={theme.colors.secondaryText}>
                검색 결과가 존재하지 않습니다.
              </BlankText>
            </BlankWrap>
          ) : null}
        </ItemList>
      </Wrapper>
    </>
  );
}
