import st from "./CardM.module.css";
import Img from "../../assets/exPig.png";

const CardM = () => {
  return (
    <div className={st.CardM_content} onClick="">
      <div className={st.cardM_img_background}>
        <img className={st.cardM_img} src={Img} alt="" />
      </div>
      <div className={st.cardM_board}>
        <div className={st.cardM_text}>명함이름</div>
        <div className={st.cardM_text}>MBTI</div>
        <div className={st.cardM_text}>취미</div>
        <div className={st.cardM_text}>친해지는 방법</div>
        <div className={st.cardM_text}>TMI</div>
      </div>
    </div>
  );
};

export default CardM;
