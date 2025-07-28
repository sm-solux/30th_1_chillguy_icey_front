import axios from "axios";

const backLink = "https://icey-backend-1027532113913.asia-northeast3.run.app";

// 내 명함 전체 목록 조회 (내 카드 + 사용중인 팀 목록 포함)
export const fetchMyCards = async (token) => {
  try {
    const res = await axios.get(`${backLink}/api/cards`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // 각 카드별 사용 팀 목록 추가
    const cardsWithTeams = await Promise.all(
      res.data.map(async (card) => {
        try {
          const teamRes = await axios.get(
            `${backLink}/api/cards/${card.templateId}/used-teams`,
            { headers: { Authorization: `Bearer ${token}` } },
          );
          return { ...card, teams: teamRes.data.map((team) => team.name) };
        } catch {
          return { ...card, teams: [] };
        }
      }),
    );

    return cardsWithTeams;
  } catch (error) {
    console.error("내 명함 불러오기 실패", error);
    throw error;
  }
};

// 특정 팀 내에서 내가 사용 중인 명함 조회
export const fetchCurrentTeamCard = async (token, teamId) => {
  try {
    if (!teamId) return null;
    const res = await axios.get(
      `${backLink}/api/cards/teams/${teamId}/cards/my`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return res.data;
  } catch (error) {
    console.error("현재 팀에서 내 명함 불러오기 실패", error);
    return null;
  }
};

// 명함 생성
export const createCard = async (token, cardData) => {
  try {
    const res = await axios.post(`${backLink}/api/cards`, cardData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("명함 생성 실패", error);
    throw error;
  }
};

// 명함 수정
export const updateCard = async (token, cardId, cardData) => {
  try {
    await axios.patch(`${backLink}/api/cards/${cardId}`, cardData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error("명함 수정 실패", error);
    throw error;
  }
};

// 명함 삭제
export const deleteCard = async (token, cardId) => {
  try {
    await axios.delete(`${backLink}/api/cards/${cardId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error("명함 삭제 실패", error);
    throw error;
  }
};

// 현재 팀 내에서 사용할 명함 설정 (선택)
export const selectCardForTeam = async (token, teamId, templateId) => {
  try {
    await axios.put(
      `${backLink}/api/cards/teams/${teamId}/cards/my-card`,
      null,
      {
        headers: { Authorization: `Bearer ${token}` },
        params: { templateId },
      },
    );
  } catch (error) {
    console.error("팀에 명함 설정 실패", error);
    throw error;
  }
};

// 특정 팀 내 명함 전체 목록 조회
export const fetchTeamCards = async (token, teamId) => {
  try {
    const res = await axios.get(`${backLink}/api/cards/teams/${teamId}/cards`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data || [];
  } catch (error) {
    console.error("팀 명함 목록 불러오기 실패", error);
    return [];
  }
};
