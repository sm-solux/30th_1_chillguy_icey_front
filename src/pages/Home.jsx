import { useState } from "react";
import st from "./Home.module.css";
import st2 from "./Home2.module.css";
import AlertLoginDialog from "../components/Home/AlertLoginDialog";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Snackbar from "../components/Snackbar/Snackbar";

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleTeamPageClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleSignButtonClick = (e) => {
    e.stopPropagation();
    if (isLoggedIn) {
      logout();
      setShowSnackbar(true);
      setTimeout(() => setShowSnackbar(false), 2000);
    } else {
      navigate("/login");
    }
  };

  const onClicksmalltalk = () => {
    navigate("/smalltalk");
  };

  const onClickteam = () => {
    navigate("/team");
  };

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
          <hr className={st.headerLine} />
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

          {/* Moments for ICEY - ICEY 소개 */}
          <div
            className={st2.infoBox}
            onMouseEnter={() => setHoveredIndex("icey")}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div
              className={`${st2.infoRect} ${hoveredIndex === "icey" ? st2.hovered : ""}`}
            ></div>
            <div className={st2.infoBoxContent}>
              <div className={st2.info_title}>
                <div className={st2.info_title_for}>
                  <div className={st2.info_for_text}>Moments for ICEY</div>
                </div>
                <div className={st2.info_title_big}>ICEY 상황에 사용해요</div>
                <div className={st2.info_title_small}>
                  어색한 분위기가 예상될 때 ICEY로 자연스럽게 대화를 이어나갈 수
                  있어요
                </div>
              </div>
              <div className={st2.info_block_frame}>
                <hr />
              </div>
              <div></div>
            </div>
          </div>

          {/* for Alone - 스몰톡 */}
          <div
            className={st2.infoBox}
            onMouseEnter={() => setHoveredIndex("alone")}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div
              className={`${st2.infoRect} ${hoveredIndex === "alone" ? st2.hovered : ""}`}
            ></div>
            <div className={st2.infoBoxContent}>
              <div className={st2.info_title}>
                <div className={st2.info_title_for}>
                  <div className={st2.info_for_text}>for Alone</div>
                </div>
                <div className={st2.info_title_big}>스몰톡 페이지</div>
                <div className={st2.info_title_small}>
                  처음 말 걸기가 어색할 때는 여기서 가볍게 시작해보세요!
                </div>
              </div>

              <div className={st2.info_block_frame}>
                <hr />
                <div className={st2.info_block_flex}>
                  <div
                    className={`${st2.info_block} ${st2.floating} ${st2.floatingDelay1}`}
                  >
                    <div className={st2.info_block_block_inner}>
                      <div className={st2.info_block_title_group}>
                        <div className={st2.info_block_title}>대상과</div>
                        <div className={st2.info_block_title}>목적만 선택</div>
                      </div>

                      <div className={st2.info_block_body_group}>
                        <hr />
                        <div className={st2.info_block_text_group}>
                          <div className={st2.info_block_text}>
                            대화 대상과 목적만 선택하면,
                          </div>
                          <div className={st2.info_block_text}>
                            아이시가 찰떡 같은
                          </div>
                          <div className={st2.info_block_text}>
                            스몰토크 주제를 추천해드려요.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`${st2.info_block} ${st2.floating} ${st2.floatingDelay2}`}
                  >
                    <div className={st2.info_block_block_inner}>
                      <div className={st2.info_block_title_group}>
                        <div className={st2.info_block_title}>적절한</div>
                        <div className={st2.info_block_title}>답변 팁</div>
                      </div>

                      <div className={st2.info_block_body_group}>
                        <hr />
                        <div className={st2.info_block_text_group}>
                          <div className={st2.info_block_text}>
                            적절한 답변 팁도 함께
                          </div>
                          <div className={st2.info_block_text}>
                            알려주니까, 자연스럽게
                          </div>
                          <div className={st2.info_block_text}>
                            대화에 녹아들 수 있어요.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`${st2.info_block} ${st2.floating} ${st2.floatingDelay3}`}
                  >
                    <div className={st2.info_block_block_inner}>
                      <div className={st2.info_block_title_group}>
                        <div className={st2.info_block_title}>마음에</div>
                        <div className={st2.info_block_title}>드는 스몰톡</div>
                      </div>

                      <div className={st2.info_block_body_group}>
                        <hr />
                        <div className={st2.info_block_text_group}>
                          <div className={st2.info_block_text}>
                            마음에 든 스몰톡은
                          </div>
                          <div className={st2.info_block_text}>
                            저장해두고, 나중에 다시
                          </div>
                          <div className={st2.info_block_text}>
                            꺼내 연습해볼 수도 있습니다!
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* for Team - 팀 페이지 */}
          <div
            className={st2.infoBox}
            onMouseEnter={() => setHoveredIndex("team")}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div
              className={`${st2.infoRect} ${hoveredIndex === "team" ? st2.hovered : ""}`}
            ></div>
            <div className={st2.infoBoxContent}>
              <div className={st2.info_title}>
                <div className={st2.info_title_for}>
                  <div className={st2.info_for_text}>for Team</div>
                </div>
                <div className={st2.info_title_big}>팀 페이지</div>
                <div className={st2.info_title_small}>
                  처음 만난 팀원들과 빨리 친해지고 싶다면, 이곳에서
                  시작해보세요!
                </div>
              </div>

              <div className={st2.info_block_frame}>
                <hr />
                <div className={st2.info_block_flex}>
                  <div
                    className={`${st2.info_block} ${st2.floating} ${st2.floatingDelay1}`}
                  >
                    <div className={st2.info_block_block_inner}>
                      <div className={st2.info_block_title_group}>
                        <div className={st2.info_block_title}>다양한</div>
                        <div className={st2.info_block_title}>게시판</div>
                      </div>

                      <div className={st2.info_block_body_group}>
                        <hr />
                        <div className={st2.info_block_text_group}>
                          <div className={st2.info_block_text}>
                            다양한 게시판 기능으로
                          </div>
                          <div className={st2.info_block_text}>
                            소통하고, 서로의 생각도
                          </div>
                          <div className={st2.info_block_text}>
                            자연스럽게 공유할 수 있어요.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`${st2.info_block} ${st2.floating} ${st2.floatingDelay2}`}
                  >
                    <div className={st2.info_block_block_inner}>
                      <div className={st2.info_block_title_group}>
                        <div className={st2.info_block_title}>명함과</div>
                        <div className={st2.info_block_title}>쪽지</div>
                      </div>

                      <div className={st2.info_block_body_group}>
                        <hr />
                        <div className={st2.info_block_text_group}>
                          <div className={st2.info_block_text}>
                            팀원이 궁금하다면 명함을 통해
                          </div>
                          <div className={st2.info_block_text}>
                            서로를 미리 알아보고,
                          </div>
                          <div className={st2.info_block_text}>
                            쪽지로 먼저 인사도 건네보세요.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`${st2.info_block} ${st2.floating} ${st2.floatingDelay3}`}
                  >
                    <div className={st2.info_block_block_inner}>
                      <div className={st2.info_block_title_group}>
                        <div className={st2.info_block_title}>팀과</div>
                        <div className={st2.info_block_title}>약속 잡기</div>
                      </div>

                      <div className={st2.info_block_body_group}>
                        <hr />
                        <div className={st2.info_block_text_group}>
                          <div className={st2.info_block_text}>
                            아직 약속을 못 잡았다면,
                          </div>
                          <div className={st2.info_block_text}>
                            우리 만날 시간도 여기서
                          </div>
                          <div className={st2.info_block_text}>
                            손쉽게 정할 수 있어요!
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer className={st2.footer}>
            <div className={st2.footer_team_name}>ICEY by. TEAM 칠가이</div>
            <div className={st2.footer_team_text_group}>
              <div className={st2.footer_team_text}>
                숙명여자대학교 프로그래밍 중앙동아리 SOLUX 30기 칠가이 팀입니다.
                전공과 배경이 다양한 구성원들이 모여, 일상 속 커뮤니케이션의
                어려움에 주목했습니다.
              </div>
              <div className={st2.footer_team_text}>
                소통의 부재가 가장 작은 시작, 스몰톡에서부터 해결될 수 있다고
                믿고 웹사이트 ICEY를 개발했습니다. ICEY는 말문을 여는 부담을
                덜고,
              </div>
              <div className={st2.footer_team_text}>
                자연스럽게 관계를 이어갈 수 있도록 돕는 도구입니다. 작은 시작이
                더 나은 소통으로 이어질 수 있도록, 저희는 앞으로도 계속
                고민하겠습니다.
              </div>
            </div>
          </footer>
        </div>
      </div>

      {showPopup && <AlertLoginDialog onClose={closePopup} />}

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
