import st from "./SmallTalk_minilist.module.css";

const Minilist = () => {
  //이벤트 객체
  const onClickButton = (e) => {
    console.log(e);
  };
  return (
    <div class={st.div}>
      <div class={st.content}>
        <div class={st.text}>
          <div class={st.textarea}>
            요즘 웃긴 밈이나 짤 본 거 있어? 나 요즘 이런 거에 꽂혔어.
          </div>
        </div>
        <div class={st.text}>
          <div class={st.textarea}>
            요즘 재밌게 본 콘텐츠 있어? 영화나 드라마, 유튜브 같은 거!
          </div>
        </div>
        <div class={st.text}>
          <div class={st.textarea}>
            이번 학기 시간표 짤 때 힘들지 않았어? 공강 있어?
          </div>
        </div>
        <div class={st.text}>
          <div class={st.textarea}>
            이번 학기 듣는 다른 수업 중에 뭐가 제일 괜찮아?
          </div>
        </div>
        <div class={st.text}>
          <div class={st.textarea}>입력칸입니다</div>
        </div>
        <div class={st.text}>
          <div class={st.textarea}>입력칸입니다</div>
        </div>
        <div class={st.text}>
          <div class={st.textarea}>
            학교 근처에 맛집 같은 데 알아? 점심 먹을 곳 찾고 있었거든.
          </div>
        </div>
        <div class={st.text}>
          <div class={st.textarea}>
            학교 근처에 맛집 같은 데 알아? 점심 먹을 곳 찾고 있었거든.
          </div>
        </div>
      </div>
      <button class={st.button}>
        <div class={st.viewall}>전체 보기</div>
      </button>
    </div>
  );
};

export default Minilist;
