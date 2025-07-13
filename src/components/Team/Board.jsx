import st from "./Board.module.css";

const Board = () => {
  return (
    <div className={st.Board_content}>
      <div className={st.board_team_box}>
        <div className={st.board_team_name}>안녕하세요 제이름은</div>
        <div className={st.board_team_number}>|&nbsp;&nbsp;&nbsp;총 7명</div>
      </div>
      <div className={st.board_team_notice}></div>
    </div>
  );
};

export default Board;
