import { useState } from "react";
import axios from "axios";

function Registration() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError('Please fill in all fields.');
    } else {
      try {
        await axios.post('http://localhost:4000/registration', { username, email, password });
        setError('User registered successfully.');
      } catch (error) {
        setError('Failed to register user.');
      }
    }
  };

  return (
    <>
      <h1>Registration</h1>
      <form className="registrationForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

        <label>Email</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        {error && <p className="error">{error}</p>}

        <button type="submit">Registration</button>
      </form>
    </>
  );
}

export default Registration;
