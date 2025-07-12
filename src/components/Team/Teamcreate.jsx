import st from "./Teamcreate.module.css";

const Teamcreate = () => {
  return (
    <div className={st.team_create_content}>
      <div className={st.team_create_box}>
        <div className={st.team_create_mid_text}>팀 이름</div>
        <div className={st.team_create_input}>직접 작성</div>
      </div>
    </div>
  );
};

export default Teamcreate;
