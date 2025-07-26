import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export const TeamsTest = () => {
  const { token, isLoggined, backLink } = useAuth();
  const [teams, setTeams] = useState([]);
  const [teamId, setTeamsId] = useState(0);
  const [createTeamData, setCreateTeamData] = useState([]);
  const [teamofTeamId, setTeamofTeamId] = useState([]);

  // GET /api/teams : 팀 리스트 불러오기
  const GetUserTeamList = async () => {
    await axios
      .get(`${backLink}/api/teams`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        setTeams(res.data.data);
      })
      .catch((error) => {
        console.error("/api/teams 연동 오류");
        if (error.response) {
          console.error(
            "응답 에러:",
            error.response.status,
            error.response.data,
          );
        } else if (error.request) {
          console.error("요청은 갔으나 응답 없음:", error.request);
        } else {
          console.error("기타 에러:", error.message);
        }
      });
  };

  // POST /api/teams : 팀 생성
  const CreateUserTeam = async (teamName) => {
    await axios
      .post(
        `${backLink}/api/teams`,
        { teamName: `${teamName}` },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      .then((res) => {
        console.log(res.data);
        setCreateTeamData(res.data.data);
      })
      .catch((error) => {
        console.error(`/api/teams/${teamId} 연동 오류`);
        if (error.response) {
          console.error(
            "응답 에러:",
            error.response.status,
            error.response.data,
          );
        } else if (error.request) {
          console.error("요청은 갔으나 응답 없음", error.request);
        } else {
          console.error("기타 에러", error.message);
        }
      });
  };

  // GET /api/teams/{teamId} : 팀 아이디에 대한 팀 상세 조회
  const GetUserTeamDetailData = async (teamId) => {
    await axios
      .get(`${backLink}/api/teams/${teamId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      .then((res) => {
        console.log(res.data);
        setTeamofTeamId(res.data.data);
      })
      .catch((error) => {
        console.error(`/api/teams/${teamId} 연동 오류`);
        if (error.response) {
          console.error(
            "응답 에러:",
            error.response.status,
            error.response.data,
          );
        } else if (error.request) {
          console.error("요청은 갔으나 응답 없음", error.request);
        } else {
          console.error("기타 에러", error.message);
        }
      });
  };

  return (
    <>
      <div>
        <button onClick={GetUserTeamList}>팀 리스트 확인 연동 테스트</button>
        <div>{JSON.stringify(teams)}</div>
        <button onClick={() => CreateUserTeam("하은아")}>
          팀 생성 연동 테스트
        </button>
        <div>{"생성한 팀 데이터 확인" + JSON.stringify(createTeamData)}</div>
        <button onClick={() => GetUserTeamDetailData(3)}>
          팀 세부 정보 연동 테스트
        </button>
        <div>{JSON.stringify(teamofTeamId)}</div>
      </div>
    </>
  );
};

export default TeamsTest;
