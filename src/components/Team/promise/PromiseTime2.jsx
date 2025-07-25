import React, {
  useState,
  useRef,
  useMemo,
  useImperativeHandle,
  forwardRef,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import st from "./PromiseTime.module.css";

// 옆에 표시하는 시간 표현식
const TIME_SLOTS = Array.from({ length: 16 }, (_, i) => {
  const hour = i + 9;
  const suffix = hour >= 12 ? (hour === 24 ? "AM" : "PM") : "AM";
  const displayHour = hour > 12 ? hour - 12 : hour;
  return `${suffix} ${displayHour.toString().padStart(2, "0")}:00`;
});

const PromiseTime2 = forwardRef(
  (
    { summary, myVotes, setMyVotes, savedVotes, setSavedVotes, isEditing },
    ref,
  ) => {
    const allDates = summary.map((d) => d.date);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;
    const totalPages = Math.ceil(allDates.length / itemsPerPage);
    const currentDates = allDates.slice(
      currentPage * itemsPerPage,
      (currentPage + 1) * itemsPerPage,
    );

    const [dragMode, setDragMode] = useState(null);
    const [hoveredCell, setHoveredCell] = useState(null);
    const gridRef = useRef(null);

    const toHour = (index) => index + 9;

    useImperativeHandle(ref, () => ({
      hasSaved: () => JSON.stringify(myVotes) !== JSON.stringify(savedVotes),
      save: () => setSavedVotes(myVotes),
    }));

    const getSummaryCount = (date, hour) => {
      const target = summary.find((d) => d.date === date);
      if (!target) return 0;
      const hourObj = target.hourVotes.find((h) => h.hour === hour);
      return hourObj?.count || 0;
    };

    // 추가 함수
    const getEffectiveCount = (date, hour) => {
      const raw = getSummaryCount(date, hour);
      const isMyVote = getMySelected(date, hour);
      return isEditing && isMyVote ? raw - 1 : raw;
    };

    const getLiveCount = (date, hour) => {
      const summaryCount = getSummaryCount(date, hour);
      const wasMyVote = savedVotes
        .find((d) => d.date === date)
        ?.hours.includes(hour);
      const isMyVote = myVotes
        .find((d) => d.date === date)
        ?.hours.includes(hour);

      // 내가 투표했던 걸 뺐다가, 지금 선택 중인 건 다시 더함
      return summaryCount - (wasMyVote ? 1 : 0) + (isMyVote ? 1 : 0);
    };

    const testCount = () => {
      console.log(myVotes);
    };

    const handleMouseDown = (date, timeIndex) => {
      if (!isEditing) return;
      const hour = toHour(timeIndex);
      const current = myVotes.find((d) => d.date === date);
      const already = current?.hours.includes(hour);

      setDragMode(already ? "remove" : "add");
      setMyVotes((prev) => {
        const rest = prev.filter((d) => d.date !== date);
        const hours = current?.hours || [];
        const updated = already
          ? hours.filter((h) => h !== hour)
          : [...hours, hour];

        return updated.length > 0 ? [...rest, { date, hours: updated }] : rest;
      });
    };

    const handleMouseEnter = (date, timeIndex) => {
      setHoveredCell({ date, timeIndex });
      if (!isEditing || dragMode === null) return;
      const hour = toHour(timeIndex);
      const current = myVotes.find((d) => d.date === date);
      const already = current?.hours.includes(hour);

      if (dragMode === "add" && !already) {
        setMyVotes((prev) => {
          const rest = prev.filter((d) => d.date !== date);
          const hours = current?.hours || [];
          return [...rest, { date, hours: [...hours, hour] }];
        });
      } else if (dragMode === "remove" && already) {
        setMyVotes((prev) => {
          const rest = prev.filter((d) => d.date !== date);
          const hours = current?.hours.filter((h) => h !== hour);
          return hours.length > 0 ? [...rest, { date, hours }] : rest;
        });
      }
    };

    const getMySelected = (date, hour) => {
      const d = myVotes.find((v) => v.date === date);
      return d?.hours.includes(hour);
    };

    const getConnectedBlocks = (date) => {
      const d = myVotes.find((v) => v.date === date);
      if (!d) return [];
      const indexes = d.hours.map((h) => h - 9).sort((a, b) => a - b);
      const blocks = [];
      let block = [indexes[0]];
      for (let i = 1; i < indexes.length; i++) {
        if (indexes[i] === indexes[i - 1] + 1) block.push(indexes[i]);
        else {
          blocks.push(block);
          block = [indexes[i]];
        }
      }
      blocks.push(block);
      return blocks;
    };

    const getCellPosition = (date, timeIndex) => {
      for (const block of getConnectedBlocks(date)) {
        const idx = block.indexOf(timeIndex);
        if (idx !== -1) {
          return {
            isInBlock: true,
            isFirst: idx === 0,
            isLast: idx === block.length - 1,
            blockSize: block.length,
          };
        }
      }
      return { isInBlock: false };
    };

    return (
      <div className={st.container}>
        <div className={st.wrapper}>
          {/* <button onClick={testCount}>현재까지 저장된 데이터</button> */}
          <div className={st.dateNav}>
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 0}
              className={`${st.chevron} ${currentPage === 0 ? st.disabled : ""}`}
            >
              <ChevronLeft size={18} />
            </button>
            <div className={st.dateList}>
              {Array.from({ length: itemsPerPage }).map((_, i) => {
                const d = currentDates[i];
                return (
                  <div
                    key={i}
                    className={st.dateItem}
                    style={{ visibility: d ? "visible" : "hidden" }}
                  >
                    {d ? `${d.split("-")[1]}.${d.split("-")[2]}` : ""}
                  </div>
                );
              })}
            </div>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
              className={`${st.chevron} ${currentPage === totalPages - 1 ? st.disabled : ""}`}
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div
            ref={gridRef}
            className={st.grid}
            style={{ gridTemplateColumns: `auto repeat(${itemsPerPage}, 1fr)` }}
            onMouseUp={() => setDragMode(null)}
            onMouseLeave={() => {
              setDragMode(null);
              setHoveredCell(null);
            }}
          >
            <div className={st.timeLabels}>
              {TIME_SLOTS.map((time, i) => (
                <div key={i} className={st.time}>
                  {time}
                </div>
              ))}
            </div>

            {Array.from({ length: itemsPerPage }).map((_, colIdx) => {
              const date = currentDates[colIdx];
              return (
                <div key={colIdx} className={st.dateColumn}>
                  {TIME_SLOTS.map((_, j) => {
                    if (!date)
                      return (
                        <div
                          key={j}
                          className={st.cell}
                          style={{ visibility: "hidden" }}
                        />
                      );
                    const hour = toHour(j);
                    const mySelected = getMySelected(date, hour);
                    const userCount = getSummaryCount(date, hour);
                    // // 셀 내부에서 바뀌는 부분
                    // const totalCount = getEffectiveCount(date, hour);
                    // const opacity = Math.min(totalCount * 0.2, 0.8);
                    const totalCount = isEditing
                      ? getLiveCount(date, hour)
                      : getSummaryCount(date, hour);
                    const opacity = Math.min(totalCount * 0.2, 0.8);
                    const pos = getCellPosition(date, j);
                    const isHovered =
                      hoveredCell?.date === date &&
                      hoveredCell?.timeIndex === j;

                    let borderStyle = st.defaultCell;
                    if (mySelected && isEditing && pos.isInBlock) {
                      if (pos.blockSize === 1) borderStyle = st.roundedFull;
                      else if (pos.isFirst) borderStyle = st.roundedTop;
                      else if (pos.isLast) borderStyle = st.roundedBottom;
                      else borderStyle = st.blockMiddle;
                    } else if (mySelected && isEditing) {
                      borderStyle = st.roundedFull;
                    }

                    return (
                      <div
                        key={j}
                        className={`${st.cell} ${borderStyle}`}
                        style={{
                          backgroundColor: totalCount
                            ? `rgba(89, 126, 219, ${opacity})`
                            : "white",
                          cursor: isEditing ? "pointer" : "default",
                        }}
                        onMouseDown={() => handleMouseDown(date, j)}
                        onMouseEnter={() => handleMouseEnter(date, j)}
                        onMouseLeave={() => setHoveredCell(null)}
                      >
                        {isHovered && (
                          <div className={st.tooltip}>
                            <div className={st.tooltipTitle}>
                              {`${date.split("-")[1]}.${date.split("-")[1]}`}{" "}
                              {TIME_SLOTS[j]}
                            </div>
                            <div className={st.tooltipDesc}>
                              {totalCount}명 선택
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  },
);

export default PromiseTime2;
