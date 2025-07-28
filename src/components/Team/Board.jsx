import { useState, useEffect } from "react";
import axios from "axios";
import st from "./Board.module.css";
import MemoEdit from "../Memo/MemoEdit";
import Memo from "../Memo/Memo";
import Balance from "../Memo/Balance";

import board_menu from "../../assets/board_menu.svg";
import wide from "../../assets/board_wide.svg";
import memo_add from "../../assets/board_memo_add.svg";
import balance_add from "../../assets/board_balance_add.svg";
import memo_add_disable from "../../assets/memo_add_disable.svg";
import balance_add_disable from "../../assets/balance_add_disable.svg";
import board_narrow from "../../assets/board_narrow.svg";

import { useAuth } from "../../context/AuthContext";

const Board = ({ team, isBoardExpanded, onToggleExpand }) => {
  // 토큰 불러오기
  const { token } = useAuth();
  const backLink = "https://icey-backend-1027532113913.asia-northeast3.run.app";

  // state: 메모 삭제 함수에 사용됨
  const [memos, setMemos] = useState([]);
  // state: 수정할 메모 저장
  const [editingMemo, setEditingMemo] = useState(null);
  // state: 메모 작성 열 때 사용됨
  const [isMemoEditOpen, setIsMemoEditOpen] = useState(false);
  // state: 밸런스 게임 상태
  const [balanceGames, setBalanceGames] = useState([]);
  // state: 메뉴 토글에 사용됨
  const [menuOpen, setMenuOpen] = useState(false);

  const isLimitReached = memos.length + balanceGames.length >= 18;

  useEffect(() => {
    if (!team || !team.teamId) return;

    // 전체 메모 목록 불러오기
    const fetchMemos = async () => {
      try {
        const res = await axios.get(
          `${backLink}/api/teams/${team.teamId}/memos`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log("res.data =", res.data);

        const memoList = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.data)
            ? res.data.data
            : [];
        setMemos(memoList); // 서버에서 받은 메모 배열로 설정
      } catch (err) {
        console.error("메모 목록 불러오기 실패", err);
      }
    };

    // 전체 밸런스 게임 목록 불러오기
    const fetchBalanceGames = async () => {
      try {
        const res = await axios.get(
          `${backLink}/api/teams/${team.teamId}/balance-game`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const balanceList = res.data?.data ?? [];
        setBalanceGames(balanceList);
      } catch (error) {
        console.error("밸런스 게임 목록 불러오기 실패", error);
      }
    };

    fetchMemos();
    fetchBalanceGames();
  }, [team?.teamId]);

  // MemoEdit 여는 함수 (memo가 있으면 수정, 없으면 새로 추가)
  const openMemoEdit = (memo = null) => {
    // 새 메모 추가 시 개수 제한 체크
    if (!memo && memos.length + balanceGames.length >= 18) {
      alert(
        "게시판에는 메모와 밸런스 게임을 합쳐 최대 18개까지만 생성할 수 있습니다.",
      );
      return;
    }

    setEditingMemo(memo);
    setIsMemoEditOpen(true);
  };

  // MemoEdit 닫는 함수
  const closeMemoEdit = () => {
    setIsMemoEditOpen(false);
    setEditingMemo(null);
  };

  // 메모 저장 성공 시 호출되는 함수
  const handleMemoSave = (savedMemo) => {
    setMemos((prev) => {
      const exists = prev.some((m) => m.memoId === savedMemo.memoId);
      if (exists) {
        return prev.map((m) => (m.memoId === savedMemo.memoId ? savedMemo : m));
      } else {
        return [savedMemo, ...prev];
      }
    });
    closeMemoEdit();
  };

  // 메모 삭제 함수
  const handleDeleteMemo = async (teamId, memoId) => {
    try {
      await axios.delete(`${backLink}/api/teams/${teamId}/memos/${memoId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMemos((prev) => prev.filter((memo) => memo.memoId !== memoId));
    } catch (error) {
      console.error("메모 삭제 실패", error);
      alert("삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 밸런스 게임 생성
  const handleAddBalance = async () => {
    if (memos.length + balanceGames.length >= 18) {
      alert(
        "게시판에는 메모와 밸런스 게임을 합쳐 최대 18개까지만 생성할 수 있습니다.",
      );
      return;
    }
    if (balanceGames.length >= 2) {
      alert("밸런스 게임은 최대 2개까지만 생성할 수 있습니다.");
      return;
    }
    try {
      const res = await axios.post(
        `${backLink}/api/teams/${team.teamId}/balance-game/generate`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const newGame = res.data?.data;
      if (newGame) {
        setBalanceGames((prev) => [...prev, newGame]);
      }
      // 생성 후 최신 밸런스 게임 목록 다시 불러오기
      const resList = await axios.get(
        `${backLink}/api/teams/${team.teamId}/balance-game`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const balanceList = resList.data?.data ?? [];
      setBalanceGames(balanceList);
    } catch (error) {
      console.error("밸런스 게임 생성 실패", error);
      alert("밸런스 게임 생성에 실패했습니다.");
    }
  };

  // 밸런스 게임 삭제
  const handleBalanceDelete = async (gameId) => {
    try {
      await axios.delete(
        `${backLink}/api/teams/${team.teamId}/balance-game/${gameId}/delete`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      // 삭제 후 상태 업데이트
      setBalanceGames((prev) => prev.filter((game) => game.id !== gameId));
    } catch (error) {
      console.error("밸런스 게임 삭제 실패", error);
      alert("밸런스 게임 삭제에 실패했습니다.");
    }
  };

  // 밸런스 게임 투표
  const handleBalanceVote = async (gameId, selectedOption) => {
    try {
      await axios.post(
        `${backLink}/api/teams/${team.teamId}/balance-game/${gameId}/vote`,
        { selectedOption: Number(selectedOption) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      // 투표 후 최신 목록 다시 불러오기
      const res = await axios.get(
        `${backLink}/api/teams/${team.teamId}/balance-game`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = res.data?.data || [];
      setBalanceGames(data);
    } catch (error) {
      console.error("밸런스 게임 투표 실패", error);

      // 중복 투표 에러 메시지 분기
      if (
        error.response?.status === 400 &&
        error.response.data?.message === "투표는 1회만 가능합니다."
      ) {
        // 중복 투표인 경우
        throw new Error("이미 투표하셨습니다!");
      } else {
        // 그 외 에러는 alert
        alert("투표에 실패했습니다.");
        throw error;
      }
    }
  };

  // 게시판 메뉴 토글 버튼
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // 게시판 확장 토글 (상위에서 상태 관리하므로 콜백 호출)
  const toggleExpand = () => {
    if (onToggleExpand) onToggleExpand();
  };

  // 팀 아이디 아직 없는 경우 게시판 로딩 중 표시
  if (!team || !team.teamId) return <div>로딩 중...</div>;

  // memos와 balanceGames 합치고 createdAt 기준 내림차순 정렬
  const combinedItems = [...memos, ...balanceGames].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB - dateA; // 내림차순 정렬
  });

  // 팀별 밸런스 게임 투표 결과 조회 함수
  const getVoteResult = async (gameId) => {
    if (!token || !team.teamId || !gameId) return;
    try {
      const res = await axios.get(
        `${backLink}/api/teams/${team.teamId}/balance-game/${gameId}/result`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return res.data; // 예: { totalVotes: 5 }
    } catch (err) {
      console.error("투표 결과 조회 실패:", err);
      return { totalVotes: 0 };
    }
  };

  return (
    <div className={st.Board_content}>
      <div
        className={`${st.board_team_box} ${isBoardExpanded ? st.expanded : ""}`}
      >
        <div className={st.board_team_name}>{team.teamName}</div>
        <div className={st.board_team_number}>
          |&nbsp;&nbsp;&nbsp;총 {team.memberCount}명
        </div>
      </div>

      <div className={st.board_team_notice}>
        <div
          className={`${st.board_wrapper} ${isBoardExpanded ? st.expanded : ""}`}
        >
          {combinedItems.map((item) => {
            // memos는 memoId가 있고, balanceGames는 id
            if (item.memoId !== undefined) {
              return (
                <Memo
                  key={`memo-${item.memoId}`}
                  teamId={team.teamId}
                  memoId={item.memoId}
                  memo={item}
                  onDelete={handleDeleteMemo}
                  onEdit={() => openMemoEdit(item)}
                />
              );
            } else if (item.id !== undefined) {
              return (
                <Balance
                  key={`balance-${item.id}`}
                  gameId={item.id}
                  option1={item.option1}
                  option1Count={item.option1Count}
                  option2={item.option2}
                  option2Count={item.option2Count}
                  totalVotes={item.totalVotes}
                  onDelete={() => handleBalanceDelete(item.id)}
                  onVote={(gameId, selectedOption) =>
                    handleBalanceVote(gameId, selectedOption)
                  }
                  teamMemberCount={team.memberCount}
                  getVoteResult={getVoteResult}
                  userSelectedOption={item.userSelectedOption}
                />
              );
            }
            return null;
          })}
        </div>

        <div className={st.Menu_container}>
          {menuOpen && (
            <div className={st.Menu_buttons}>
              <button
                className={st.Menu_item}
                onClick={() => {
                  if (!isLimitReached) openMemoEdit(null);
                }}
                disabled={isLimitReached}
              >
                <img
                  src={isLimitReached ? memo_add_disable : memo_add}
                  alt="메모"
                />
              </button>
              <button
                className={st.Menu_item}
                onClick={() => {
                  if (!isLimitReached) handleAddBalance();
                }}
                disabled={isLimitReached}
              >
                <img
                  src={isLimitReached ? balance_add_disable : balance_add}
                  alt="밸런스 게임"
                />
              </button>
              <button className={st.Menu_item} onClick={toggleExpand}>
                <img
                  src={isBoardExpanded ? board_narrow : wide}
                  alt={isBoardExpanded ? "축소" : "확대"}
                />
              </button>
            </div>
          )}
          {/* 메뉴 토글 버튼 */}
          <button
            className={`${st.Menu_toggle} ${menuOpen ? st.rotate : ""}`}
            onClick={toggleMenu}
          >
            <img src={board_menu} alt="게시판 메뉴" />
          </button>
        </div>

        {isMemoEditOpen && (
          <MemoEdit
            teamId={team.teamId}
            editingMemo={editingMemo} // 수정 시 내용 전달, 새로 추가 시 null
            onSave={handleMemoSave}
            onClose={closeMemoEdit} // 닫기 함수 전달
          />
        )}
      </div>
    </div>
  );
};

export default Board;
