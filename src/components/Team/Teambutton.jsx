import st from "./Teambutton.module.css";
import check from "../../assets/check.svg";
import link from "../../assets/link.svg";

const Teambutton = ({ teamname, dday, isCheck, onClick, linkonClick }) => {
  return (
    <div className={st.team_button}>
      {/* 왼쪽: 체크박스 + 팀 이름 */}
      <div className={st.left_section}>
        <button
          className={`${st.check_box} ${isCheck ? st.isCheck : ""}`}
          onClick={onClick}
        >
          <img className={st.check_img_size} src={check} alt="check" />
        </button>
        <div className={st.team_name}>{teamname}</div>
      </div>

      {/* 오른쪽: 링크 버튼 + 구분선 + D-day */}
      <div className={st.right_section}>
        <button
          className={st.link_button}
          onClick={() => linkonClick(teamname)}
        >
          <img className={st.link_img_size} src={link} alt="link" />
        </button>
        <div className={st.v_line}></div>
        <div className={st.dday}>{dday}</div>
      </div>
    </div>
  );
};

export default Teambutton;
