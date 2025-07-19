import { useState } from "react";
import st from "./Balance.module.css";
import balance_line from "../../assets/memo_line.svg";
import balance_delete from "../../assets/memo_delete.svg";
import balance_vs from "../../assets/balance_vs.svg";
import balance_button from "../../assets/balance_button.svg";

// Props
// onDelete: 삭제 버튼 클릭 시 호출 함수 (팀페이지에 작성)

const Balance = ({ onDelete }) => {
  // state: 밸런스 항목 초기값
  const [countA, setCountA] = useState(0);
  const [countB, setCountB] = useState(0);

  return (
    <div className={st.Balance}>
      {/* 도구 영역 (삭제 버튼) */}
      <div className={st.Balance_tools}>
        <img
          className={st.Balance_delete_img}
          src={balance_delete}
          alt="balance_delete"
        />
      </div>
      <img
        className={st.Balance_line_img}
        src={balance_line}
        alt="balance_line"
      />

      {/* 밸런스 게임 버튼 영역 */}
      <div className={st.Button_wrapper}>
        {/* 첫 번째 선택지 */}
        <button
          className={st.Blance_button}
          onClick={() => setCountA(countA + 1)}
        >
          <img
            className={st.Balance_button_img}
            src={balance_button}
            alt="balance_button"
          />
          <span className={`${st.Balance_count} ${st.one}`}>{countA}</span>
          <span className={st.Balance_text}>짜장면</span>
        </button>

        {/* vs 이미지 */}
        <img className={st.Balance_vs_img} src={balance_vs} alt="balance_vs" />

        {/* 두 번째 선택지 */}
        <button
          className={st.Blance_button}
          onClick={() => setCountB(countB + 1)}
        >
          <img
            className={st.Balance_button_img}
            src={balance_button}
            alt="balance_button"
          />
          <span className={`${st.Balance_count} ${st.two}`}>{countB}</span>
          <span className={st.Balance_text}>짬뽕</span>
        </button>
      </div>
    </div>
  );
};

export default Balance;
