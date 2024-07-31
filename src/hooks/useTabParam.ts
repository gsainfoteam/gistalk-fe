import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

/**
 * 인자로 넣은 value 값을 tab의 query parameter로 설정
 * @type { function(string): void }
 */

export default function useTabParam(value?: string) {
  const [TabParams, setTabParams] = useSearchParams();

  useEffect(() => {
    setTabParams(value && { tab: value });
  }, []);
}
