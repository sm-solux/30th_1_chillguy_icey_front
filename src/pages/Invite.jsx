import InfoDialog from "../components/Dialog/InfoDialog";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { fetchCheckTeamLinkToken } from "../util/TeamDataAPI";

const Invite = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, loading } = useAuth();
  const { invitationToken } = useParams();
  const [invitationRes, setInvitationRes] = useState(null); // null로 초기화

  // 헤더 안넣어도 되는줄 알았는데, 헤더를 넣어야 되나봄
  const { token } = useAuth();

  // ✅ 로그인 확인 및 리디렉션
  useEffect(() => {
    if (!loading && !isLoggedIn) {
      const pathToSave = location.pathname + location.search;
      console.log("🔒 로그인 필요. 이동 전 path 저장:", pathToSave);
      sessionStorage.setItem("loginRedirectPath", pathToSave);

      navigate("/login");
    }
  }, [isLoggedIn, loading, navigate, location]);

  // ✅ invitationToken으로 팀 정보 fetch
  useEffect(() => {
    if (invitationToken) {
      const loadLinkRes = async () => {
        try {
          const ras = await fetchCheckTeamLinkToken(invitationToken, token);
          setInvitationRes(ras);
        } catch (error) {
          console.error("❌ 팀 정보 로딩 실패:", error);
        }
      };
      loadLinkRes();
    }
  }, [invitationToken, token]);

  // ✅ 렌더링 조건
  if (loading) return <div>로딩 중...</div>;
  if (!isLoggedIn) return null;
  if (!invitationRes) return <div>팀 정보를 불러오는 중입니다...</div>;

  return (
    <>
      <InfoDialog
        linkTeam={invitationRes.data}
        invitationToken={invitationToken}
      />
    </>
  );
};

export default Invite;
