import st from "./PromiseCheck.module.css";
import { useState, useEffect } from "react";
import PromiseDate from "./promise/PromiseDate.jsx";
import PromiseTime2 from "./promise/PromiseTime2.jsx";
import Button from "../Button.jsx";
import { FaPen } from "react-icons/fa6";

const PromiseCheck2 = ({
  team,
  allDates,
  othersVotes,
  mySelections,
  setMySelections,
  savedSelections,
  setSavedSelections,
}) => {
  const isLeader = team.role === "LEADER";
  const [view, setView] = useState(isLeader ? "date" : "time");

  const [isTimeEditing, setIsTimeEditing] = useState(false);
  const [isDateSaved, setIsDateSaved] = useState(false);
  const [mySelectionsLocal, setMySelectionsLocal] = useState(mySelections);

  const enableEdit = () => setIsTimeEditing(true);
  // 더미 데이터를 위한 변수
  const [teamDate, isTeamDate] = useState(team.hasSchedule);

  const saveTime = () => {
    // isTeamDate(true);
    setIsTimeEditing(false);
    setMySelections(mySelectionsLocal);
    setSavedSelections(mySelectionsLocal);
  };

  useEffect(() => {
    // ✅ team이 바뀔 때마다 초기화
    setView(
      team.role === "LEADER" ? (team.hasSchedule ? "time" : "date") : "time",
    );
    isTeamDate(team.hasSchedule);
    setIsDateSaved(team.hasSchedule); // 날짜 저장되었는지 여부도 초기화
  }, [team]);

  return (
    <div className={st.Promise_check_content}>
      <div className={st.button_space}>
        <div className={st.button_section}>
          {isLeader ? (
            <>
              <Button
                text="날짜"
                type={teamDate ? "no" : view === "date" ? "stroke" : ""}
                disabled={teamDate}
                // type={view === "date" ? "stroke" : ""}
                onClick={() => setView("date")}
              />
              <Button
                text="시간"
                type={teamDate ? (view === "time" ? "stroke" : "") : "no"}
                disabled={!teamDate}
                onClick={() => setView("time")}
              />
            </>
          ) : (
            <Button text="시간" type="stroke" onClick={() => setView("time")} />
          )}
        </div>

        <div className={st.button_section}>
          {isLeader && (
            <Button text="약속 확정" type="promise_no" disabled={true} />
          )}
          <Button
            text="완료"
            // type={team.hasSchedule ? "" : "no"}
            type={view === "time" ? (isTimeEditing ? "" : "no") : ""}
            disabled={view === "time" ? !isTimeEditing : isDateSaved}
            onClick={() => {
              if (view === "time") {
                saveTime();
              } else if (view === "date") {
                setIsDateSaved(true); // 더 이상 수정 불가
                isTeamDate(true); // 여기서도 true로 바꿔줘야 버튼 비활성화됨
                setView("time");
              }
            }}
          />
        </div>
      </div>

      <div className={st.promise_check_box}>
        {view === "date" && isLeader && (
          <PromiseDate
            isEditing={!isDateSaved}
            teamCreateDate={team.currentDate}
            onDateSelect={(selectedDates) => {
              // ✅ 여기서 받은 selectedDates를 저장하거나 API로 전송할 수 있습니다.
              console.log("선택된 날짜들:", selectedDates);
              // 예: await fetch('/api/save-dates', { method: 'POST', body: JSON.stringify(selectedDates) });
            }}
          />
        )}
        {view === "time" && (
          <>
            <PromiseTime2
              allDates={allDates}
              othersVotes={othersVotes}
              mySelections={mySelectionsLocal}
              setMySelections={setMySelectionsLocal}
              savedSelections={savedSelections}
              setSavedSelections={setSavedSelections}
              isEditing={isTimeEditing}
            />
            <button
              className={`${st.edit_button} ${isTimeEditing ? st.edit_active : ""}`}
              onClick={enableEdit}
            >
              <FaPen className={st.edit_img} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PromiseCheck2;
