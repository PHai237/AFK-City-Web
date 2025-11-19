// client/src/pages/HomePage.tsx
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/authContext";

function HomePage() {
  const { user } = useAuth();

  return (
    <div className="home-page">
      <h1 className="page-title">Welcome to AFK City</h1>
      {user ? (
        <p className="page-subtitle">
          Greetings, <strong>{user.username}</strong>. You are level{" "}
          <strong>{user.level}</strong> adventurer.
        </p>
      ) : (
        <p className="page-subtitle">
          Please <Link to="/auth">login or register</Link> to enter the city.
        </p>
      )}

      <div className="home-grid">
        <div className="home-card">
          <h2>Quest Board</h2>
          <p>Take quests to gain EXP and gold (coming soon).</p>
        </div>
        <div className="home-card">
          <h2>Tavern</h2>
          <p>Chat with other adventurers (coming soon).</p>
        </div>
        <div className="home-card">
          <h2>Guild Hall</h2>
          <p>Join a guild and form a party (coming soon).</p>
        </div>
        <div className="home-card">
          <h2>Training Ground</h2>
          <p>Study and level up your knowledge (coming soon).</p>
        </div>
        <div className="home-card">
          <h2>AFK Arcade</h2>
          <p>Play light mini games (coming soon).</p>
        </div>
        <div className="home-card">
          <h2>Music Room & Theater</h2>
          <p>Listen to music and watch videos together (coming soon).</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
