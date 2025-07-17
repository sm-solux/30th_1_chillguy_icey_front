import del from "./Delete.module.css";

const Delete = ({ onClick }) => {
  const onClickButton = (e) => {
    e.stopPropagation(); // ✅ 부모 div 클릭 막기
    if (onClick) onClick(); // ✅ 전달받은 onClick 실행
  };

  return (
    <button className={del.Delete_Button} onClick={onClickButton}>
      삭제
    </button>
  );
};

export default Delete;
