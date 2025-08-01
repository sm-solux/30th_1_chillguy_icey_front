import { useState } from "react";
import st from "./Home.module.css";
import st2 from "./Home2.module.css";
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
          <div className={st2.infoBox}>
            <div className={st2.infoRect}></div>
            <div>안녕</div>
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
