import st from "./Teamlist.module.css";
import Button from "../Button";
import Teambutton from "./Teambutton";
import Teamcreate from "./Teamcreate";

const Teamlist = () => {
  return (
    // 주석 처리된 부분은 필요 시 다시 열면 됩니다.
    // <div className={st.Teamlist_content}>
    //   <div className={st.Teamlist_space}>
    //     <Teambutton
    //       teamname="우리팀"
    //       dday="D-2"
    //       isCheck={true}
    //       // onClick={handleTeamClick}
    //       // linkonClick={handleLinkClick}
    //     />
    //     <Teambutton
    //       teamname="칠가이"
    //       dday="D-14"
    //       isCheck={false}
    //       // onClick={handleTeamClick}
    //       // linkonClick={handleLinkClick}
    //     />
    //     <Teambutton
    //       teamname="안녕"
    //       dday="D-9"
    //       isCheck={false}
    //       // onClick={handleTeamClick}
    //       // linkonClick={handleLinkClick}
    //     />
    //     <Teambutton
    //       teamname="안녕"
    //       dday="D-9"
    //       isCheck={false}
    //       // onClick={handleTeamClick}
    //       // linkonClick={handleLinkClick}
    //     />
    //     <Teambutton
    //       teamname="안녕"
    //       dday="D-9"
    //       isCheck={false}
    //       // onClick={handleTeamClick}
    //       // linkonClick={handleLinkClick}
    //     />
    //   </div>
    //   <div className={st.Teamlist_button_space}>
    //     <Button text={"팀 생성"} type={"mid"} />
    //   </div>
    // </div>

    <div className={st.Teamlist_content}>
      <div className={st.Teamlist_space}>
        <Teamcreate />
      </div>
      <div className={st.Teamlist_button_space}>
        <Button text={"팀 생성"} type={"mid"} />
      </div>
    </div>
  );
};

export default Teamlist;
