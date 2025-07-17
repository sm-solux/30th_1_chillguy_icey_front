import st from "./SmallTalkName.module.css";
import Snow from "../../assets/Snow.svg";
import Delete from "../Delete";
import ListLine from "../../assets/ListLine.svg";

const SmallTalkName = ({
  image = Snow,
  text = "스몰톡 제목",
  date = "2025. 05.05",
  onSelect,
  onDelete,
}) => {
  return (
    <div className={st.div}>
      <div className={st.title_section}>
        <img className={st.vector} src={image} alt="아이콘" />
        <div className={st.date}>{date}</div>

        {/* ✅ 제목 누르면 선택 */}
        <div className={st.title} onClick={onSelect}>
          {text}
        </div>

        {/* ✅ 삭제 버튼 눌렀을 때 부모 이벤트 전달 막고 삭제 */}
        <Delete onClick={onDelete} />
      </div>
      <img className={st.line} src={ListLine} />
    </div>
  );
};

export default SmallTalkName;
