// client/src/pages/ProfilePage.tsx
import { useAuth } from "../hooks/authContext";

function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return <div className="page">No user loaded.</div>;
  }

  return (
    <div className="profile-page">
      <h1 className="page-title">Adventurer Profile</h1>
      <div className="profile-card">
        <div className="profile-main">
          <div className="avatar-circle">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2>{user.username}</h2>
            <p>{user.email}</p>
          </div>
        </div>
        <div className="profile-stats">
          <div className="stat">
            <span className="stat-label">Level</span>
            <span className="stat-value">{user.level}</span>
          </div>
          <div className="stat">
            <span className="stat-label">EXP</span>
            <span className="stat-value">{user.exp}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Gold</span>
            <span className="stat-value">{user.gold}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
