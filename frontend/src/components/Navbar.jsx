import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      <h2>GymMS</h2>

      <div className="nav-links">

        <Link to="/">Home</Link>

        <Link to="/about">About</Link>

        <Link to="/pricing">Pricing</Link>

        <Link to="/contact">Contact</Link>

      </div>

    </nav>
  );
}

export default Navbar;