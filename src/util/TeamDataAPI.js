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
    console.error("팀 링크 토큰을 통해 정보를 불러오지 못했습니다.");
    throw error;
  }
};

export const fetchAcceptTeamLink = async (token, invitationToken) => {
  try {
    const response = await axios.post(
      `${backLink}/api/teams/invitation/${invitationToken}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } },
    );
    console.log("링크 토큰을 통해 팀 초대를 수락하였습니다.", response.message);
    return response.message;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const status = error.response.status;
      switch (status) {
        case 404:
          console.error("404 에러: ", error.response.data.message);
          return error.response.data.message;
        case 409:
          console.error("409 에러 - 충돌 : ", error.response.data.message);
          return error.response.data.message;
        default:
          console.error("링크 토큰을 수락하지 못했습니다.");
          throw error;
      }
    } else {
      console.log("네트워크 오류");
      throw error;
    }
  }
};
