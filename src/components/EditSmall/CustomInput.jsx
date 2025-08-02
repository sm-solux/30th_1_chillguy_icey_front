import { useState, useEffect, useRef } from "react";
import Button from "../Button";
import st from "./CustomInput.module.css";

function CustomInput({
  id,
  text,
  initialAnswer = "",
  onDelete,
  onAnswerChange,
}) {
  const [showAnswerInput, setShowAnswerInput] = useState(false);
  const [answer, setAnswer] = useState(initialAnswer);
  const [isEditing, setIsEditing] = useState(false);
  const containerRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [answer, isEditing]);
  useEffect(() => {
    setAnswer(initialAnswer);
  }, [initialAnswer]);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        showAnswerInput &&
        containerRef.current &&
        !containerRef.current.contains(e.target)
      ) {
        if (isEditing && onAnswerChange) {
          onAnswerChange(id, answer);
        }
        setIsEditing(false);
        setShowAnswerInput(false);
      }
    };
    document.addEventListener("click", handleClickOutside); // click 이벤트로 변경
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showAnswerInput, isEditing, id, answer, onAnswerChange]);

  const handleCardClick = () => {
    setShowAnswerInput((prev) => {
      if (prev && isEditing && onAnswerChange) {
        onAnswerChange(id, answer);
      }
      return !prev;
    });
    setIsEditing(false);
  };

  return (
    <div
      className={st.questionCard}
      onClick={handleCardClick}
      ref={containerRef}
    >
      <div className={st.questionCardHeader}>
        <div className={st.questionText}>{text}</div>
        <div className={st.questionActions}>
          <Button
            text="삭제"
            type="bred"
            onClick={(e) => {
              e.stopPropagation();
              if (onDelete) onDelete(id);
            }}
          />
        </div>
      </div>

      {showAnswerInput && (
        <div className={st.questionDetailSection}>
          <div className={st.questionDetailCard}>
            <div
              className={st.detailContentText}
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
            >
              {isEditing ? (
                <textarea
                  ref={textareaRef}
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  onBlur={() => {
                    setIsEditing(false);
                    if (onAnswerChange) onAnswerChange(id, answer);
                  }}
                  onClick={(e) => e.stopPropagation()}
                  spellCheck={false}
                />
              ) : (
                answer || "답변 없음 (클릭해서 입력)"
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomInput;
