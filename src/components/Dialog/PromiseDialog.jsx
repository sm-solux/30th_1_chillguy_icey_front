import { useState, useEffect } from "react";
import st from "./PromiseDialog.module.css";
import Button from "../Button";
import Dropdown from "../Dropdown";

const PromiseDialog = ({ onConfirm, onCancel }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
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
            {/* <div className={st.test_text}>2025.06.27</div>
            <div className={st.test_text}>AM 9:00</div> */}
            <Dropdown
              type={"long"}
              selected={date}
              onChange={(value) => setDate(value)}
            >
              <div>2025.06.27</div>
              <div>2025.06.28</div>
              <div>2025.06.29</div>
              <div>2025.06.30</div>
              <div>2025.07.01</div>
              <div>2025.07.02</div>
            </Dropdown>
            <Dropdown
              type={"long"}
              selected={time}
              onChange={(value) => setTime(value)}
            >
              <div>AM 9:00</div>
              <div>PM 1:00</div>
              <div>PM 2:00</div>
              <div>PM 3:00</div>
              <div>PM 4:00</div>
              <div>PM 5:00</div>
            </Dropdown>
          </div>
        </div>

        <div className={st.popup_button_space}>
          <Button text={"확정"} type={"midBlue"} onClick={onConfirm} />
          <Button text={"취소"} type={"midStroke"} onClick={onCancel} />
        </div>
      </div>
    </div>
  );
};

export default PromiseDialog;
