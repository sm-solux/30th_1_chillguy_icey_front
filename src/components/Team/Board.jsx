import "./Board.css";

const Board = () => {
  return (
    <div className="Board-content">
      <div className="board-team-box">
        <div className="board-team-name">안녕하세요 제이름은</div>
        <div className="board-team-number">|&nbsp;&nbsp;&nbsp;총 7명</div>
      </div>
      <div className="board-team-notice "></div>
    </div>
  );
};

export default Board;
