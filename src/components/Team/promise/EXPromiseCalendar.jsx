import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import st from "./EXPromiseCalendar.module.css";

const EXPromiseCalendar = ({ teamCreateDate, goalDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    if (teamCreateDate) {
      setCurrentDate(new Date(teamCreateDate));
    }
  }, [teamCreateDate]);

  const today = new Date();
  const goal = goalDate ? new Date(goalDate) : null;
  const teamCreated = teamCreateDate ? new Date(teamCreateDate) : null;

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const isSameDate = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const isWithinAllowedRange = (targetDate) => {
    if (!teamCreated) return true;

    const createdYear = teamCreated.getFullYear();
    const createdMonth = teamCreated.getMonth();

    const targetYear = targetDate.getFullYear();
    const targetMonth = targetDate.getMonth();

    // 생성월 혹은 다음 월까지 허용
    const allowedStart = new Date(createdYear, createdMonth, 1);
    const allowedEnd = new Date(createdYear, createdMonth + 1, 1); // 다음 달 1일
    allowedEnd.setMonth(allowedEnd.getMonth() + 1); // 그 다음 달은 불가

    return targetDate >= allowedStart && targetDate < allowedEnd;
  };

  const canNavigatePrev = () => {
    const prevDate = new Date(currentDate);
    prevDate.setMonth(currentDate.getMonth() - 1);
    return isWithinAllowedRange(prevDate);
  };

  const canNavigateNext = () => {
    const nextDate = new Date(currentDate);
    nextDate.setMonth(currentDate.getMonth() + 1);
    return isWithinAllowedRange(nextDate);
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // 이전 달 날짜 채우기 (수정됨)
    const prevMonthDate = new Date(year, month, 0);
    const prevMonthDays = prevMonthDate.getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthDays - i),
        isCurrentMonth: false,
      });
    }

    // 현재 달 날짜 채우기
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        date: new Date(year, month, day),
        isCurrentMonth: true,
      });
    }

    // 다음 달 날짜 채우기 (총 6주: 42칸)
    const totalCells = 42;
    const remainingCells = totalCells - days.length;
    for (let day = 1; day <= remainingCells; day++) {
      days.push({
        date: new Date(year, month + 1, day),
        isCurrentMonth: false,
      });
    }

    return days;
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    if (isWithinAllowedRange(newDate)) {
      setCurrentDate(newDate);
    }
  };

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const weekdays = ["S", "M", "T", "W", "T", "F", "S"];
  const days = getDaysInMonth(currentDate);

  return (
    <div className={st.calendarContainer}>
      <div className={st.calendar}>
        {/* 네비게이션 */}
        <div className={st.navigation}>
          <button
            onClick={() => navigateMonth(-1)}
            className={st.navButton}
            disabled={!canNavigatePrev()}
          >
            <ChevronLeft size={14} />
          </button>
          <div className={st.monthYear}>
            {monthNames[currentDate.getMonth()]}. {currentDate.getFullYear()}
          </div>
          <button
            onClick={() => navigateMonth(1)}
            className={st.navButton}
            disabled={!canNavigateNext()}
          >
            <ChevronRight size={14} />
          </button>
        </div>

        {/* 요일 헤더 */}
        <div className={st.weekdays}>
          {weekdays.map((day, index) => (
            <div key={index} className={st.weekday}>
              {day}
            </div>
          ))}
        </div>

        {/* 날짜 셀 */}
        <div className={st.daysGrid}>
          {days.map((dayObj, index) => {
            const { date, isCurrentMonth } = dayObj;
            const isToday = isSameDate(date, today);
            const isGoal = goal && isSameDate(date, goal);
            const isCreate = teamCreated && isSameDate(date, teamCreated);

            return (
              <div
                key={index}
                className={`
                  ${st.dayCell}
                  ${isToday ? st.today : ""}
                  ${isGoal ? st.goal : ""}
                  ${isCreate ? st.create : ""}
                  ${!isCurrentMonth ? st.neighboringMonth : ""}
                `}
              >
                {date.getDate()}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EXPromiseCalendar;
