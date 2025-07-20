import st from "./PromiseCheck.module.css";
import Promise from "./Promise.jsx";
import PromiseDate from "./promise/PromiseDate.jsx";
import PromiseTime from "./promise/PromiseTime.jsx";
import Button from "../Button.jsx";
import { useState } from "react";

const PromiseCheck = ({ userType, onConfirm }) => {
  const [viewCheckbox, setViewCheckbox] = useState("date");

  const handleViewChange = (newview) => {
    setViewCheckbox(newview);
  };

  if (userType === "Leader") {
    return (
      <div className={st.Promise_check_content}>
        {/* <Promise /> */}
        <div className={st.button_space}>
          <div className={st.button_section}>
            <Button
              text={"날짜"}
              type={""}
              onClick={() => handleViewChange("date")}
            />
            <Button text={"시간"} onClick={() => handleViewChange("time")} />
          </div>
          <div className={st.button_section}>
            <Button text={"약속 확정"} type={"promise"} onClick={onConfirm} />
            <Button text={"완료"} />
          </div>
        </div>
        <div className={st.promise_check_box}>
          {viewCheckbox === "date" ? (
            <PromiseDate teamCreateDate="2025-07-15" />
          ) : (
            <PromiseTime />
          )}
          {/* <PromiseDate teamCreateDate="2025-07-15" />
          <PromiseTime /> */}
        </div>
      </div>
    );
  } else {
    return (
      <div className={st.Promise_check_content}>
        {/* <Promise /> */}
        <div className={st.button_space}>
          <div className={st.button_section}>
            {/* <Button text={"날짜"} type={"no"} /> */}
            <Button text={"시간"} />
          </div>
          <div className={st.button_section}>
            {/* <Button text={"약속 확정"} type={"promise-no"} /> */}
            <Button text={"완료"} />
          </div>
        </div>
        <div className={st.promise_check_box}>
          {/* <PromiseDate /> */}
          <PromiseTime />
        </div>
      </div>
    );
  }
};

export default PromiseCheck;
