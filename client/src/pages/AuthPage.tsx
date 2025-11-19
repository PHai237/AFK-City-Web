// client/src/pages/AuthPage.tsx
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi, registerApi } from "../api/authApi";
import { useAuth } from "../hooks/authContext";

type Mode = "login" | "register";

function AuthPage() {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState(""); // dùng khi register
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const toggleMode = () => {
    setError(null);
    setMode((prev) => (prev === "login" ? "register" : "login"));
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    try {
      if (mode === "register") {
        const res = await registerApi({ email, username, password });
        login(res.token, res.user);
      } else {
        const res = await loginApi({ email, password });
        login(res.token, res.user);
      }
      navigate("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Something went wrong");
      } else {
        setError("Something went wrong");
      }
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">
          {mode === "login" ? "Enter AFK City" : "Join AFK City"}
        </h1>

        <p className="auth-subtitle">
          {mode === "login"
            ? "Login to your adventurer account."
            : "Create your adventurer account."}
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label className="auth-label">
            Email
            <input
              className="auth-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          {mode === "register" && (
            <label className="auth-label">
              Username
              <input
                className="auth-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
          )}

          <label className="auth-label">
            Password
            <input
              className="auth-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          {error && <div className="auth-error">{error}</div>}

          <button className="btn-primary auth-submit" type="submit">
            {mode === "login" ? "Login" : "Register"}
          </button>
        </form>

        <button className="auth-toggle" type="button" onClick={toggleMode}>
          {mode === "login"
            ? "Need an account? Register"
            : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
}

export default AuthPage;
