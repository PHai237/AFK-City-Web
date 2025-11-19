// client/src/components/layout/Navbar.tsx
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/authContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          <span className="logo-fantasy">AFK City</span>
        </Link>
        <nav className="navbar-links">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          {user && (
            <NavLink to="/profile" className="nav-link">
              Profile
            </NavLink>
          )}
        </nav>
      </div>

      <div className="navbar-right">
        {user ? (
          <div className="navbar-user">
            <span className="navbar-username">
              {user.username} (Lv.{user.level})
            </span>
            <button className="btn-secondary" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <Link to="/auth" className="btn-primary">
            Login / Register
          </Link>
        )}
      </div>
    </header>
  );
}

export default Navbar;
