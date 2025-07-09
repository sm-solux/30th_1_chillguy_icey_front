import "./Snackbar.css";
import Button from "../Button";

const Snackbar = ({ text, buttontext, buttonOnclick }) => {
  return (
    <div className="popup-basic-space">
      <div className="popup-basic-text-space">{text}</div>

      <div className="popup-basic-button-space">
        <Button text={buttontext} type={"midBlue"} onClick={buttonOnclick} />
      </div>
    </div>
  );
};

export default Snackbar;
