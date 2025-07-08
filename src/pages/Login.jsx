import "./Login.css";
// import line from "../assets/line.svg";
// import menu from "../assets/menu.svg";

const Login = () => {
  return (
    <div className="login-content">
      <div className="logo-box">
        <div className="logo">ICEY</div>
      </div>
      <div className="hello-text-box">
        <div className="text1">환영합니다!</div>
        <div className="text2">
          별도 회원 가입 없이 소셜 계정으로 간편하게 시작할 수 있어요.
        </div>
      </div>
      <div className="login-box">
        <button className="kakao-login">
          <img src="" alt="카카오톡 로그인" />
          <div className="kakao-text">카카오톡으로 시작하기</div>
        </button>
        <button className="google-login">
          <img src="" alt="구글 로그인" />
          <div className="google-text">구글로 시작하기</div>
        </button>
      </div>
    </div>
  );
};

export default Login;
