import "./PromiseDialog.css";
import Button from "../Button";

const PromiseDialog = () => {
  return (
    <div className="black-background">
      <div className="popup-space">
        <div className="text-space">약속을 확정하시겠습니까?</div>

        <div className="select-space">
          <div className="mid-size-text-space">
            <div className="mid-size-text">날짜</div>
            <div className="mid-size-text">시간</div>
          </div>
          <div className="popup-v-line"></div>
          <div className="mid-size-text-space select-drop-box">
            <div className="test-text">2025.06.27</div>
            <div className="test-text">AM 9:00</div>
          </div>
        </div>

        <div className="popup-button-space">
          <Button text={"확정"} type={"midBlue"} />
          <Button text={"취소"} type={"midStroke"} />
        </div>
      </div>
    </div>
  );
};

export default PromiseDialog;
