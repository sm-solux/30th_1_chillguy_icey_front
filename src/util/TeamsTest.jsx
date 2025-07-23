import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export const TeamsTest = () => {
  const { token, isLoggined, backLink } = useAuth();
  const [teams, setTeams] = useState([]);
  const GetUserTeamList = async () => {
    // console.log(header);
    console.log(backLink);
    console.log(token);
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

  return (
    <>
      <div>
        <button onClick={GetUserTeamList}>연동 테스트</button>
        <div>{JSON.stringify(teams)}</div>
      </div>
    </>
  );
};

export default TeamsTest;
