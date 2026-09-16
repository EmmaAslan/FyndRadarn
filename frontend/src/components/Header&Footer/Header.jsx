import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import "./HeaderFooter.css";
import { signOut } from "../../services/authService.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faTag, faCircleUser } from "@fortawesome/free-solid-svg-icons";
// import { useTranslation } from "react-i18next";

const Header = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  // const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);

  console.log("Auth user:", user);
  console.log("Auth user email:", user?.email);
  console.log("Auth loading:", loading);

  const handleSignOut = async () => {
    try {
      await signOut();

      navigate("/login");
    } catch (error) {
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
      {isMobile ? (
        <header className="header-mobile">
          <div className="header-logo">
            <NavLink to="/">
              <h1>FyndRadarn</h1>
            </NavLink>
          </div>

          {user ? (
            <>
              <NavLink to="/">
                <FontAwesomeIcon icon={faHouse} />
              </NavLink>
              <NavLink to="/watchlist">
                <FontAwesomeIcon icon={faTag} />
              </NavLink>
              <NavLink to="/profile">
                <FontAwesomeIcon icon={faCircleUser} />
              </NavLink>

              <div>
                <button onClick={handleSignOut}>Sign Out</button>
              </div>
            </>
          ) : (
            <div>
              <NavLink to="/signup">Sign Up</NavLink>
              <NavLink to="/login">Log In</NavLink>
            </div>
          )}
        </header>
      ) : (
        <header className="header">
          <div className="header-logo">
            <NavLink to="/">
              <h1>FyndRadarn</h1>
            </NavLink>
          </div>

          {user ? (
            <>
              <nav className="header-nav">
                <NavLink to="/">
                  <FontAwesomeIcon icon={faHouse} />
                  {/* {t("header.home")} */}
                  Home
                </NavLink>
                <NavLink to="/watchlist">
                  <FontAwesomeIcon icon={faTag} />
                  {/* {t("header.watchlist")} */}
                  Watchlist
                </NavLink>
              </nav>

              <div className="header-actions">
                <NavLink to="/settings">
                  <FontAwesomeIcon icon={faCircleUser} />
                  {user.email}
                </NavLink>
              </div>

              <div>
                <button onClick={handleSignOut}>Sign Out</button>
              </div>
            </>
          ) : (
            <>
              <div>
                <NavLink to="/signup">Sign Up</NavLink>
                <NavLink to="/login">Log In</NavLink>
              </div>
            </>
          )}
        </header>
      )}
    </>
  );
};

export default Header;
