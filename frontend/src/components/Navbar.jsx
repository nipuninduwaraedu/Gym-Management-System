import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

import "../styles/NavBar.css";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          {/* Logo */}
          <Link to="/" className="logo">
            <span className="logo-icon">💪</span>
            <span className="logo-text">FitLife Gym</span>
          </Link>

          {/* Desktop Links */}
          <ul className="nav-links">
            <li>
              <Link 
                to="/" 
                className={`nav-link ${isActive("/") ? "active" : ""}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className={`nav-link ${isActive("/about") ? "active" : ""}`}
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                to="/pricing" 
                className={`nav-link ${isActive("/pricing") ? "active" : ""}`}
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className={`nav-link ${isActive("/contact") ? "active" : ""}`}
              >
                Contact
              </Link>
            </li>

            {!user ? (
              <>
                <li>
                  <Link 
                    to="/login" 
                    className={`nav-link ${isActive("/login") ? "active" : ""}`}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/register" 
                    className="btn btn-primary nav-btn"
                  >
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                {user?.role === "admin" ? (
                  <>
                    <li>
                      <Link 
                        to="/dashboard" 
                        className={`nav-link ${isActive("/dashboard") ? "active" : ""}`}
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/admin/bookings" 
                        className={`nav-link ${isActive("/admin/bookings") ? "active" : ""}`}
                      >
                        Admin Bookings
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link 
                        to="/dashboard" 
                        className={`nav-link ${isActive("/dashboard") ? "active" : ""}`}
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/booking" 
                        className={`nav-link ${isActive("/booking") ? "active" : ""}`}
                      >
                        Book Session
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/my-bookings" 
                        className={`nav-link ${isActive("/my-bookings") ? "active" : ""}`}
                      >
                        My Bookings
                      </Link>
                    </li>
                  </>
                )}

                <li>
                  <Link 
                    to="/profile" 
                    className={`nav-link ${isActive("/profile") ? "active" : ""}`}
                  >
                    Profile
                  </Link>
                </li>

                <li>
                  <button 
                    onClick={handleLogout} 
                    className="btn btn-outline nav-btn"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>

          {/* Mobile Menu Toggle */}
          <button 
            className="hamburger"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <ul className="mobile-nav-links">
            <li>
              <Link 
                to="/" 
                className={`nav-link ${isActive("/") ? "active" : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className={`nav-link ${isActive("/about") ? "active" : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                to="/pricing" 
                className={`nav-link ${isActive("/pricing") ? "active" : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className={`nav-link ${isActive("/contact") ? "active" : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </li>

            {!user ? (
              <>
                <li>
                  <Link 
                    to="/login" 
                    className={`nav-link ${isActive("/login") ? "active" : ""}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/register" 
                    className="btn btn-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                {user?.role === "admin" ? (
                  <>
                    <li>
                      <Link 
                        to="/dashboard" 
                        className={`nav-link ${isActive("/dashboard") ? "active" : ""}`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/admin/bookings" 
                        className={`nav-link ${isActive("/admin/bookings") ? "active" : ""}`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Admin Bookings
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link 
                        to="/dashboard" 
                        className={`nav-link ${isActive("/dashboard") ? "active" : ""}`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/booking" 
                        className={`nav-link ${isActive("/booking") ? "active" : ""}`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Book Session
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/my-bookings" 
                        className={`nav-link ${isActive("/my-bookings") ? "active" : ""}`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        My Bookings
                      </Link>
                    </li>
                  </>
                )}

                <li>
                  <Link 
                    to="/profile" 
                    className={`nav-link ${isActive("/profile") ? "active" : ""}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                </li>

                <li>
                  <button 
                    onClick={handleLogout} 
                    className="btn btn-outline w-full"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
