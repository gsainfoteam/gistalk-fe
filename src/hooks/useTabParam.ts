import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function useTabParam(value?: string) {
    const [TabParams, setTabParams] = useSearchParams();
    /**
     * 홈과 프로필 페이지의 쿼리 스트링을 만든다. 
     * @type { function(string): void }
     */
    useEffect(() => {
      setTabParams(value && {tab: value});
    }, []);
}