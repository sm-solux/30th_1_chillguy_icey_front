import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import st from "./Teamlist.module.css";
import Button from "../Button";
import Teambutton from "./Teambutton";
import Teamcreate from "./Teamcreate";
import { useAuth } from "../../context/AuthContext";

const Teamlist = ({
  teams,
  onLinkClick,
  onTeamCheckClick,
  onTeamAdd,
  selectedTeamId,
}) => {
  const [showCreate, setShowCreate] = useState(false);
  const [teamName, setTeamName] = useState("");
  const contentRef = useRef(null);
  const { isLoggedIn, loading } = useAuth();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    const pathToSave = location.pathname + location.search;
    console.log("🔒 로그인 필요. 이동 전 path 저장:", pathToSave);
    sessionStorage.setItem("loginRedirectPath", pathToSave);

    navigate("/login");
  };

  const activeEnter = (e) => {
    if (e.key === "Enter") handleCreateClick();
  };

  const handleCreateClick = () => {
    if (showCreate && teamName.trim()) {
      onTeamAdd(teamName);
      setShowCreate(false);
      setTeamName("");
    } else {
      setShowCreate(true);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (contentRef.current && !contentRef.current.contains(e.target)) {
        setShowCreate(false);
        setTeamName("");
      }
    };
    window.addEventListener("mousedown", handleOutsideClick);
    return () => window.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const renderContent = () => {
    if (showCreate) {
      return (
        <Teamcreate
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          onKeyDown={activeEnter}
        />
      );
    }

    if (teams === 401 || !isLoggedIn) {
      return <div className={st.teamlist_null_text}>연결이 끊겼습니다.</div>;
    }

    if (teams && teams.length === 0) {
      return <div className={st.teamlist_null_text}>생성된 팀이 없습니다.</div>;
    }

    if (teams && teams.length > 0) {
      return (
        <>
          {teams.map((team) => (
            <Teambutton
              key={team.id}
              teamname={team.teamName}
              dday={team.dday || ""}
              isCheck={team.id === selectedTeamId}
              onClick={() => onTeamCheckClick(team.id)}
              linkonClick={() => onLinkClick(team.id)}
            />
          ))}
        </>
      );
    }

    return null;
  };

  const renderButton = () => {
    if (teams === 401 || !isLoggedIn) {
      return <Button text="로그인" type="mid" onClick={handleLoginClick} />; // 로그인 버튼, onClick은 사용자 삽입 예정
    }

    return <Button text="팀 생성" type="mid" onClick={handleCreateClick} />;
  };

  return (
    <div className={st.Teamlist_content} ref={contentRef}>
      <div className={st.Teamlist_space}>{renderContent()}</div>
      <div className={st.Teamlist_button_space}>{renderButton()}</div>
    </div>
  );
};

export default Teamlist;
