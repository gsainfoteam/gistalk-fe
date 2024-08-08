import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as regularBookmark } from "@fortawesome/free-regular-svg-icons";
import { faBookmark as solidBookmark } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { deleteBookmark, postBookmark } from "@/apis/lectures";

const MARK = "mark";
const NONE = "none";

interface IProps {
  lectureId: number;
  isMarked: Boolean;
}
//attrs를 사용하여 컴포넌트의 기본 prop을 icon으로 설정한다.
const RegularBookmark = styled(FontAwesomeIcon).attrs({
  icon: regularBookmark,
})`
  margin-right: 5px;
`;

const SolidBookmark = styled(FontAwesomeIcon).attrs({ icon: solidBookmark })`
  margin-right: 5px;
`;

export default function BookMark({ lectureId, isMarked }: IProps) {
  const [markState, setMarkState] = useState(isMarked ? MARK : NONE);
  const [bookmarkIcon, setBookmarkIcon] = useState(regularBookmark);

  useEffect(() => {
    setMarkState(isMarked ? MARK : NONE);
    setBookmarkIcon(isMarked ? solidBookmark : regularBookmark);
  }, [isMarked]);

  const handleMark = async () => {
    if (markState === MARK) {
      await deleteBookmark();
      setMarkState(NONE);
      setBookmarkIcon(regularBookmark);
    } else {
      await postBookmark();
      setMarkState(MARK);
      setBookmarkIcon(solidBookmark);
    }
  };

  return <button onClick={handleMark}></button>;
}
