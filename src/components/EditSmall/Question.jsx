import { useState, useEffect, useRef } from "react";
import Button from "../Button";
import st from "./Question.module.css";

// Question 컴포넌트: API에서 생성된 질문을 표시하고, 상세 내용, 팁, 삭제 기능을 제공합니다.
function Question({
  id,
  text,
  initialDetailText,
  tipText,
  onDelete,
  onDetailTextChange,
}) {
  const [showTipsAndCcc, setShowTipsAndCcc] = useState(false);
  const [detailText, setDetailText] = useState(initialDetailText || "");
  const [isEditingDetail, setIsEditingDetail] = useState(false);
  const [showTipDetail, setShowTipDetail] = useState(false);

  const containerRef = useRef(null);
  const textareaRef = useRef(null);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  };

  useEffect(() => {
    if (isEditingDetail) {
      adjustTextareaHeight();
    }
  }, [detailText, isEditingDetail]);

  useEffect(() => {
    setDetailText(initialDetailText || "");
  }, [initialDetailText]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        showTipsAndCcc &&
        containerRef.current &&
        !containerRef.current.contains(e.target)
      ) {
        if (isEditingDetail && onDetailTextChange) {
          onDetailTextChange(id, detailText);
        }
        setIsEditingDetail(false);
        setShowTipsAndCcc(false);
        setShowTipDetail(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showTipsAndCcc, isEditingDetail, id, detailText, onDetailTextChange]);

  const handleMainClick = () => {
    setShowTipsAndCcc((prev) => {
      if (prev && isEditingDetail && onDetailTextChange) {
        onDetailTextChange(id, detailText);
      }
      return !prev;
    });
    setIsEditingDetail(false);
  };

  return (
    <div
      className={st.questionCard}
      onClick={handleMainClick}
      ref={containerRef}
      style={{ cursor: "pointer" }}
    >
      <div className={st.questionCardHeader}>
        <div className={st.questionText}>{text}</div>
        <div className={st.questionActions}>
          {/* ✅ 바꾸기 버튼 제거됨 */}
          <Button
            text={"삭제"}
            type={"bred"}
            onClick={(e) => {
              e.stopPropagation();
              if (onDelete) onDelete(id);
            }}
          />
        </div>
      </div>

      {showTipsAndCcc && (
        <div className={st.questionDetailSection}>
          <div className={st.questionDetailCard}>
            <div
              className={st.detailContentText}
              onClick={(e) => {
                e.stopPropagation();
                setIsEditingDetail(true);
              }}
              style={{ cursor: "text" }}
            >
              {isEditingDetail ? (
                <textarea
                  ref={textareaRef}
                  value={detailText}
                  onChange={(e) => setDetailText(e.target.value)}
                  onBlur={() => {
                    setIsEditingDetail(false);
                    if (onDetailTextChange) {
                      onDetailTextChange(id, detailText);
                    }
                  }}
                  onClick={(e) => e.stopPropagation()}
                  spellCheck={false}
                />
              ) : (
                detailText || "내용 없음 (클릭해서 작성)"
              )}
            </div>
          </div>

          <div
            className={st.tipButton}
            onClick={(e) => {
              e.stopPropagation();
              setShowTipDetail((prev) => !prev);
            }}
            style={{ cursor: "pointer" }}
          >
            <div className={st.tipButtonText}>
              {showTipDetail ? tipText || "기본 TIP 내용" : "TIP!"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Question;
