import { NavLink } from 'react-router-dom'
import './Components.css'

const Header = () => {
  return (
    <header className="header">
      <div className="header-logo">
        <NavLink to="/"><h1>FyndRadarn</h1></NavLink>
      </div>

      <nav className="header-nav">
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/products">Produkter</NavLink>
        <NavLink to="/products/new">Lägg till produkt</NavLink>
      </nav>

      <div className="header-actions">
        <NavLink to="/profile">Profil</NavLink>
        <NavLink to="/logout">Logga ut</NavLink>
      </div>
    </header>
  )
}

export default Header