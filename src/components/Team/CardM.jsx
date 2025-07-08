import "./CardM.css";
import Img from "../../assets/exPig.png";

const CardM = () => {
  return (
    <div className="CardM-content">
      <div className="cardM-img-background">
        <img className="cardM-img" src={Img} alt=""></img>
      </div>
      <div className="cardM-board">
        <div className="cardM-text">명함이름</div>
        <div className="cardM-text">MBTI</div>
        <div className="cardM-text">취미</div>
        <div className="cardM-text">친해지는 방법</div>
        <div className="cardM-text">TMI</div>
      </div>
    </div>
  );
};

export default CardM;
