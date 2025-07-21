import { useState } from "react";
import st from "./Home.module.css";
import line from "../assets/line.svg";
import Login_pop_up from "./login_pop_up";
const Home = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleTeamPageClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className={st.home}>
      <div className={st.header}>
        <div className={st.div}>
          <div className={st.div2}>
            <div className={st.icey}>ICEY</div>
          </div>
          <div className={st.frame_380}>
            <div className={st.sign_in}>sign in</div>
          </div>
        </div>
        <img className={st.div3} src={line} />
      </div>
      <div className={st.body}>
        <div className={st.top}>
          <div className={st.div4}>
            <div className={st.frame_383}>
              <div className={st.icey2}>ICEY</div>
              <div className={st.div5}>스몰 토크 &amp; 아이스브레이킹</div>
              <div className={st.icey3}>
                어색한 대화를 준비하는 가장 귀여운 방법, ICEY
              </div>
            </div>
          </div>
          <div className={st.div6}>
            <div className={st.div7}>
              <div className={st.div8}>스몰톡</div>
            </div>
            <div className={st.div9} onClick={handleTeamPageClick}>
              <div className={st.div8}>팀 페이지</div>
            </div>
          </div>
        </div>
        <div className={st.frame_390}>
          <div className={st.rectangle_130}></div>
          <div className={st.line_3}></div>
          <div className={st.icey4}>ICEY는 이런 상황에서 사용해요</div>
          <div className={st.icey5}>
            어색한 분위기가 예상될 때 ICEY로 자연스럽게 대화를 이어나갈 수
            있어요
          </div>
          <div className={st.moments_for_icey}>Moments for ICEY</div>
          <div className={st.frame_190}>
            <div className={st.frame_395}>
              <div className={st.div10}>
                친구를 만났을 때 어떤 질문을 해야할 지 고민
              </div>
              <div className={st.div11}>낯을 많이 가리는 성향</div>
              <div className={st.div11}>
                친구의 질문에 단답으로 대답할까봐 걱정
              </div>
            </div>
            <div className={st.frame_394}>
              <div className={st.div12}>
                팀원 간 서로에 대한 정보를 전혀 모르는 상황
              </div>
              <div className={st.div12}>대면 날짜를 정해야 하는 상황</div>
              <div className={st.div13}>
                효율적인 진행을 위해 만남 전 아이스브레이킹 필요
              </div>
            </div>
          </div>
        </div>
        <div className={st.frame_391}>
          <div className={st.div14}>스몰톡</div>
          <div className={st.for_alone}>For alone</div>
        </div>
        <div className={st.frame_392}>
          <div className={st.div14}>팀페이지</div>
          <div className={st.for_team}>For team</div>
        </div>
      </div>
      <div className={st.foot}>
        <div className={st.body2}>
          <div className={st.frame_361}>
            <div className={st.frame_388}>
              <div className={st.div15}>대한민국(한국어)</div>
            </div>
          </div>
          <div className={st.frame_362}>
            <div className={st.frame_3882}>
              <div className={st.div15}>법률정보</div>
              <div className={st.div15}>안전 및 개인 정보 보호 센터</div>
              <div className={st.div15}>개인정보 처리방침</div>
              <div className={st.div15}>광고 상세 정보</div>
              <div className={st.div15}>접근성</div>
            </div>
            <div className={st.frame_388}>
              <div className={st._2025_icey_web}>@ 2025 ICEY WEB</div>
            </div>
          </div>
          <div className={st.frame_363}>
            <div className={st.frame_3882}>
              <div className={st.div15}>
                여기에 뭘 적어야할지 모르겠습니다. 적으면 적을수록 뭔가 넣어야할
                내용을 도저히 모르겠는 느낌입니다. 통신 판매업? 그런거 안하고,
                저희 대표? 서영 언니? 고객지원문의도 있
                <br />
                긴한데, 번호가 딱히 없으니까 그냥 뭘 적을 수가 없습니다.
                호스팅서비스제공지? 이건 음... 몰라요 솔룩스? 그냥 적어봤어요.
                아무 말이나 적은거라서 신경 안써도 됩니다.
              </div>
            </div>
          </div>
        </div>
      </div>
      {showPopup && <Login_pop_up onClose={closePopup} />}
    </div>
  );
};

export default Home;
