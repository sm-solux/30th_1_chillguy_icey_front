import "./Teamlist.css";
import Button from "../Button";
import Teambutton from "./Teambutton";

const Teamlist = () => {
  return (
    <div className="Teamlist-content">
      <div className="Teamlist-space">
        <Teambutton
          teamname="우리팀"
          dday="D-2"
          isCheck={true}
          // onClick={handleTeamClick}
          // linkonClick={handleLinkClick}
        />
        <Teambutton
          teamname="칠가이"
          dday="D-14"
          isCheck={false}
          // onClick={handleTeamClick}
          // linkonClick={handleLinkClick}
        />
        <Teambutton
          teamname="안녕"
          dday="D-9"
          isCheck={false}
          // onClick={handleTeamClick}
          // linkonClick={handleLinkClick}
        />
        <Teambutton
          teamname="안녕"
          dday="D-9"
          isCheck={false}
          // onClick={handleTeamClick}
          // linkonClick={handleLinkClick}
        />
        <Teambutton
          teamname="안녕"
          dday="D-9"
          isCheck={false}
          // onClick={handleTeamClick}
          // linkonClick={handleLinkClick}
        />
      </div>
      <div className="Teamlist-button-space">
        <Button text={"팀 생성"} type={"mid"} />
      </div>
    </div>
  );
};

export default Teamlist;
