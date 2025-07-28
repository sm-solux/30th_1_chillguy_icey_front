import axios from "axios";

const backLink = "https://icey-backend-1027532113913.asia-northeast3.run.app";

// 메모 목록 조회
export const fetchMemos = async (token, teamId) => {
  const res = await axios.get(`${backLink}/api/teams/${teamId}/memos`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  // res.data 또는 res.data.data 형태에 대비
  if (Array.isArray(res.data)) return res.data;
  if (Array.isArray(res.data?.data)) return res.data.data;
  return [];
};

// 메모 삭제
export const deleteMemo = async (token, teamId, memoId) => {
  await axios.delete(`${backLink}/api/teams/${teamId}/memos/${memoId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// 밸런스 게임 목록 조회
export const fetchBalanceGames = async (token, teamId) => {
  const res = await axios.get(`${backLink}/api/teams/${teamId}/balance-game`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data?.data ?? [];
};

// 밸런스 게임 생성
export const createBalanceGame = async (token, teamId) => {
  const res = await axios.post(
    `${backLink}/api/teams/${teamId}/balance-game/generate`,
    {},
    { headers: { Authorization: `Bearer ${token}` } },
  );
  return res.data?.data;
};

// 밸런스 게임 삭제
export const deleteBalanceGame = async (token, teamId, gameId) => {
  await axios.delete(
    `${backLink}/api/teams/${teamId}/balance-game/${gameId}/delete`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
};

// 밸런스 게임 투표
export const voteBalanceGame = async (
  token,
  teamId,
  gameId,
  selectedOption,
) => {
  await axios.post(
    `${backLink}/api/teams/${teamId}/balance-game/${gameId}/vote`,
    { selectedOption: Number(selectedOption) },
    { headers: { Authorization: `Bearer ${token}` } },
  );
};

// 밸런스 게임 투표 결과 조회
export const fetchBalanceGameResult = async (token, teamId, gameId) => {
  try {
    const res = await axios.get(
      `${backLink}/api/teams/${teamId}/balance-game/${gameId}/result`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return res.data;
  } catch {
    return { totalVotes: 0 };
  }
};

// 메모 상세 내용 조회
export const fetchMemoDetail = async (token, teamId, memoId) => {
  const res = await axios.get(
    `${backLink}/api/teams/${teamId}/memos/${memoId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return res.data;
};

// 메모 좋아요 토글
export const toggleMemoLike = async (token, teamId, memoId) => {
  const res = await axios.post(
    `${backLink}/api/teams/${teamId}/memos/${memoId}/reactions`,
    {},
    { headers: { Authorization: `Bearer ${token}` } },
  );
  return res.data;
};

// 메모 생성 또는 수정
export const saveMemo = async (token, teamId, content, memoId = null) => {
  const url = memoId
    ? `${backLink}/api/teams/${teamId}/memos/${memoId}`
    : `${backLink}/api/teams/${teamId}/memos`;

  const method = memoId ? "PUT" : "POST";

  const res = await axios({
    method,
    url,
    data: { content },
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
};
