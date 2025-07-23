import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const KakaoCallback = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken =
      params.get("accessToken") || localStorage.getItem("accessToken") || null;

    if (accessToken) {
      login(accessToken); // AuthContext에 전달
      console.log("✅ 토큰 가져오기 성공:", accessToken);
      navigate("/");
    } else {
      console.error("❌ 토큰 가져오기 실패: accessToken 없음");
      navigate("/login");
    }
  }, [login, navigate]);

  return <div>로그인 처리 중입니다...</div>;
};

export default KakaoCallback;
