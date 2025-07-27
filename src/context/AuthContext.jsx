import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const backLink = "https://icey-backend-1027532113913.asia-northeast3.run.app";

  useEffect(() => {
    console.log("isLoggedIn:", !!token); // ✅ 항상 최신값
  }, [token]);

  // 로컬스토리지에서 초기화
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    console.log("storedToken :", storedToken);
    if (storedToken) setToken(storedToken);
    setLoading(false);
  }, []);

  // 로그인 처리 함수
  const login = (newToken) => {
    localStorage.setItem("accessToken", newToken);
    setToken(newToken);
  };

  // 로그아웃 처리 함수
  const logout = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.post(
        `${backLink}/api/logout`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      console.log("로그아웃 성공");
    } catch (error) {
      console.error("로그아웃 실패", error);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("loginType");
      setToken(null);
      console.log("isLoggedIn :", isLoggedIn);
    }
  };

  const isLoggedIn = !!token;

  return (
    <AuthContext.Provider
      value={{ token, login, logout, isLoggedIn, loading, backLink }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
