import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./HeaderFooter.css";
import { signOut } from "../../services/authService.js";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHouse, faTag, faCircleUser } from "@fortawesome/free-solid-svg-icons";
// import { useTranslation } from "react-i18next";

const Header = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  // const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      
      navigate("/login");
    }
    catch (error) {
      console.error("Error signing out:", error);
    }
  };


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {/* {isMobile ? (
      <header className="header-mobile">
        <div className="header-logo">
          <NavLink to="/"><h1>FyndRadarn</h1></NavLink>
        </div> 
        <NavLink to="/"><FontAwesomeIcon icon={faHouse} /></NavLink>
        <NavLink to="/watchlist"><FontAwesomeIcon icon={faTag} /></NavLink>
        <NavLink to="/profile"><FontAwesomeIcon icon={faCircleUser} /></NavLink>
      </header>
      ) : ( 
      <header className="header">
        <div className="header-logo">
          <NavLink to="/"><h1>FyndRadarn</h1></NavLink>
        </div>

        <nav className="header-nav">
          <NavLink to="/"><FontAwesomeIcon icon={faHouse} />{t("header.home")}</NavLink>
          <NavLink to="/watchlist"><FontAwesomeIcon icon={faTag} />{t("header.watchlist")}</NavLink>
        </nav>

        <div className="header-actions">
          <NavLink to="/settings"><FontAwesomeIcon icon={faCircleUser} />[namn]</NavLink>
        </div>
      </header>

    )} */}
      {isMobile ? (
        <header className="header-mobile">
          <div className="header-logo">
            <NavLink to="/">
              <h1>FyndRadarn</h1>
            </NavLink>
          </div>
        </header>
      ) : (
        <header className="header">
          <div className="header-logo">
            <NavLink to="/">
              <h1>FyndRadarn</h1>
            </NavLink>
          </div>
          <div><button onClick={handleSignOut}>Sign Out</button></div>
        </header>
      )}
    </>
  );
};

export default Header;
