import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './HeaderFooter.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faTag, faCircleUser} from "@fortawesome/free-solid-svg-icons";


const Header = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <> 
    {isMobile ? (
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
          <NavLink to="/"><FontAwesomeIcon icon={faHouse} />Hem</NavLink>
          <NavLink to="/watchlist"><FontAwesomeIcon icon={faTag} />Bevakningar</NavLink>
        </nav>

        <div className="header-actions">
          <NavLink to="/profile"><FontAwesomeIcon icon={faCircleUser} />[namn]</NavLink>
        </div>
      </header>

    )}
    </>
    
  )
}

export default Header;