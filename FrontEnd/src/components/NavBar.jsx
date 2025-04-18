import { Link } from 'react-router-dom'
import "../css/Navbar.css"

function NavBar(){
  return( 
  <nav className="navbar">
    <div className="logo">
      <Link to="/"><img src="../logo.png" alt="" className="logo-img" /></Link>
    </div>
    <div className="links">
      <Link to="/">Home</Link>
      <Link to="/favorites">Favorites</Link>
    </div>
  </nav>
  )
}

export default NavBar