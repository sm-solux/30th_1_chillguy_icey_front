import { useState } from "react";
import st from "./Home.module.css";
import line from "../assets/line.svg";
import AlertLoginDialog from "../components/Home/AlertLoginDialog";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Snackbar from "../components/Snackbar/Snackbar";
const Home = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleTeamPageClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleSignButtonClick = (e) => {
    e.stopPropagation();
    if (isLoggedIn) {
      logout();
      setShowSnackbar(true); // 스낵바 띄우기
      setTimeout(() => setShowSnackbar(false), 2000); // 2초 뒤 사라짐
    } else {
      navigate("/login"); // 로그인 페이지로 이동
    }
  };

  const onClicksmalltalk = (e) => {
    navigate("/smalltalk"); // 스몰톡 페이지로 이동
  };

  const onClickteam = (e) => {
    navigate("/team"); // 스몰톡 페이지로 이동
  };
  const [showSnackbar, setShowSnackbar] = useState(false);
  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  return (
    <div className={st.background}>
      <div className={st.home}>
        <div className={st.header}>
          <div className={st.logo_sign}>
            <div className={st.logo}>
              <div className={st.icey}>ICEY</div>
            </div>
            <div className={st.sign_in_button} onClick={handleSignButtonClick}>
              <div className={st.sign_in}>
                {isLoggedIn ? "sign out" : "sign in"}
              </div>
            </div>
          </div>
          <img className={st.header_line} src={line} />
        </div>
        <div className={st.body}>
          <div className={st.heroSection}>
            <div className={st.heroIntroWrapper}>
              <div className={st.heroTextBox}>
                <div className={st.heroTitle}>ICEY</div>
                <div className={st.heroSubtitle}>
                  스몰 토크 &amp; 아이스브레이킹
                </div>
                <div className={st.heroDescription}>
                  어색한 대화를 준비하는 가장 귀여운 방법, ICEY
                </div>
              </div>
            </div>
            <div className={st.go_button}>
              <div className={st.smalltalk} onClick={onClicksmalltalk}>
                <div className={st.go_text}>스몰톡</div>
              </div>
              {isLoggedIn ? (
                <div className={st.smalltalk} onClick={onClickteam}>
                  <div className={st.go_text}>팀 페이지</div>
                </div>
              ) : (
                <div className={st.team} onClick={handleTeamPageClick}>
                  <div className={st.go_text}>팀 페이지</div>
                </div>
              )}
            </div>
          </div>
          <div className={st.infoSection}>
            <div className={st.infoBoxBackground}></div>
            <div className={st.infoDivider}></div>
            <div className={st.infoTitle}>ICEY는 이런 상황에서 사용해요</div>
            <div className={st.infoText}>
              어색한 분위기가 예상될 때 ICEY로 자연스럽게 대화를 이어나갈 수
              있어요
            </div>
            <div className={st.momentsTitle}>Moments for ICEY</div>
            <div className={st.momentsCards}>
              <div className={st.momentCardPersonal}>
                <div className={st.momentItem1}>
                  친구를 만났을 때 어떤 질문을 해야할 지 고민
                </div>
                <div className={st.momentItem2}>낯을 많이 가리는 성향</div>
                <div className={st.momentItem2}>
                  친구의 질문에 단답으로 대답할까봐 걱정
                </div>
              </div>
              <div className={st.momentCardTeam}>
                <div className={st.momentItem3}>
                  팀원 간 서로에 대한 정보를 전혀 모르는 상황
                </div>
                <div className={st.momentItem3}>
                  대면 날짜를 정해야 하는 상황
                </div>
                <div className={st.momentItem4}>
                  효율적인 진행을 위해 만남 전 아이스브레이킹 필요
                </div>
              </div>
            </div>
          </div>
          <div className={st.smalltalkBox}>
            <div className={st.sectionTitle}>스몰톡</div>
            <div className={st.for_alone}>For alone</div>
          </div>
          <div className={st.teamBox}>
            <div className={st.sectionTitle}>팀페이지</div>
            <div className={st.for_team}>For team</div>
          </div>
        </div>
        <div className={st.foot}>
          <div className={st.footerContent}>
            <div className={st.footerLanguage}>
              <div className={st.footerCopyright}>
                <div className={st.footerText}>대한민국(한국어)</div>
              </div>
            </div>
            <div className={st.footerLegalInfo}>
              <div className={st.footerLinkList}>
                <div className={st.footerText}>법률정보</div>
                <div className={st.footerText}>안전 및 개인 정보 보호 센터</div>
                <div className={st.footerText}>개인정보 처리방침</div>
                <div className={st.footerText}>광고 상세 정보</div>
                <div className={st.footerText}>접근성</div>
              </div>
              <div className={st.footerCopyright}>
                <div className={st.copyrightText}>@ 2025 ICEY WEB</div>
              </div>
            </div>
            <div className={st.footerEtcInfo}>
              <div className={st.footerLinkList}>
                <div className={st.footerText}>
                  여기에 뭘 적어야할지 모르겠습니다. 적으면 적을수록 뭔가
                  넣어야할 내용을 도저히 모르겠는 느낌입니다. 통신 판매업?
                  그런거 안하고, 저희 대표? 서영 언니? 고객지원문의도 있
                  <br />
                  긴한데, 번호가 딱히 없으니까 그냥 뭘 적을 수가 없습니다.
                  호스팅서비스제공지? 이건 음... 몰라요 솔룩스? 그냥 적어봤어요.
                  아무 말이나 적은거라서 신경 안써도 됩니다.
                </div>
              </div>
            </div>
          </div>
        </div>
        {showPopup && <AlertLoginDialog onClose={closePopup} />}
      </div>
      {showSnackbar && (
        <Snackbar
          text={"로그아웃 되었습니다"}
          buttontext={"확인"}
          buttonOnclick={handleSnackbarClose}
        />
      )}
    </div>
  );
};

export default Home;
