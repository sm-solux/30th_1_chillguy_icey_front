import st from "./PromiseCheck.module.css";
import Promise from "./Promise.jsx";
// import Promise_date from "./promise/Promise.jsx";
// import Promise_time from "./promise/Promise.jsx";
import Button from "../Button.jsx";

const PromiseCheck = ({ userType, onConfirm }) => {
  if (userType === "Leader") {
    return (
      <div className={st.Promise_check_content}>
        {/* <Promise /> */}
        <div className={st.button_space}>
          <div className={st.button_section}>
            <Button text={"날짜"} type={"no"} />
            <Button text={"시간"} />
          </div>
          <div className={st.button_section}>
            <Button text={"약속 확정"} type={"promise"} onClick={onConfirm} />
            <Button text={"완료"} />
          </div>
        </div>
        <div className={st.promise_check_box}>
          {/* <Promise_date /> */}
          {/* <Promise_time /> */}
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
          {/* <Promise_date /> */}
          {/* <Promise_time /> */}
        </div>
      </div>
    );
  }
};

export default PromiseCheck;
