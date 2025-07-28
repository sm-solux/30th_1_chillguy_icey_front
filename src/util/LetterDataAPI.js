import axios from "axios";

const backLink = "https://icey-backend-1027532113913.asia-northeast3.run.app";

// 받은 쪽지 목록 조회
export const fetchReceivedLetters = async (token, teamId) => {
  const res = await axios.get(
    `${backLink}/api/teams/${teamId}/letters/received`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return res.data?.data || [];
};

// 특정 쪽지 내용 조회
export const fetchLetterContent = async (token, teamId, letterId) => {
  const res = await axios.get(
    `${backLink}/api/teams/${teamId}/letters/${letterId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return res.data?.data?.content || "";
};

// 팀 명함 전체 목록 조회
export const fetchTeamCards = async (token, teamId) => {
  const res = await axios.get(`${backLink}/api/cards/teams/${teamId}/cards`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data || [];
};

// 내가 현재 팀에서 사용 중인 명함 정보 조회
export const fetchMyCardInTeam = async (token, teamId) => {
  const res = await axios.get(
    `${backLink}/api/cards/teams/${teamId}/cards/my`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return res.data;
};

// 쪽지 전송
export const sendLetter = async (token, teamId, cardId, content) => {
  await axios.post(
    `${backLink}/api/teams/${teamId}/cards/${cardId}/letters`,
    { content },
    { headers: { Authorization: `Bearer ${token}` } },
  );
};
