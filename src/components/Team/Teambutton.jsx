import st from "./Teambutton.module.css";
import check from "../../assets/check.svg";
import link from "../../assets/link.svg";

const Teambutton = ({ teamname, dday, isCheck, onClick, linkonClick }) => {
  return (
    <div className={st.team_button}>
      {/* 왼쪽: 체크박스 + 팀 이름 */}
      <div className={`${st.team_button_section} left`}>
        <button
          className={`${st.check_box} ${isCheck ? st.isCheck : ""}`}
          onClick={onClick} // ✅ 여기만 상태 전환
        >
          <img className={st.check_img_size} src={check} alt="check" />
        </button>
        <div className={st.teamName}>{teamname}</div>
      </div>

      {/* 가운데: 링크 버튼 */}
      <div className={`${st.team_button_section} middle`}>
        <button
          className={st.link_button}
          onClick={() => linkonClick(teamname)}
        >
          <img className={st.link_img_size} src={link} alt="link" />
        </button>
        <div className={st.v_line}></div>
      </div>

      {/* 오른쪽: D-day */}
      <div className={st.dday}>{dday}</div>
    </div>
  );
};

export default Teambutton;
