import { useState, useRef } from "react";
import st from "./Team.module.css";
import Board from "../components/Team/Board";
import CardM from "../components/Team/CardM";
import Massage from "../components/Team/Massage";
import Promise from "../components/Team/Promise";
import PromiseCheck from "../components/Team/PromiseCheck";
import PromiseCheck2 from "../components/Team/PromiseCheck2";
import Teamlist from "../components/Team/Teamlist";
import PromiseDialog from "../components/Dialog/PromiseDialog";
import LinkSnackbar from "../components/Snackbar/LinkSnackbar";
import { teams as teams, links, cards } from "../util/teams";

// 날짜 및 시간 슬롯 설정
const allDates = [
  { date: "2025-06-15" },
  { date: "2025-06-16" },
  { date: "2025-06-17" },
  { date: "2025-06-18" },
  { date: "2025-06-19" },
  { date: "2025-06-20" },
];

const fakeVotes = {
  "2025-06-15": {
    "22:00": ["user1"],
    "23:00": ["user1", "user2"],
  },
  "2025-06-16": {
    "10:00": ["user3"],
  },
  "2025-06-18": {
    "14:00": ["user2", "user3"],
    "15:00": ["user1"],
  },
};

const fakeMyVotes = {
  "2025-06-15": ["22:00", "23:00"],
  "2025-06-18": ["10:00", "11:00", "12:00", "13:00"],
};

const Team = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPromiseCheck, setShowPromiseCheck] = useState(false);

  const [fadeState, setFadeState] = useState("hidden"); // 'visible', 'hiding', 'hidden'

  // 👉 여기서 선택 데이터 상태 관리
  const [mySelections, setMySelections] = useState(fakeMyVotes);
  const [savedSelections, setSavedSelections] = useState(fakeMyVotes);

  const [isPromiseDialogOpen, setIsPromiseDialogOpen] = useState(false);
  const [isLinkSnackbarOpen, setIsLinkSnackbarOpen] = useState(false);
  const [Teams, setTeams] = useState(teams);
  const [selectedTeam, setSelectedTeam] = useState(Teams[0]);
  const [targetTeam, setTargetTeam] = useState(null);

  const timeoutRef = useRef(null);

  const handleTeamSelect = (teamId) => {
    // 팀 선택이 바뀌는지 확인하는 함수
    const updatedTeams = Teams.map((team) => ({
      ...team,
      check: team.teamId === teamId,
    }));

    const newSelectedTeam = updatedTeams.find((team) => team.check);

    setTeams(updatedTeams);
    setSelectedTeam(newSelectedTeam);
  };

  // 링크 버튼 클릭 -> 링크 팝업창 open
  const handleLinkSnackbar = (teamId) => {
    const targetTeam = Teams.find((team) => team.teamId === teamId);
    if (!targetTeam) return;

    // team id에 맞는 링크 가지고 오기
    const linkObj = links.find((link) => link.teamId === teamId);
    const teamWithLink = { ...targetTeam, link: linkObj?.link || "" };

    // 기존 타이머 제거
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setTargetTeam(teamWithLink);
    setIsLinkSnackbarOpen(true);

    // 새 타이머 설정
    timeoutRef.current = setTimeout(() => {
      setIsLinkSnackbarOpen(false);
      timeoutRef.current = null; // 정리
    }, 3000);
  };

  const handleTeamAdd = (teamname) => {
    const newTeam = {
      name: teamname,
      num: 1,
      link: "https://new-link.com",
      dday: null,
      card: {
        name: "새 멤버",
        mbti: "INTP",
        hobby: "코딩",
        secret: "비밀 없음",
        tmi: "생각 많음",
      },
      memo: {
        name: "새 멤버",
        mbti: "INTP",
        hobby: "코딩",
        secret: "비밀 없음",
        tmi: "생각 많음",
      },
      check: false,
    };

    setTeams((prev) => [...prev, newTeam]);
  };

  // 약속 확정 클릭 -> 약속 확정 팝업창 open
  const openPromiseDialog = () => {
    setIsPromiseDialogOpen(true);
  };
  const closePromiseDialog = () => {
    setIsPromiseDialogOpen(false);
  };

  // Promise 클릭 시 (확장 + PromiseCheck 표시)
  const handlePromiseClick = () => {
    if (fadeState === "visible") return;
    setIsExpanded(true); // 박스 확장 먼저
    setShowPromiseCheck(true);
    setFadeState("visible");
  };

  // List 클릭 시 (fade out 시작)
  const handleListClick = () => {
    if (fadeState !== "visible") return;
    setFadeState("hiding"); // PromiseCheck fade out 시작
  };

  // fadeWrap의 opacity transition 끝나면 호출
  const onFadeTransitionEnd = (e) => {
    if (e.propertyName !== "opacity") return;

    if (fadeState === "hiding") {
      setIsExpanded(false); // fade out 완료 후 박스 축소
      // setShowPromiseCheck(false); // DOM에서 제거
      setFadeState("hidden");
    }
  };

  return (
    <>
      <div className={st.Team_container}>
        <section className={st.Team_section1}>
          <div className={`${st.box} ${st.team_borad_box}`}>
            <Board team={selectedTeam} />
          </div>
          <div>
            <div className={`${st.box} ${st.team_card_box}`}>
              <CardM
                card={
                  cards.find((c) => c.teamId === selectedTeam.teamId).card || {}
                }
              />
            </div>
            <div className={`${st.box} ${st.team_message_box}`}>
              <Massage />
            </div>
          </div>
        </section>

        <section className={st.Team_section2}>
          <div
            className={`${st.box} ${st.team_promise_box} ${isExpanded ? st.promExpanded : ""}`}
            onClick={handlePromiseClick}
          >
            <Promise />

            <div
              className={`${st.fadeWrap} ${
                fadeState === "visible" ? st.show : st.hide
              }`}
              style={{ display: fadeState === "hidden" ? "none" : "block" }}
              onTransitionEnd={onFadeTransitionEnd}
            >
              <PromiseCheck2
                userType="LEADER"
                allDates={allDates}
                othersVotes={fakeVotes}
                mySelections={mySelections}
                setMySelections={setMySelections}
                savedSelections={savedSelections}
                setSavedSelections={setSavedSelections}
              />
            </div>
          </div>

          <div
            className={`${st.box} ${st.team_list_box} ${isExpanded ? st.listShrinked : ""}`}
            onClick={handleListClick}
          >
            <Teamlist
              teams={Teams}
              onTeamAdd={handleTeamAdd}
              onLinkClick={handleLinkSnackbar}
              onTeamCheckClick={handleTeamSelect}
            />
          </div>
        </section>
      </div>

      {isLinkSnackbarOpen && <LinkSnackbar link={targetTeam.link} />}

      {isPromiseDialogOpen && (
        <PromiseDialog
          onConfirm={() => {
            // 확인 버튼 눌렀을 때 실행할 로직
            closePromiseDialog();
          }}
          onCancel={closePromiseDialog}
        />
      )}
    </>
  );
};

export default Team;
