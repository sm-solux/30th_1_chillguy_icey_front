import styles from "./Snackbar.module.css";
import Button from "../Button";

const Snackbar = ({ text, buttontext, buttonOnclick }) => {
  return (
    <div className={styles.popup_basic_space}>
      <div className={styles.popup_basic_text_space}>{text}</div>

      <div className={styles.popup_basic_button_space}>
        <Button text={buttontext} type={"midBlue"} onClick={buttonOnclick} />
      </div>
    </div>
  );
};

export default Snackbar;
