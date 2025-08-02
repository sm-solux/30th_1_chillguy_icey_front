import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import hd from "./Header.module.css";
import menu from "../assets/menu.svg";
import Notification_box from "./Alert/Notification_box";
import { useAuth } from "../context/AuthContext";
import AlertLoginDialog from "./Home/AlertLoginDialog";

const Header = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const sideMenuRef = useRef(null);
  const menuIconRef = useRef(null);
  const navigate = useNavigate();

  const { token } = useAuth();

  const handleLogoClick = () => {
    navigate("/");
  };

  const toggleSideMenu = () => {
    if (!token) {
      setShowLoginAlert(true);
      return;
    }
    setIsSideMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuIconRef.current && menuIconRef.current.contains(event.target)) {
        return;
      }
      if (
        isSideMenuOpen &&
        sideMenuRef.current &&
        !sideMenuRef.current.contains(event.target)
      ) {
        setIsSideMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSideMenuOpen]);

  const closeLoginAlert = () => {
    setShowLoginAlert(false);
  };

  return (
    <>
      <header className={hd.Header}>
        <div className={hd.Header_body}>
          <div className={hd.Header_title}>
            <div className={hd.icey} onClick={handleLogoClick}>
              ICEY
            </div>
          </div>
          <div className={hd.Menu_wrapper}>
            <div className={hd.Header_menu}>
              <img
                ref={menuIconRef}
                className={hd.Menu_logo}
                onClick={toggleSideMenu}
                src={menu}
                alt="menu"
                style={{
                  opacity: token ? 1 : 0.4,
                  cursor: token ? "pointer" : "auto",
                }}
              />
            </div>
            {isSideMenuOpen && token && (
              <div ref={sideMenuRef} className={hd.sideMenuWrapper}>
                <Notification_box />
              </div>
            )}
          </div>
        </div>
        <hr className={hd.headerLine} />
      </header>
      {showLoginAlert && <AlertLoginDialog onClose={closeLoginAlert} />}
    </>
  );
};

export default Header;
