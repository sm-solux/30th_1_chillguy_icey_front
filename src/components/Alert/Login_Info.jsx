import st from "./Login_Info.module.css";
import person from "../../assets/person.svg";
import bell from "../../assets/notifications.svg";
import symbol from "../../assets/google.svg";
import pi from "../../assets/loginperson.svg";
import lg from "../../assets/logout.svg";

const Login_Info = ({ onBellClick }) => {
  return (
    <div className={st.loginInfoWrapper}>
      <div className={st.loginInfoHeader}>
        <div className={st.bellIconWrapper}>
          <div
            className={st.bellIconButton}
            onClick={onBellClick}
            style={{ cursor: "pointer" }} // 마우스 포인터 변경
          >
            <img src={bell} alt="bell" />
          </div>
        </div>

        <button className={st.loginButton} onClick={() => {}}>
          <div className={st.loginButtonInner}>
            <div className={st.loginButtonIcon}>
              <img src={person} alt="person" />
            </div>

            <span className={st.loginButtonLabel}>로그인 정보</span>
          </div>
        </button>
      </div>

      <div className={st.userInfoSection}>
        <div className={st.userInfoWrapper}>
          <div className={st.userInfoContent}>
            <div className={st.userInfoDetails}>
              <div className={st.profileImgWrapper}>
                <img className={st.profileImg} src={pi} />
              </div>
              <div className={st.userName}>김개구리</div>
              <div className={st.userEmail}>frog@icey.com</div>
              <div className={st.linkedAccountWrapper}>
                <div className={st.linkedAccountInner}>
                  <div className={st.linkedAccountContent}>
                    <img className={st.linkedIcon} src={symbol} />

                    <div className={st.linkedStatusText}>연동됨</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={st.logoutSection}>
              <img className={st.logoutIcon} src={lg} />
              <div className={st.logoutLabel}>로그아웃</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login_Info;
