import "./Promise.css";

const Promise = () => {
  return (
    <div className="Promise-content">
      <div className="promise-calendar-box">
        {/* 여기에 calendar 컴포넌트 (예: react-calendar) 삽입해도 좋아요 */}
      </div>

      <div className="promise-text-box">
        <div className="promise-text">
          약속 잡기 전입니다. 우리 팀 약속 시간을 정해보세요.
        </div>
        {/* <div className="promise-date">06.27</div>
        <div className="promise-dday">D-15</div> */}
      </div>
    </div>
  );
};

export default Promise;
