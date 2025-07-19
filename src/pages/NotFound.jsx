import st from "./NotFound.module.css";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Header = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/team"); // 소현이 추가하면 home으로 바꾸기
  };
  return (
    <>
      <div className={st.body404}>
        <div className={st.text404}>
          <div className={st.big_text} onClick={handleLogoClick}>
            404 ERROR
          </div>
          <div className={st.small_text}>찾을 수 없는 페이지 입니다.</div>
          <div className={st.small_text}>
            요청하신 페이지가 사라졌거나, 잘못된 경로를 이용하셨어요.
          </div>
        </div>
        <Button text="홈으로 이동" type="long" onClick={handleLogoClick} />
      </div>
    </>
  );
};

export default Header;
