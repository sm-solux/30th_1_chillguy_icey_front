import { useEffect, useState } from "react";
import axios from "axios";

import st from "./Memo.module.css";

import memo_line from "../../assets/memo_line.svg";
import memo_like from "../../assets/memo_like.svg";
import memo_edit from "../../assets/memo_edit.svg";
import memo_delete from "../../assets/memo_delete.svg";

const Memo = ({ teamId, memoId, onDelete, onEdit }) => {
  // state: 메모 내용 불러오기
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchMemoContent = async () => {
      try {
        const response = await axios.get(
          `/api/teams/${teamId}/memos/${memoId}`,
        );
        setContent(response.data.content);
      } catch (error) {
        console.error("메모 내용 불러오기 실패", error);
        setContent("[불러오기 실패]");
      }
    };

    fetchMemoContent();
  }, [teamId, memoId]);

  return (
    <div className={st.Memo}>
      <div className={st.Memo_tools}>
        <img className={st.Memo_like_img} src={memo_like} alt="memo_like" />
        <div className={st.edit_delete}>
          <img
            className={st.Memo_edit_img}
            src={memo_edit}
            alt="memo_edit"
            onClick={() => onEdit({ memoId, teamId, content })}
          />
          <img
            className={st.Memo_delete_img}
            src={memo_delete}
            alt="memo_delete"
            onClick={() => onDelete(teamId, memoId)}
          />
        </div>
      </div>
      <img className={st.Memo_line_img} src={memo_line} alt="memo_line" />
      <div className={st.Memo_text}>{content}</div>
    </div>
  );
};

export default Memo;
