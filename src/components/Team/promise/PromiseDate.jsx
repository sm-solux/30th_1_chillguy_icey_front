import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import st from "./PromiseDate.module.css";

const PromiseDate = ({ teamCreateDate, onDateSelect, isEditing }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState(new Set());
  const [isDragging, setIsDragging] = useState(false);
  const [dragMode, setDragMode] = useState(null);

  const resetTime = (d) =>
    d ? new Date(d.getFullYear(), d.getMonth(), d.getDate()) : null;

  const teamCreated = resetTime(
    teamCreateDate ? new Date(teamCreateDate) : null,
  );
  const minDate = teamCreated;
  const maxDate = teamCreated
    ? new Date(
        teamCreated.getFullYear(),
        teamCreated.getMonth() + 1,
        teamCreated.getDate(),
      )
    : null;

  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
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

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const days = [];

    const prevMonthLastDay = new Date(year, month, 0);
    const prevMonthDays = prevMonthLastDay.getDate();

    // 이전 달 날짜 채우기
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const day = new Date(year, month, -i);
      days.push({ day: day.getDate(), isCurrentMonth: false, date: day });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        day,
        isCurrentMonth: true,
        date: new Date(year, month, day),
      });
    }

    // 다음 달 날짜 채우기
    const maxCells = 6 * 7;
    const remainingCells = maxCells - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      const day = new Date(year, month + 1, i);
      days.push({ day: day.getDate(), isCurrentMonth: false, date: day });
    }

    return days;
  };

  const isWithinAllowedRange = (targetDate) => {
    if (!teamCreated) return true;
    const allowedStart = new Date(
      teamCreated.getFullYear(),
      teamCreated.getMonth(),
      1,
    );
    const allowedEnd = new Date(
      teamCreated.getFullYear(),
      teamCreated.getMonth() + 2,
      1,
    );
    return targetDate >= allowedStart && targetDate < allowedEnd;
  };

  const canNavigate = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + offset);
    return isWithinAllowedRange(newDate);
  };

  const formatDateKey = (date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

  const handleDateToggle = (date) => {
    const dateKey = formatDateKey(date);
    const newSet = new Set(selectedDates);
    selectedDates.has(dateKey) ? newSet.delete(dateKey) : newSet.add(dateKey);
    setSelectedDates(newSet);
  };

  const handleMouseDown = (dayObj) => {
    const date = resetTime(dayObj.date);
    if (!isEditing || !dayObj.isCurrentMonth || !isWithinAllowedRange(date))
      return;
    const isOutsideRange = date < minDate || date > maxDate;
    if (isOutsideRange) return;

    setIsDragging(true);
    const dateKey = formatDateKey(date);
    const isSelected = selectedDates.has(dateKey);
    // <<<<<<< feature/13-promise-new-real
    const newSet = new Set(selectedDates);
    isSelected ? newSet.delete(dateKey) : newSet.add(dateKey);
    setDragMode(isSelected ? "remove" : "add");
    setSelectedDates(newSet);
    handleDateToggle(date);
  };

  //   const handleMouseEnter = (dayObj) => {
  //     if (!isEditing || !isDragging || !dayObj.isCurrentMonth) return;
  //     const dateKey = formatDateKey(dayObj.date);
  // =======
  //     setDragMode(isSelected ? "remove" : "add");
  //     handleDateToggle(date);
  //   };

  const handleMouseEnter = (dayObj) => {
    const date = resetTime(dayObj.date);
    if (
      !isEditing ||
      !isDragging ||
      !dayObj.isCurrentMonth ||
      !isWithinAllowedRange(date)
    )
      return;
    const isOutsideRange = date < minDate || date > maxDate;
    if (isOutsideRange) return;
    const dateKey = formatDateKey(date);

    const isSelected = selectedDates.has(dateKey);
    if (
      (dragMode === "add" && !isSelected) ||
      (dragMode === "remove" && isSelected)
    ) {
      handleDateToggle(date);
    }
  };

  useEffect(() => {
    const stopDrag = () => {
      setIsDragging(false);
      setDragMode(null);
    };
    document.addEventListener("mouseup", stopDrag);
    return () => document.removeEventListener("mouseup", stopDrag);
  }, []);

  const getSelectedDatesData = useCallback(() => {
    return Array.from(selectedDates)
      .map((key) => {
        const [y, m, d] = key.split("-");
        return { year: +y, month: +m, day: +d, dateKey: key };
      })
      .sort((a, b) => a.dateKey.localeCompare(b.dateKey));
  }, [selectedDates]);

  useEffect(() => {
    onDateSelect?.(getSelectedDatesData());
  }, [getSelectedDatesData, onDateSelect]);

  const days = getDaysInMonth(currentDate);

  return (
    <div className={st.container}>
      <div className={st.wrapper}>
        <div className={st.card}>
          <div className={st.header}>
            <button
              className={st.arrow}
              onClick={() =>
                setCurrentDate(
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() - 1,
                    1,
                  ),
                )
              }
              disabled={!canNavigate(-1)}
            >
              <ChevronLeft size={18} />
            </button>
            <div className={st.month}>
              {monthNames[currentDate.getMonth()]}. {currentDate.getFullYear()}
            </div>
            <button
              className={st.arrow}
              onClick={() =>
                setCurrentDate(
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() + 1,
                    1,
                  ),
                )
              }
              disabled={!canNavigate(1)}
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className={st.grid}>
            {weekDays.map((day, i) => (
              <div key={i} className={st.weekday}>
                {day}
              </div>
            ))}

            {days.map((dayObj, i) => {
              const date = resetTime(dayObj.date);
              const dateKey = formatDateKey(date);
              const isSelected = selectedDates.has(dateKey);
              const isOutsideSelectableRange = date < minDate || date > maxDate;
              const isDisabled =
                !dayObj.isCurrentMonth ||
                !isWithinAllowedRange(date) ||
                isOutsideSelectableRange;

              return (
                <div
                  key={i}
                  className={`${st.day} ${!dayObj.isCurrentMonth ? st.inactive : ""} ${isSelected ? st.selected : ""} ${isDisabled ? st.inactive : ""}`}
                  onMouseDown={() => handleMouseDown(dayObj)}
                  onMouseEnter={() => handleMouseEnter(dayObj)}
                >
                  {dayObj.day}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromiseDate;
