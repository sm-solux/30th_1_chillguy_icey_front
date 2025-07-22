import { useState } from "react";

export function useLetters(teamId) {
  // state: 쪽지 토글
  const [openedId, setOpenedId] = useState(null);

  const handleClick = (letterId) => {
    // 열려있는 쪽지를 다시 클릭하면 닫기
    setOpenedId((prev) => (prev === letterId ? null : letterId));
  };

  return {
    openedId,
    handleClick,
  };
}
