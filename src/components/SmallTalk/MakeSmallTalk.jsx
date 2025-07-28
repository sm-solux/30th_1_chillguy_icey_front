import mst from "./MakeSmallTalk.module.css";
const MakeSmallTalk = ({ onClick }) => {
  return (
    <button className={mst.MakeSmallTalk} onClick={onClick}>
      스몰톡 생성하기
    </button>
  );
};

export default MakeSmallTalk;
