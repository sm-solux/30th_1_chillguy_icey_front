import "./PromiseCheck.css";
import Promise from "./Promise.jsx";
// import Promise_date from "./promise/Promise.jsx";
// import Promise_time from "./promise/Promise.jsx";
import Button from "../Button.jsx";

const PromiseCheck = () => {
  return (
    <div>
      <Promise />
      <div className="button-space">
        <div className="button-section">
          <Button text={"날짜"} type={"no"} />
          <Button text={"시간"} />
        </div>
        <div className="button-section">
          <Button text={"약속 확정"} type={"promise-no"} />
          <Button text={"완료"} />
        </div>
      </div>
      <div className="promise-check-box">
        {/* <Promise_date /> */}
        {/* <Promise_time /> */}
      </div>
    </div>
  );
};

export default PromiseCheck;
