import st from "./Promise.module.css";
import PromiseCalendar from "./promise/PromiseCalendar.jsx";
import EXPromiseCalendar from "./promise/EXPromiseCalendar.jsx";

const Promise = ({ team, teamCreateDate, goalDate }) => {
  const goals = goalDate ? goalDate.split("-") : [];
  // goalDate가 존재하면 D-day 계산
  let dday = null;
  if (goalDate) {
    const today = new Date(); // 오늘 날짜
    const goal = new Date(goalDate); // 목표 날짜
    // 시간 차이를 밀리초 단위로 계산 후 일 수로 환산
    const diffTime = goal.getTime() - today.getTime();
    dday = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1; // 남은 일 수
    {
      dday === 0 ? (dday = "DAY") : dday;
    }
  }
  return (
    <div className={st.Promise_content}>
      <div className={st.promise_calendar_box}>
        <EXPromiseCalendar
          teamCreateDate={teamCreateDate}
          goalDate={goalDate}
        />
      </div>

      <div className={st.promise_text_box}>
        {goalDate === null ? (
          <div className={st.promise_text}>
            약속 잡기 전입니다. 우리 팀 약속 시간을 정해보세요.
          </div>
        ) : dday < 0 ? (
          <div className={st.promise_text}>이미 만났습니다.</div>
        ) : (
          <>
            <div className={st.promise_dday}>D - {dday}</div>
            <div className={st.promise_date}>
              {goals[1]}.{goals[2]}
            </div>
            <div className={st.promise_time}>AM 09:00</div>
          </>
        )}
      </div>
    </div>
  );
};

export default Promise;
