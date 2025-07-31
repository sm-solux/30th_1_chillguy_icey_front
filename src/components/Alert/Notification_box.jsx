import { useState, useEffect } from "react";
import {
  getUnreadNotifications,
  markAllAsRead,
  // subscribeToNotifications // SSE를 사용한다면 필요
} from "../../util/NotificationAPI"; // NotificationAPI 경로 확인

import st from "./Notification_box.module.css";
import Notification from "./Notification";
import Alert from "./Alert";
import ViewAll from "./ViewAll";
import person from "../../assets/person.svg";
import bell from "../../assets/notifications.svg";
import Login_Info from "./Login_Info"; // Login_Info 경로 확인

const Notification_box = () => {
  const [showLoginInfo, setShowLoginInfo] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [readList, setReadList] = useState([]);

  // 실제 인증 토큰을 저장할 상태를 추가합니다.
  const [authToken, setAuthToken] = useState(null);

  // 컴포넌트 마운트 시 또는 로그인 후 토큰을 localStorage에서 가져오는 useEffect
  useEffect(() => {
    // 실제 로그인 성공 시 localStorage에 'jwtToken'이라는 키로 토큰을 저장했다고 가정합니다.
    const storedToken = localStorage.getItem("jwtToken");
    if (storedToken) {
      setAuthToken(storedToken); // localStorage에서 가져온 토큰으로 상태 업데이트
    } else {
      console.log(
        "인증 토큰이 localStorage에 없습니다. 로그인 상태를 확인하세요.",
      );
      // 토큰이 없으면 알림을 불러올 수 없으므로, 사용자에게 로그인 필요 메시지를 표시하거나
      // 로그인 페이지로 리다이렉트하는 등의 추가적인 에러 처리가 필요할 수 있습니다.
    }
  }, []); // 이 useEffect는 컴포넌트가 처음 마운트될 때 한 번만 실행됩니다.

  // API에서 알림 데이터 불러오기 (authToken이 변경될 때마다 실행)
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // authToken이 유효할 때만 API 호출을 시도합니다.
        if (authToken) {
          const sortedNotifications = await getUnreadNotifications(authToken); // 실제 토큰 전달
          setNotifications(sortedNotifications);
          setReadList(sortedNotifications.map((item) => item.read));
        }
      } catch (error) {
        console.error("알림 데이터 로드 실패:", error);
        setNotifications([]);
        setReadList([]);
        // 특히 401 Unauthorized 에러인 경우, 토큰 만료 등으로 간주하고
        // 사용자에게 다시 로그인하라는 메시지를 표시하거나 로그인 페이지로 리다이렉트할 수 있습니다.
        if (error.response && error.response.status === 401) {
          console.log(
            "인증 토큰이 만료되었거나 유효하지 않습니다. 다시 로그인해주세요.",
          );
          // 예: navigate('/login'); // react-router-dom의 useNavigate 훅을 사용해야 함
        }
      }
    };

    fetchNotifications(); // authToken 상태가 변경될 때마다 알림을 다시 가져옵니다.
  }, [authToken]); // 의존성 배열에 authToken을 추가하여 토큰이 변경될 때마다 이 훅이 재실행되도록 합니다.

  const handlePersonClick = () => {
    setShowLoginInfo(true);
  };

  const handleBellClick = () => {
    setShowLoginInfo(false);
  };

  const handleMarkAllAsRead = async () => {
    // UI를 먼저 업데이트하여 사용자 경험을 좋게 합니다.
    setReadList(Array(notifications.length).fill(true));

    // API 호출
    try {
      if (authToken) {
        // 토큰이 있을 때만 API 호출
        await markAllAsRead(authToken); // 실제 토큰 전달
        console.log("전체 읽음 처리 완료");
      } else {
        console.log("인증 토큰이 없어 전체 읽음 처리를 할 수 없습니다.");
      }
    } catch (error) {
      console.error("전체 읽음 처리 실패:", error);
      // 에러 발생 시 UI를 이전 상태로 되돌리거나 사용자에게 알림을 줄 수 있습니다.
    }
  };

  const handleSingleRead = (index) => {
    setReadList((prev) => {
      const newList = [...prev];
      newList[index] = true;
      // 만약 단일 알림 읽음 처리 API가 있다면 여기서 호출합니다.
      // 예: markSingleNotificationAsRead(authToken, notifications[index].id);
      return newList;
    });
  };

  return (
    <div className={st.notificationBoxWrapper}>
      <div className={st.notificationBoxContent}>
        {showLoginInfo ? (
          <Login_Info onBellClick={handleBellClick} />
        ) : (
          <>
            <div className={st.notificationHeader}>
              <Notification image={bell} text="알림" />
              <div
                className={st.profileIconWrapper}
                onClick={handlePersonClick}
              >
                <div className={st.profileIcon} style={{ cursor: "pointer" }}>
                  <img src={person} alt="person" />
                </div>
              </div>
              <ViewAll onClick={handleMarkAllAsRead} />
            </div>

            <div className={st.alertListWrapper}>
              <div className={st.alertItemWrapper}>
                {notifications.length > 0 ? ( // 알림이 있을 때만 렌더링
                  notifications.map((item, index) => (
                    <Alert
                      key={item.id}
                      type={item.type}
                      team={item.team}
                      read={readList[index]}
                    />
                  ))
                ) : (
                  <p className={st.noNotifications}>알림이 없습니다.</p> // 알림이 없을 때 메시지
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Notification_box;
