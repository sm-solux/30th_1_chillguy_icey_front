import "./LinkSnackbar.css";
import Button from "../Button";

const LinkSnackbar = () => {
  return (
    <div className="popup-invite-space">
      <div className="popup-invite-text-space">
        초대 링크를 전송하여 팀원을 초대하세요!
      </div>

      <div className="popup-invite-link-space">
        <div className="link-text">https://asdfaasdfsdkfjlsgjksdl</div>
        <Button text="복사" type={"blue"} />
      </div>
    </div>
  );
};

export default LinkSnackbar;
