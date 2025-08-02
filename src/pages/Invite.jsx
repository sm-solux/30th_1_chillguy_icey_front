import InfoDialog from "../components/Dialog/InfoDialog";
import st from "./Invite.module.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { fetchCheckTeamLinkToken } from "../util/TeamDataAPI";
import Loading from "../components/Loading";

const Invite = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, loading } = useAuth();
  const { invitationToken } = useParams();
  const [invitationRes, setInvitationRes] = useState(null);
  const [isInviteLoading, setIsInviteLoading] = useState(true); // 🔄 초대 링크 로딩 상태
  const { token } = useAuth();

  // ✅ 로그인 확인 및 리디렉션
  useEffect(() => {
    if (!loading && !isLoggedIn) {
      const pathToSave = location.pathname + location.search;
      sessionStorage.setItem("loginRedirectPath", pathToSave);
      navigate("/login");
    }
  }, [isLoggedIn, loading, navigate, location]);

  // ✅ invitationToken으로 팀 정보 fetch
  useEffect(() => {
    if (invitationToken && isLoggedIn && token) {
      const loadLinkRes = async () => {
        try {
          const res = await fetchCheckTeamLinkToken(invitationToken, token);
          setInvitationRes(res);
        } catch (error) {
          console.error("❌ 팀 정보 로딩 실패:", error);
        } finally {
          setIsInviteLoading(false);
        }
      };
      loadLinkRes();
    }
  }, [invitationToken, token, isLoggedIn]);

  // ✅ 렌더링 조건
  if (loading || isInviteLoading) return <Loading />;
  if (!isLoggedIn) return null;
  if (!invitationRes)
    return (
      <div className={st.small_text}>팀 정보를 불러오는 데 실패했습니다.</div>
    );

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
