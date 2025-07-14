import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Header from "./components/Header";
import Team from "./pages/Team";
// import PromiseSnackbar from "./components/Snackbar/PromiseSnackbar";
// import Snackbar from "./components/Snackbar/Snackbar";
// import LinkSnackbar from "./components/Snackbar/LinkSnackbar";
// import InfoDialog from "./components/Dialog/InfoDialog";
// import PromiseDialog from "./components/Dialog/PromiseDialog";
// import Header from "./components/Header";
import MyCard from "./pages/MyCard";
import Letter from "./pages/Letter";
import Login from "./pages/icyLogin";
import Layout from "./components/PageLayout/Layout";
import Layout_Login from "./components/PageLayout/Layout_login";

function App2() {
  return (
    // <div className="App-background">o
    //   {/* <Header /> */}
    //   {/* <Team /> */}
    //   {/* <PromiseSnackbar /> */}
    //   {/* <LinkSnackbar /> */}
    //   {/* <InfoDialog /> */}
    //   {/* <PromiseDialog /> */}
    //   {/* <Snackbar text={"약속 확정이 완료되었습니다!"} buttontext={"확인"} /> */}
    //   {/* <MyCard /> */}
    //   {/* <Letter /> */}
    //   {/*<Login />*/}
    // </div>

    <Router>
      {/* 공통 레이아웃이 있는 페이지들 */}
      <Routes>
        <Route element={<Layout />}>
          <Route path="/team" element={<Team />} />
          <Route path="/mycard" element={<MyCard />} />
          <Route path="/letter" element={<Letter />} />
        </Route>

        {/* 공통 레이아웃이 없는 페이지들 */}
        <Route element={<Layout_Login />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* 소현이가 Home.jsx 추가하면 시작 */}
        {/* <Route path="/" element={<Home />} /> */}

        {/* 오류 뜰시에 해당 페이지로 가도록 -> 페이지 오류 page 만드나요? */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App2;
