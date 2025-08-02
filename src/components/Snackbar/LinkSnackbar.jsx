import styles from "./LinkSnackbar.module.css";
import Button from "../Button";

const LinkSnackbar = ({ link }) => {
  const copyToClipboard = async (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        console.log("링크가 클립보드에 복사되었습니다.", text);
      } catch (err) {
        fallbackCopyToClipboard(text);
      }
    } else {
      fallbackCopyToClipboard(text);
    }
  };

  const fallbackCopyToClipboard = (text) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "absolute";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();

    try {
      const successful = document.execCommand("copy");
      console.log(
        successful ? "링크가 클립보드에 복사되었습니다!" + text : "복사 실패",
      );
    } catch (err) {
      console.error("복사 실패:", err);
      alert("복사 실패");
    }

    document.body.removeChild(textarea);
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
