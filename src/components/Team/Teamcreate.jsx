import st from "./Teamcreate.module.css";

const Teamcreate = () => {
  return (
    <div className={st.team_create_content}>
      <div className={st.team_create_box}>
        <div className={st.team_create_mid_text}>팀 이름</div>
        <input
          className={st.team_create_input}
          type="text"
          placeholder="직접 입력"
          maxLength="7" // 만약 글자수 제한 시 사용
        />
      </div>
    </div>
  );
};

export default Teamcreate;
