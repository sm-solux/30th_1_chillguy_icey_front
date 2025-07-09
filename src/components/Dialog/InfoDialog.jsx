import "./InfoDialog.css";
import Button from "../Button";

const InfoDialog = () => {
  return (
    <div className="info-black-background">
      <div className="info-popup-space">
        <div className="info-text-space">초대를 수락하시겠습니까?</div>

        <div className="info-select-space">
          <div className="info-mid-size-text-space">
            <div className="info-mid-size-text">팀명</div>
            <div className="info-mid-size-text">초대한 사람</div>
          </div>
          <div className="info-popup-v-line"></div>
          <div className="info-mid-size-text-space info-select-drop-box">
            <div className="info-test-text">칠가이</div>
            <div className="info-test-text">발랄한 개구리</div>
          </div>
        </div>

        <div className="info-popup-button-space">
          <Button text={"확정"} type={"midBlue"} />
          <Button text={"취소"} type={"midStroke"} />
        </div>
      </div>
    </div>
  );
};

export default InfoDialog;
