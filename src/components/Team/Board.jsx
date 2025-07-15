import st from "./Board.module.css";

const Board = ({ team }) => {
  return (
    <div className={st.Board_content}>
      <div className={st.board_team_box}>
        <div className={st.board_team_name}>{team.name}</div>
        <div className={st.board_team_number}>
          |&nbsp;&nbsp;&nbsp;총 {team.num}명
        </div>
      </div>
      <div className={st.board_team_notice}></div>
    </div>
  );
};

export default Board;
