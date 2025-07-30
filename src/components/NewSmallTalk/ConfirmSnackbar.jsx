import st from "./ConfirmSnackbar.module.css";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

const ConfirmSnackbar = ({ onClick, onClose, smallTalk }) => {
  const navigate = useNavigate();
  const onClickSmall = (e) => {
    navigate("/editsmall", { state: { refresh: true } });
  };

  return (
    <div className={st.overlay} onClick={onClose}>
      <div className={st.popup}>
        <div className={st.text}>작성한 내용으로 스몰톡을 생성할까요?</div>
        <div className={st.button_frame}>
          <Button
            text={"확인"}
            type={"midBlue"}
            onClick={async () => {
              try {
                const smallTalk = await onClick(); // ✅ 생성된 데이터 받기
                onClose();
                navigate("/editsmall/:id", {
                  state: { smallTalk }, // ✅ 전체 데이터 전달
                });
              } catch (err) {
                console.error("에러 발생:", err);
              }
            }}
          />

          <Button text={"취소"} type={"midStroke"} onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default ConfirmSnackbar;
