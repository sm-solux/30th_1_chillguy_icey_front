import st from "./Teamcreate.module.css";

const Teamcreate = ({ value, onChange, onKeyDown }) => {
  return (
    <div className={st.team_create_content}>
      <div className={st.team_create_box}>
        <div className={st.team_create_mid_text}>팀 이름</div>
        <input
          className={st.team_create_input}
          type="text"
          placeholder="직접 입력"
          maxLength="7"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
      </div>
    </div>
  );
};

export default Teamcreate;
