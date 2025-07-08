import "./Team.css";
import Board from "../components/Team/Board";
import CardM from "../components/Team/CardM";
import Massage from "../components/Team/Massage";
import Promise from "../components/Team/Promise";
import Teamlist from "../components/Team/Teamlist";

const Team = () => {
  return (
    <div className="Team-container">
      {/* 왼쪽 섹션 (크고 3개) */}
      <section className="Team-section1">
        <div className="box team-borad-box">
          <Board />
        </div>
        <div>
          <div className="box team-card-box">
            <CardM />
          </div>
          <div className="box team-message-box">
            <Massage />
          </div>
        </div>
      </section>

      {/* 오른쪽 섹션 (작고 2개) */}
      <section className="Team-section2">
        <div className="box team-promise-box">
          <Promise />
          {/* 만약 활성화 되면, 여기에 약속 확정 컴포넌트 넣기 */}
        </div>
        <div className="box team-list-box">
          <Teamlist />
        </div>
      </section>
    </div>
  );
};

export default Team;
