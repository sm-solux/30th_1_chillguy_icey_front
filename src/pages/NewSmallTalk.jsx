import { useState } from "react";
import st from "./NewSmallTalk.module.css";

import Button from "../components/Button";

const NewSmallTalk = () => {
  const [targetText, setTargetText] = useState("");
  const [purposeText, setPurposeText] = useState("");
  return (
    <div class={st.body}>
      <div class={st.title}>
        <div class={st.title1}>스몰톡 주제 선택</div>
        <div class={st.title2}>스몰톡 대상, 모임 목적 등을 작성해주세요.</div>
      </div>
      <div class={st.target_purpose}>
        <div class={st.input_box}>
          <div class={st.target_purpose_text}>대상</div>
          <div class={st.ex_div}>
            <div class={st.ex}>ex.</div>
            <div class={st.ex_text}>
              개발동아리에서 처음 만난 팀원
              <br />
              오랜만에 만난 중학교 동창
              <br />
              어려운 직장 상사
            </div>
          </div>
          <div class={st.input}>
            <input
              className={st.input_tp}
              type="text"
              placeholder="직접 작성"
              // 필요하면 value/onChange 연결
            />
            <div class={st.line}></div>
          </div>
        </div>

        <div class={st.input_box}>
          <div class={st.target_purpose_text}>목적</div>
          <div class={st.ex_div}>
            <div class={st.ex}>ex.</div>
            <div class={st.ex_text}>
              첫 회의에서의 아이스브레이킹
              <br />
              자연스러운 공감대 형성
              <br />
              업무에 대한 조언 요청
            </div>
          </div>
          <div class={st.input}>
            <input
              className={st.input_tp}
              type="text"
              placeholder="직접 작성"
              // 필요하면 value/onChange 연결
            />
            <div class={st.line}></div>
          </div>
        </div>
      </div>
      <Button text={"생성하기"} type={"long"} />
    </div>
  );
};

export default NewSmallTalk;
//REST API 형태로 fetch 나 axios를 사용해 POST 요청
// const handleSubmit = async () => {
//   try {
//     const response = await fetch("/api/your-endpoint", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ input: inputValue }),
//     });

//     if (!response.ok) {
//       throw new Error("서버 응답 에러");
//     }

//     const data = await response.json();
//     console.log("서버 응답:", data);
//   } catch (error) {
//     console.error("요청 실패:", error);
//   }
// };
