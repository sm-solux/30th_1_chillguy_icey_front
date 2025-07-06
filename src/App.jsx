import "./App.css";
import Header from "./components/Header";
import MyCard from "./pages/MyCard";
import Letter from "./pages/Letter";

function App() {
  return (
    <div className="App-background">
      <Header />
      <MyCard />
      {/* <Letter /> */}
    </div>
  );
}

export default App;
