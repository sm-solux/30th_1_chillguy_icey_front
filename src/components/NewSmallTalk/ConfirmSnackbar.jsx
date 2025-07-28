import st from "./ConfirmSnackbar.module.css";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

const ConfirmSnackbar = ({ onClick, onClose }) => {
  const navigate = useNavigate();
  const onClickSmall = (e) => {
    navigate("/smalltalk"); // 로그인 페이지로 이동
  };

  return (
    <div className={st.overlay} onClick={onClose}>
      <div className={st.popup}>
        <div className={st.text}>작성한 내용으로 스몰톡을 생성할까요?</div>
        <div className={st.button_frame}>
          <Button
            text={"확인"}
            type={"midBlue"}
            onClick={() => {
              onClick(); // post 요청
              onClose(); // 닫기
              navigate("/smalltalk");
            }}
          />
          <Button text={"취소"} type={"midStroke"} onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default ConfirmSnackbar;
