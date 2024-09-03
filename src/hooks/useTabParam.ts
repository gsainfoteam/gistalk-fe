import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

/**
 * 인자로 넣은 value 값을 tab의 query parameter로 설정
 * 
 * @param value -tab 설정
 * @param semesterKeyword -keyword 설정
 */
export default function useTabParam(value?: string, semesterKeyword?: string) {
  const [TabParams, setTabParams] = useSearchParams();

  useEffect(() => {
    if (semesterKeyword) 
      setTabParams(value && { tab: value, keyword: semesterKeyword });
    else setTabParams(value && { tab: value });
  }, []);
}
