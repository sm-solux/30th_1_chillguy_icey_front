import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const KakaoCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken =
      params.get("accessToken") || localStorage.getItem("accessToken");

    const redirectPath = sessionStorage.getItem("loginRedirectPath") || "/";

    if (accessToken) {
      login(accessToken);
      console.log("✅ 로그인 성공. 이동 경로:", redirectPath);

      // sessionStorage.removeItem("loginRedirectPath"); // → 나중에 원하면 주석 해제
      navigate(redirectPath, { replace: true });
    } else {
      console.error("❌ 로그인 실패: 토큰 없음");
      navigate("/login");
    }
  }, [login, navigate]);

  return <div>로그인 처리 중입니다...</div>;
};

export default KakaoCallback;
