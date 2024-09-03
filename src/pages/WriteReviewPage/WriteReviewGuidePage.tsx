import { useEffect } from "react";
import NavigationHeader from "@components/NavigationHeader";
import { RATING_QUESTIONS } from "./WriteReviewPage.const";
import { Wrapper } from "./WriteReviewPage.styled";
import { concatProfessorNames } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { getLectureList } from "@/apis/lectures";
import { REDIRECT_PATH } from "@/constants/localStorageKeys";
import { SearchBar } from "../SearchPage/components/SearchBar";
import { useSearch } from "@/hooks/useSearch";
import Card from "@components/Card";
import TitleWithDescription from "@components/TitleWithDescription";
import { ItemList } from "../SearchPage/SearchPage.styled";
import { filterLectureList } from "../SearchPage/SearchPage.const";
import { lectureInfo } from "@/Interfaces/interfaces";
import { StyledLink } from "@components/StyledLink";
import SearchCard from "../SearchPage/components/SearchCard";
import { SearchCardSkeleton } from "../skeletonComponents/SearchCard.skeleton";

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

  /**Search 페이지의 강의 리스트 */
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

        <ItemList>{DisplayItemList()}</ItemList>
      </Wrapper>
    </>
  );
}
