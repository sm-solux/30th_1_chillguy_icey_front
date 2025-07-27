import { useState, useRef, useEffect } from "react";
import st from "./Team.module.css";
import Board from "../components/Team/Board";
import CardM from "../components/Team/CardM";
import Massage from "../components/Team/Massage";
import Promise from "../components/Team/Promise";
import PromiseCheck2 from "../components/Team/PromiseCheck2";
import Teamlist from "../components/Team/Teamlist";
import PromiseDialog from "../components/Dialog/PromiseDialog";
import LinkSnackbar from "../components/Snackbar/LinkSnackbar";
import { useAuth } from "../context/AuthContext";
import {
  fetchTeamList,
  fetchTeamDetail,
  createTeam,
  fetchTeamLink,
} from "../util/TeamDataAPI";
import {
  fetchTeamVoteCreate,
  fetchTeamVotesSummary,
  fetchTeamMyVotes,
  fetchMaxCandidates,
  fetchScheduleConfirm,
} from "../util/TeamVoteAPI";

const Team = () => {
  const { token } = useAuth();

  const [isExpanded, setIsExpanded] = useState(false);
  const [showPromiseCheck, setShowPromiseCheck] = useState(false);
  const [fadeState, setFadeState] = useState("hidden");

  const [teams, setTeams] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [invitationLink, setInvitationLink] = useState("");
  const [isLinkSnackbarOpen, setIsLinkSnackbarOpen] = useState(false);
  const [isPromiseDialogOpen, setIsPromiseDialogOpen] = useState(false);

  const [pendingTeamId, setPendingTeamId] = useState(null);
  const timeoutRef = useRef(null);
  const lastFetchedTeamId = useRef(null);
  const lastFetchedVotesTeamId = useRef(null);

  const [myVotes, setMyVotes] = useState([]);
  const [hasDateVotes, setHasDateVotes] = useState(false);
  const [savedVotes, setSavedVotes] = useState([]);
  const [summary, setSummary] = useState([]);
  const [maxVoteCount, setMaxVoteCount] = useState(0);
  const [bestCandidates, setBestCandidates] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [isDateSaved, setIsDateSaved] = useState(false);
  const [confirmVoteData, setConfirmVoteData] = useState([]);

  // 🔁 팀 리스트 로드
  useEffect(() => {
    const loadTeams = async () => {
      try {
        const res = await fetchTeamList(token);
        const teamList = res.data;
        setTeams(teamList);
        if (teamList.length > 0) {
          setSelectedTeamId((prevId) => prevId || teamList[0].id);
        }
      } catch (error) {
        console.error("팀 목록 불러오기 실패", error);
      }
    };
    if (token) loadTeams();
  }, [token]);

  useEffect(() => {
    // 하나라도 선택된 항목이 있으면 true
    const result = selectedDates.some((d) => d.length > 0);
    setHasDateVotes(result);
  }, [selectedDates]);

  // 🔁 팀 상세 정보 로드 (중복 방지)
  useEffect(() => {
    const loadTeamDetail = async () => {
      if (!selectedTeamId || lastFetchedTeamId.current === selectedTeamId)
        return;

      try {
        const res = await fetchTeamDetail(token, selectedTeamId);
        setSelectedTeam(res.data);
        lastFetchedTeamId.current = selectedTeamId;
      } catch (error) {
        console.error("팀 상세 정보 불러오기 실패", error);
      }
    };
    if (token && selectedTeamId) {
      loadTeamDetail();
    }
  }, [selectedTeamId, token]);

  // 🔁 투표 데이터 로드 (중복 방지)
  useEffect(() => {
    const loadVoteData = async () => {
      if (!selectedTeamId || !selectedTeam || !selectedTeam.hasSchedule) return;
      if (lastFetchedVotesTeamId.current === selectedTeamId) return;

      try {
        const [resSum, resVotes] = await Promise.all([
          fetchTeamVotesSummary(token, selectedTeamId),
          fetchTeamMyVotes(token, selectedTeamId),
        ]);

        setMaxVoteCount(resSum.data.maxVoteCount);
        setSummary(resSum.data.summary);
        setMyVotes(resVotes.data.myVotes);
        setSavedVotes(resVotes.data.myVotes);
        lastFetchedVotesTeamId.current = selectedTeamId;
      } catch (err) {
        console.error("투표 정보 불러오기 실패", err);
      }
    };
    if (token && selectedTeamId && selectedTeam) {
      loadVoteData();
    }
  }, [selectedTeamId, selectedTeam, token]);

  // ✅ 팀 선택 핸들링
  const handleTeamSelect = (teamId) => {
    if (fadeState === "visible") {
      setFadeState("hiding");
      setPendingTeamId(teamId);
    } else {
      if (selectedTeamId !== teamId) {
        setSelectedTeamId(teamId);
      }
    }
  };

  const handleLinkSnackbar = async (teamId) => {
    try {
      const res = await fetchTeamLink(token, teamId);
      setInvitationLink(res.data.invitationLink || "");
      setIsLinkSnackbarOpen(true);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setIsLinkSnackbarOpen(false);
        timeoutRef.current = null;
      }, 3000);
    } catch (error) {
      console.error("초대 링크 가져오기 실패", error);
    }
  };

  const handleTeamAdd = async (teamName) => {
    try {
      const res = await createTeam(token, teamName);
      const newres = await fetchTeamList(token);
      const newTeamList = newres.data;
      setTeams(newTeamList);
      setSelectedTeamId(res.data.teamId);
      lastFetchedTeamId.current = null;
      lastFetchedVotesTeamId.current = null;
    } catch (error) {
      console.error("팀 생성 실패", error);
    }
  };

  const handlePromiseClick = () => {
    if (fadeState === "visible") return;
    if (selectedTeam?.confirmedDate !== null) return;
    setIsExpanded(true);
    setShowPromiseCheck(true);
    setFadeState("visible");
  };

  const handleListClick = () => {
    if (fadeState !== "visible") return;
    if (selectedTeam?.confirmedDate !== null) return;
    setFadeState("hiding");
  };

  const onFadeTransitionEnd = (e) => {
    if (e.propertyName !== "opacity") return;
    if (fadeState === "hiding") {
      setIsExpanded(false);
      setFadeState("hidden");
      if (pendingTeamId !== null) {
        if (selectedTeamId !== pendingTeamId) {
          setSelectedTeamId(pendingTeamId);
        }
        setPendingTeamId(null);
      }
    }
  };

  const openPromiseDialog = async () => {
    try {
      const bestCandidates = await fetchMaxCandidates(token, selectedTeamId);
      setBestCandidates(bestCandidates.data.results);
      setIsPromiseDialogOpen(true);
    } catch (err) {
      console.error("최다 후보 가져오기 실패", err);
    }
  };

  const closePromiseDialog = () => setIsPromiseDialogOpen(false);

  const confirmPromiseDialog = async (data) => {
    await fetchScheduleConfirm(token, selectedTeamId, data);
    const res = await fetchTeamDetail(token, selectedTeamId);
    setSelectedTeam(res.data);
    lastFetchedTeamId.current = selectedTeamId;

    setFadeState("hidden");
    setIsExpanded(false);
    setIsPromiseDialogOpen(false);
  };

  const handleSaveDate = async () => {
    const res = await fetchTeamVoteCreate(token, selectedTeamId, selectedDates);
    setSummary(res.data.summary);
    setMyVotes(res.data.myVotes);
    setIsDateSaved(false);
  };

  return (
    <>
      <div className={st.Team_container}>
        <section className={st.Team_section1}>
          <div className={`${st.box} ${st.team_borad_box}`}>
            {selectedTeam && <Board team={selectedTeam} />}
          </div>
          <div>
            <div className={`${st.box} ${st.team_card_box}`}>
              {selectedTeam && (
                <CardM card={{}} team={selectedTeam} />
                // TODO: card 데이터 별도 조회 필요 시 fetchTeamCard 추가 필요
              )}
            </div>
            <div className={`${st.box} ${st.team_message_box}`}>
              {selectedTeam && <Massage team={selectedTeam} />}
            </div>
          </div>
        </section>

        <section className={st.Team_section2}>
          <div
            className={`${st.box} ${st.team_promise_box} ${isExpanded && selectedTeam?.confirmedDate === null ? st.promExpanded : ""}`}
            onClick={handlePromiseClick}
          >
            {selectedTeam && (
              <Promise
                team={selectedTeam}
                teamCreateDate={selectedTeam.createdAt}
                goalDate={selectedTeam.confirmedDate}
              />
            )}

            <div
              className={`${st.fadeWrap} ${fadeState === "visible" ? st.show : st.hide}`}
              style={{ display: fadeState === "hidden" ? "none" : "block" }}
              onTransitionEnd={onFadeTransitionEnd}
            >
              {selectedTeam && (
                <PromiseCheck2
                  team={selectedTeam}
                  summary={summary}
                  myVotes={myVotes}
                  setMyVotes={setMyVotes}
                  hasDateVotes={hasDateVotes}
                  savedVotes={savedVotes}
                  setSavedVotes={setSavedVotes}
                  setSummary={setSummary}
                  maxVoteCount={maxVoteCount}
                  setMaxVoteCount={setMaxVoteCount}
                  openPromiseDialog={openPromiseDialog}
                  selectedDates={selectedDates}
                  setSelectedDates={setSelectedDates}
                  isDateSaved={isDateSaved}
                  onSaveDate={handleSaveDate}
                />
              )}
            </div>
          </div>

          <div
            className={`${st.box} ${st.team_list_box} ${isExpanded ? st.listShrinked : ""}`}
            onClick={handleListClick}
          >
            <Teamlist
              teams={teams}
              onTeamAdd={handleTeamAdd}
              onLinkClick={handleLinkSnackbar}
              onTeamCheckClick={handleTeamSelect}
              selectedTeamId={selectedTeamId}
            />
          </div>
        </section>
      </div>

      {isLinkSnackbarOpen && <LinkSnackbar link={invitationLink} />}

      {isPromiseDialogOpen && (
        <PromiseDialog
          bestCandidates={bestCandidates}
          onConfirm={confirmPromiseDialog}
          onCancel={closePromiseDialog}
          setConfirmVoteData={setConfirmVoteData}
        />
      )}

      {/* 🧪 레거시 코드 */}
      {/* 
      const [Teams, setTeams] = useState(teams);
      const [Links, setLinks] = useState(links);
      const [Cards, setCards] = useState(cards);
      const [selectedTeam, setSelectedTeam] = useState(Teams[0]);
      */}
    </>
  );
};

export default Team;
