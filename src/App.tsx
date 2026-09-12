import { useState } from 'react';
import type { FormEvent } from 'react';
import axios from 'axios';
import './App.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

interface AskResponse {
  question: string;
  answer: string;
  sources: string[];
  asked_by: string;
}

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState<AskResponse | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setError('');
    try {
      const result = await axios.post(`${API_BASE_URL}/login`, { username, password });
      setToken(result.data.access_token);
    } catch (err) {
      setError('Login failed. Check your username and password.');
    }
  }

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    setError('');
    try {
      await axios.post(`${API_BASE_URL}/register`, { username, password });
      setError('Registered successfully! Now log in.');
    } catch (err) {
      setError('Registration failed. Username may already exist, or password is too weak.');
    }
  }

  async function handleAsk(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    setResponse(null);

    try {
      const result = await axios.post<AskResponse>(
        `${API_BASE_URL}/ask`,
        { question },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResponse(result.data);
    } catch (err) {
      setError('Failed to get an answer. Your session may have expired - try logging in again.');
    } finally {
      setLoading(false);
    }
  }

  if (!token) {
    return (
      <div className="container">
        <h1>AI Study Assistant</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="button-row">
            <button type="submit">Log In</button>
            <button type="button" onClick={handleRegister}>Register</button>
          </div>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    );
  }

  return (
    <div className="container">
      <h1>AI Study Assistant</h1>
      <form onSubmit={handleAsk}>
        <input
          type="text"
          placeholder="Ask a question about your course material..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Thinking...' : 'Ask'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {response && (
        <div className="answer-box">
          <h3>Answer:</h3>
          <p>{response.answer}</p>
          <p className="sources">Sources: {response.sources.join(', ')}</p>
        </div>
      )}
    </div>
  );
}

export default App;
