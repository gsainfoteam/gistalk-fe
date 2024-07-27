import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function useTabParam(value?: string) {
    const [TabParams, setTabParams] = useSearchParams();

    useEffect(() => {
      setTabParams(value && {page: value});
    }, []);
}