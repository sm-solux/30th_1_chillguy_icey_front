import styles from "./LinkSnackbar.module.css";
import Button from "../Button";

const LinkSnackbar = ({ link }) => {
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("링크가 클립보드에 복사되었습니다.");
    } catch (err) {
      alert("복사 실패");
      console.error("복사 실패 ㅣ", err);
    }
  };
  return (
    <div className={styles.popup_invite_space}>
      <div className={styles.popup_invite_text_space}>
        초대 링크를 전송하여 팀원을 초대하세요!
      </div>

      <div className={styles.popup_invite_link_space}>
        <div className={styles.link_text}>{link}</div>
        <Button
          text="복사"
          type={"blue"}
          onClick={() => copyToClipboard(link)}
        />
      </div>
    </div>
  );
};

export default LinkSnackbar;
