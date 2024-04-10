import { useState } from "react";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:4000/login", {
        username: username,
        email: email,
        password: password
      });
      
      const { token, user } = response.data;

      // Store token and user information in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      console.log("Logged in successfully");
      
      // Redirect to another page after successful login
      window.location.href = "event"; // Change this to the desired redirect path
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if ((!username && !email) || !password) {
      setError("Please fill in all fields.");
    } else {
      setError("");
      handleLogin();
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form className="loginForm">
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <button type="submit" onClick={handleSubmit}>Login</button>
      </form>
    </>
  );
}

export default Login;




