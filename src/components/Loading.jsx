import st from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={st.spinner_container}>
      <div className={st.spinner}></div>
    </div>
  );
};

export default Loading;
