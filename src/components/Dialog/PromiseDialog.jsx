import st from "./PromiseDialog.module.css";
import Button from "../Button";

const PromiseDialog = () => {
  return (
    <div className={st.black_background}>
      <div className={st.popup_space}>
        <div className={st.text_space}>약속을 확정하시겠습니까?</div>

        <div className={st.select_space}>
          <div className={st.mid_size_text_space}>
            <div className={st.mid_size_text}>날짜</div>
            <div className={st.mid_size_text}>시간</div>
          </div>
          <div className={st.popup_v_line}></div>
          <div className={`${st.mid_size_text_space} ${st.select_drop_box}`}>
            <div className={st.test_text}>2025.06.27</div>
            <div className={st.test_text}>AM 9:00</div>
          </div>
        </div>

        <div className={st.popup_button_space}>
          <Button text={"확정"} type={"midBlue"} />
          <Button text={"취소"} type={"midStroke"} />
        </div>
      </div>
    </div>
  );
};

export default PromiseDialog;
