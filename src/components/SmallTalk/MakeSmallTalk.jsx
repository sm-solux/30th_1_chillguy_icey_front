import mst from "./MakeSmallTalk.module.css";
const MakeSmallTalk = () => {
  //이벤트 객체
  const onClickButton = (e) => {
    console.log(e);
  };
  return (
    <button className={mst.MakeSmallTalk} onClick={onClickButton}>
      스몰톡 생성하기
    </button>
  );
};

export default MakeSmallTalk;
