import { useState } from "react";
import st from "./SmallTalk.module.css";

import Header from "../Header";
import MakeSmallTalk from "./MakeSmallTalk";
import Delete from "../Delete";

import Minilist from "./SmallTalk_minilist";
import SmallTalkName from "./SmallTalkName";

//제목 및 날짜 길이 고정, gap 고정값
const SmallTalk = () => {
  const [list, setList] = useState([
    { id: 1, date: "2021. 02 .03", title: "스몰톡 제목" },
    { id: 2, title: "두번째 제목" },
    { id: 3, title: "세번째 제목" },
    { id: 4, title: "네번째 제목" },
    { id: 5, title: " 제목" },
  ]);
  const [selectedId, setSelectedId] = useState(null);

  const handleSelect = (id) => {
    setSelectedId(id);
  };

  const handleDelete = (id) => {
    // TODO: 백엔드 삭제 API 호출 후 성공 시 실행
    setList((prev) => prev.filter((item) => item.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  return (
    <div className={st.small_talk_menu}>
      <Header />
      <div className={st.body}>
        <div className={st.list_section}>
          <div className={st.list_title}>
            <div className={st.list_div}>
              <div className={st.list}>스몰톡 리스트</div>
            </div>

            {list.map((item) => (
              <SmallTalkName
                key={item.id}
                date={item.date}
                text={item.title}
                onSelect={() => handleSelect(item.id)}
                onDelete={() => handleDelete(item.id)}
              />
            ))}
          </div>
        </div>
        <div className={st.left_section}>
          <div className={st.upperSection}>
            <div className={st.target_purpose}>
              {selectedId && (
                <>
                  <div className={st.d}>
                    <div className={st.ds}>대상 :</div>
                    <div className={st.dg}>동기</div>
                  </div>
                  <div className={st.mj}>
                    <div className={st.ds}>목적 :</div>
                    <div className={st.o}>오랜만에 만나 안부 확인</div>
                  </div>
                </>
              )}
            </div>

            <MakeSmallTalk />
          </div>
          {!selectedId && (
            <div className={st.notselected}>
              <div className={st.select}>스몰톡 리스트를 선택해주세요</div>
              <div className={st.make}>
                리스트 항목이 없다면
                <br />
                스몰톡을 생성하세요!
              </div>
            </div>
          )}

          {selectedId && <Minilist />}
        </div>
      </div>
    </div>
  );
};

export default SmallTalk;
