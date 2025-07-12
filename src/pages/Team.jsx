import st from "./Team.module.css";
import Board from "../components/Team/Board";
import CardM from "../components/Team/CardM";
import Massage from "../components/Team/Massage";
import Promise from "../components/Team/Promise";
import PromiseCheck from "../components/Team/PromiseCheck";
import Teamlist from "../components/Team/Teamlist";

const Team = () => {
  return (
    <div className={st.Team_container}>
      {/* 왼쪽 섹션 (크고 3개) */}
      <section className={st.Team_section1}>
        <div className={`${st.box} ${st.team_borad_box}`}>
          <Board />
        </div>
        <div>
          <div className={`${st.box} ${st.team_card_box}`}>
            <CardM />
          </div>
          <div className={`${st.box} ${st.team_message_box}`}>
            <Massage />
          </div>
        </div>
      </section>

      {/* 오른쪽 섹션 (작고 2개) */}
      <section className={st.Team_section2}>
        <div className={`${st.box} ${st.team_promise_box} ${st.promExpanded}`}>
          {/* <Promise /> */}
          <PromiseCheck />
          {/* 만약 활성화 되면, 여기에 약속 확정 컴포넌트 넣기 */}
        </div>
        <div className={`${st.box} ${st.team_list_box} ${st.listShrinked}`}>
          <Teamlist />
        </div>
      </section>
    </div>
  );
};

export default Team;
