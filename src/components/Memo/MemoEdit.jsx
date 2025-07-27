import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

import st from "./MemoEdit.module.css";
import memo_save from "../../assets/memo_save.svg";

const MemoEdit = ({ teamId, editingMemo, onSave, onClose }) => {
  // 토큰 불러오기
  const { token } = useAuth();
  const backLink = "https://icey-backend-1027532113913.asia-northeast3.run.app";

  // state: 메모 내용 저장
  const [text, setText] = useState("");

  // 기존 메모 내용 불러오기
  useEffect(() => {
    if (!teamId || !editingMemo?.memoId) return;

    const fetchMemoContent = async () => {
      if (!editingMemo) {
        setText("");
        return;
      }
      try {
        const { data } = await axios.get(
          `${backLink}/api/teams/${teamId}/memos/${editingMemo.memoId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setText(data.content);
      } catch (err) {
        console.error("메모 내용 불러오기 실패", err);
      }
    };

    fetchMemoContent();
  }, [editingMemo, teamId]);

  // 글자 수/줄 수 제한
  const handleChange = (e) => {
    const input = e.target.value;

    // 글자 수 제한
    if (input.length > 130) return;

    // 줄 수 제한 (10줄 이상이면 return)
    const lines = input.split("\n");
    if (lines.length > 9) return;

    setText(input);
  };

  // 저장 버튼 클릭
  const handleSave = async () => {
    if (!text.trim()) {
      return;
    }

    try {
      const url = editingMemo
        ? `${backLink}/api/teams/${teamId}/memos/${editingMemo.memoId}`
        : `${backLink}/api/teams/${teamId}/memos`;

      const method = editingMemo ? "PUT" : "POST";

      const { data } = await axios({
        method,
        url,
        data: { content: text },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
