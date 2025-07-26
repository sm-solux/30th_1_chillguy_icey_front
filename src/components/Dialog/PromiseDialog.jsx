import { useState, useEffect, useRef } from "react";
import st from "./PromiseDialog.module.css";
import Button from "../Button";
import Dropdown from "../Dropdown";

const PromiseDialog = ({
  bestCandidates,
  onConfirm,
  onCancel,
  setConfirmVoteData,
}) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [convertData, setConvertData] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null); // 'date' | 'time' | null

  const convertConfirmData = () => {
    console.log(date);
    console.log(time);

    let [o, h] = time.split(" "); // AM/PM, 시:분
    const hour = Number(h.split(":")[0]);

    let offset;
    if (o === "AM") {
      offset = hour === 12 ? 24 : hour; // AM 12:00은 0시
    } else {
      offset = hour === 12 ? 12 : hour + 12; // PM 12:00은 12시 유지
    }

    const convertTime = offset;
    console.log(convertTime);

    setConfirmVoteData({ date: `${date}`, hour: convertTime }); // 상태도 갱신
    onConfirm({ date: `${date}`, hour: convertTime }); // 바로 최신 값 전달

    setDate("");
    setTime("");
  };

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
          <div className={st.mid_size_2_space}>
            {/* <div className={st.test_text}>2025.06.27</div>
            <div className={st.test_text}>AM 9:00</div> */}
            <Dropdown
              type="long"
              name="date"
              openName={openDropdown}
              setOpenName={setOpenDropdown}
              selected={date}
              onChange={(value) => {
                setDate(value);
                setTime("");
              }}
            >
              {bestCandidates
                .filter(
                  (item) =>
                    Array.isArray(item.availableHours) &&
                    item.availableHours.length > 0,
                )
                .map((item) => (
                  <div key={item.date}>{item.date}</div>
                ))}
            </Dropdown>

            <Dropdown
              type="long"
              name="time"
              openName={openDropdown}
              setOpenName={setOpenDropdown}
              selected={time}
              dateSelected={!!date} // ✅ date 선택 여부 전달
              onChange={(value) => setTime(value)}
            >
              {(
                bestCandidates.find((d) => d.date === date)?.availableHours ||
                []
              ).map((hour) => (
                <div key={hour}>{hour}</div>
              ))}
            </Dropdown>
          </div>
        </div>
        <div className={st.popup_info_text}>
          약속 확정 후에는 더이상 수정 및 재생성이 불가합니다.
        </div>
        <div className={st.popup_button_space}>
          <Button
            text={"확정"}
            type={!date || !time ? "midBlue_no" : "midBlue"}
            onClick={() => {
              convertConfirmData();
              // onConfirm();
            }}
            disabled={!date || !time}
          />
          <Button text={"취소"} type={"midStroke"} onClick={onCancel} />
        </div>
      </div>
    </div>
  );
};

export default PromiseDialog;
