import "./Teambutton.css";
import check from "../../assets/check.svg";
import link from "../../assets/link.svg";

// 팀이름, dday 이름, 현재 버튼이 눌린 상태인지 확인, 전체 리스트 버튼을 클릭, 링크 버튼을 클릭했을 때

const Teambutton = ({ teamname, dday, isCheck, onClick, linkonClick }) => {
  return (
    <div className="team-button">
      {/* 왼쪽: 체크박스 + 팀 이름 */}
      <div className="team-button-section left">
        <button
          className={`check-box ${isCheck ? "isCheck" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            onClick(); // ✅ 여기만 상태 전환
          }}
        >
          <img className="check-img-size" src={check} alt="check" />
        </button>
        <div className="teamName">{teamname}</div>
      </div>

      {/* 가운데: 링크 버튼 */}
      <div className="team-button-section middle">
        <button
          className="link-button"
          onClick={(e) => {
            e.stopPropagation();
            linkonClick(); // ✅ 여기만 팝업
          }}
        >
          <img className="link-img-size" src={link} alt="link" />
        </button>
        <div className="v-line"></div>
      </div>

      {/* 오른쪽: D-day */}
      <div className="dday">{dday}</div>
    </div>
  );
};

export default Teambutton;
