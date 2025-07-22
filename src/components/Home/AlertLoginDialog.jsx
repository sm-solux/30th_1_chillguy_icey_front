import st from "./AlertLoginDialog.module.css";
import Button from "../Button";
const Login_pop_up = ({ onClose }) => {
  //이벤트 객체
  const onClickButton = (e) => {
    console.log(e);
  };
  return (
    <div className={st.div} onClick={onClose}>
      <div className={st.frame_299} onClick={(e) => e.stopPropagation()}>
        <div className={st.group_321}>
          <div className={st.rectangle_162}></div>
          <div className={st.rectangle_163}></div>
        </div>
      </div>
      <div className={st.frame_324}>
        <div className={st.div2}>
          해당 기능을 사용하기 위해서는
          <br />
          로그인이 필요합니다!
        </div>
      </div>
      <div className={st.frame_325}>
        <Button text={"로그인"} type={"midStroke"} />
      </div>
    </div>
  );
};

export default Login_pop_up;
