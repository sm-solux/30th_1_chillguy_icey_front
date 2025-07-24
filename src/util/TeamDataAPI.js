import axios from "axios";

const backLink = "https://icey-backend-1027532113913.asia-northeast3.run.app";

// 팀 전체 목록 조회
export const fetchTeamList = async (token) => {
  try {
    const response = await axios.get(`${backLink}/api/teams`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("팀 리스트 불러오기 실패:", error);
    throw error;
  }
};

// 특정 팀 상세 조회
export const fetchTeamDetail = async (token, teamId) => {
  try {
    const response = await axios.get(`${backLink}/api/teams/${teamId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("팀 상세 정보 불러오기 실패:", error);
    throw error;
  }
};

// 팀 생성
export const createTeam = async (token, teamName) => {
  try {
    const response = await axios.post(
      `${backLink}/api/teams`,
      { teamName: `${teamName}` },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response.data;
  } catch (error) {
    console.error("팀 생성 실패:", error);
    throw error;
  }
};

// 특정 팀 링크 조회
export const fetchTeamLink = async (token, teamId) => {
  try {
    const response = await axios.get(
      `${backLink}/api/teams/${teamId}/invitation`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response.data;
  } catch (error) {
    console.error("팀 상세 정보 불러오기 실패:", error);
    throw error;
  }
};
