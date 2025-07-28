import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

import st from "./MemoEdit.module.css";
import memo_save from "../../assets/memo_save.svg";

import { fetchMemoDetail, saveMemo } from "../../util/BoardDataAPI";

const MemoEdit = ({ teamId, editingMemo, onSave, onClose }) => {
  const { token } = useAuth();

  const [text, setText] = useState("");

  useEffect(() => {
    if (!teamId || !editingMemo?.memoId) {
      setText("");
      return;
    }

    const loadMemo = async () => {
      try {
        const memoData = await fetchMemoDetail(
          token,
          teamId,
          editingMemo.memoId,
        );
        setText(memoData.content);
      } catch (err) {
        console.error("메모 내용 불러오기 실패", err);
      }
    };

    loadMemo();
  }, [editingMemo, teamId, token]);

  const handleChange = (e) => {
    const input = e.target.value;

    if (input.length > 130) return;

    const lines = input.split("\n");
    if (lines.length > 9) return;

    setText(input);
  };

  const handleSave = async () => {
    if (!text.trim()) return;

    try {
      const data = await saveMemo(
        token,
        teamId,
        text,
        editingMemo?.memoId || null,
      );
      onSave(data);
      setText("");
      onClose();
    } catch (err) {
      alert("저장 실패");
      console.error(err);
    }
  };

  return (
    <div className={st.Overlay} onClick={onClose}>
      <div className={st.MemoEdit} onClick={(e) => e.stopPropagation()}>
        <textarea
          className={st.Memo_area}
          placeholder="내용을 작성해 주세요.."
          value={text}
          onChange={handleChange}
        ></textarea>
        <div className={st.Memo_tools}>
          <div className={st.Counter}>{text.length} / 130</div>
          <button
            className={st.Memo_save_btn}
            aria-label="메모 저장"
            onClick={handleSave}
          >
            <img className={st.Memo_save_img} src={memo_save} alt="memo_save" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemoEdit;
