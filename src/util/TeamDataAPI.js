import axios from "axios";

const backLink = "https://icey-backend-1027532113913.asia-northeast3.run.app";

// 로그아웃 처리 함수
const logout = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    await axios.post(
      `${backLink}/api/logout`,
      {},
      { headers: { Authorization: `Bearer ${token}` } },
    );
    console.log("로그아웃 성공");
  } catch (error) {
    console.error("로그아웃 실패", error);
  } finally {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("loginType");
  }
};

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
    // if (error.response?.status === 401) await logout();
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
    // if (error.response?.status === 401) await logout();
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
    console.log("팀 생성 완료:", response.data);
    return response.data;
  } catch (error) {
    // if (error.response?.status === 401) await logout();
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
    // if (error.response?.status === 401) await logout();
    console.error("팀 상세 정보 불러오기 실패:", error);
    throw error;
  }
};

// 초대 링크 토큰으로 팀 정보 조회
export const fetchCheckTeamLinkToken = async (invitationToken, token) => {
  try {
    const response = await axios.get(
      `${backLink}/api/teams/invitation/${invitationToken}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    console.log("팀 링크 토큰을 통해 정보를 불러왔습니다 : ", response.data);
    return response.data;
  } catch (error) {
    // if (error.response?.status === 401) await logout();
    console.error("팀 링크 토큰을 통해 정보를 불러오지 못했습니다.");
    throw error;
  }
};

// 초대 수락
export const fetchAcceptTeamLink = async (token, invitationToken) => {
  try {
    const response = await axios.post(
      `${backLink}/api/teams/invitation/${invitationToken}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } },
    );
    console.log("링크 토큰을 통해 팀 초대를 수락하였습니다.", response);
    return response.data;
  } catch (error) {
    // if (error.response?.status === 401) await logout(); // ✅ 추가
    if (axios.isAxiosError(error) && error.response) {
      const status = error.response.status;
      console.error(`${status} 에러 :`, error.response);
      return error.response.data;
    } else {
      console.log("네트워크 오류");
      throw error;
    }
  }
};

// 내 명함 목록 (특정 팀 내)
export const fetchTeamCardM = async (token, teamId) => {
  try {
    const response = await axios.get(
      `${backLink}/api/cards/teams/${teamId}/cards/my`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    console.log("팀 명함 전체 목록 조회 성공:", response.data);
    return response.data;
  } catch (error) {
    // if (error.response?.status === 401) await logout();
    console.error("팀 명함 전체 목록 조회 실패:", error);
    throw error;
  }
};
