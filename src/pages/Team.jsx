import { useState, useRef } from "react";
import st from "./Team.module.css";
import Board from "../components/Team/Board";
import CardM from "../components/Team/CardM";
import Massage from "../components/Team/Massage";
import Promise from "../components/Team/Promise";
import PromiseCheck from "../components/Team/PromiseCheck";
import Teamlist from "../components/Team/Teamlist";
import PromiseDialog from "../components/Dialog/PromiseDialog";
import LinkSnackbar from "../components/Snackbar/LinkSnackbar";

const teams = [
  {
    name: "초코칩조아",
    num: 6,
    link: "https://www.when2meet.com/team1",
    dday: 3,
    card: {
      name: "초코 우유",
      mbti: "INFP",
      hobby: "그림 그리기",
      secret: "혼자 콘서트 다님",
      tmi: "쿠키 반죽 먹어봄",
    },
    memo: {
      name: "초코 우유",
      mbti: "INFP",
      hobby: "그림 그리기",
      secret: "혼자 콘서트 다님",
      tmi: "쿠키 반죽 먹어봄",
    },
    check: true,
  },
  {
    name: "감성어택단",
    num: 4,
    link: "https://www.when2meet.com/team2",
    dday: 7,
    card: {
      name: "감자꽃",
      mbti: "ISFP",
      hobby: "사진 찍기",
      secret: "노래방 마이크 있음",
      tmi: "창밖 비 올 때 우는 편",
    },
    memo: {
      name: "감자꽃",
      mbti: "ISFP",
      hobby: "사진 찍기",
      secret: "노래방 마이크 있음",
      tmi: "창밖 비 올 때 우는 편",
    },
    check: false,
  },
  {
    name: "불꽃연합",
    num: 8,
    link: "https://www.when2meet.com/team3",
    dday: 15,
    card: {
      name: "파이어볼",
      mbti: "ENTJ",
      hobby: "등산",
      secret: "사실 고소공포증 있음",
      tmi: "라면 끓일 때 타이머 씀",
    },
    memo: {
      name: "파이어볼",
      mbti: "ENTJ",
      hobby: "등산",
      secret: "사실 고소공포증 있음",
      tmi: "라면 끓일 때 타이머 씀",
    },
    check: false,
  },
  {
    name: "무지개포유류",
    num: 5,
    link: "https://www.when2meet.com/team4",
    dday: 22,
    card: {
      name: "몽실몽실",
      mbti: "ENFP",
      hobby: "우쿨렐레",
      secret: "중학생 때 밴드부",
      tmi: "무지개 양말 컬렉터",
    },
    memo: {
      name: "몽실몽실",
      mbti: "ENFP",
      hobby: "우쿨렐레",
      secret: "중학생 때 밴드부",
      tmi: "무지개 양말 컬렉터",
    },
    check: false,
  },
  {
    name: "코딩조아조",
    num: 2,
    link: "https://www.when2meet.com/team5",
    dday: 35,
    card: {
      name: "버그헌터",
      mbti: "ISTJ",
      hobby: "디버깅",
      secret: "어릴 때 C언어 책 읽음",
      tmi: "git commit 메시지 시 짧은 시 씀",
    },
    memo: {
      name: "버그헌터",
      mbti: "ISTJ",
      hobby: "디버깅",
      secret: "어릴 때 C언어 책 읽음",
      tmi: "git commit 메시지 시 짧은 시 씀",
    },
    check: false,
  },
];

const Team = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPromiseCheck, setShowPromiseCheck] = useState(false);
  const [fadeState, setFadeState] = useState("hidden"); // 'visible', 'hiding', 'hidden'
  const [isPromiseDialogOpen, setIsPromiseDialogOpen] = useState(false);
  const [isLinkSnackbarOpen, setIsLinkSnackbarOpen] = useState(false);
  const [Teams, setTeams] = useState(teams);
  const [selectedTeam, setSelectedTeam] = useState(Teams[0]);
  const [targetTeam, setTargetTeam] = useState(null);

  const timeoutRef = useRef(null);

  const handleTeamSelect = (teamName) => {
    // 팀 선택이 바뀌는지 확인하는 함수
    const updatedTeams = Teams.map((team) => ({
      ...team,
      check: team.name === teamName,
    }));

    const newSelectedTeam = updatedTeams.find((team) => team.check);

    setTeams(updatedTeams);
    setSelectedTeam(newSelectedTeam);
  };

  // 링크 버튼 클릭 -> 링크 팝업창 open
  const handleLinkSnackbar = (teamName) => {
    const targetTeam = Teams.find((team) => team.name === teamName);
    if (!targetTeam) return;

    // 기존 타이머 제거
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setTargetTeam(targetTeam);
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
      setShowPromiseCheck(false); // DOM에서 제거
      setFadeState("hidden");
    }
  };

  return (
    <>
      <div className={st.Team_container}>
        <section className={st.Team_section1}>
          <div className={`${st.box} ${st.team_borad_box}`}>
            <Board />
          </div>
          <div>
            <div className={`${st.box} ${st.team_card_box}`}>
              <CardM team={selectedTeam} />
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
            {showPromiseCheck && (
              <div
                className={`${st.fadeWrap} ${fadeState === "visible" ? st.show : st.hide}`}
                onTransitionEnd={onFadeTransitionEnd}
              >
                {/* 리더가 아니면, 시간과 완료만 띄어줌. -> 리더면, 날짜/시간, 약속 확정,완료가 뜸 */}
                <PromiseCheck userType="Leader" onConfirm={openPromiseDialog} />
              </div>
            )}
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
