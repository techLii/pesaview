'use client';

import { useState, useEffect } from 'react';
import { databases, DATABASE_ID, COLLECTION_ID, Query, account } from '../../lib/appwrite';
import { useAuth } from '../../lib/auth';

export default function CompanyDashboard() {
  const { user, setUser } = useAuth(); // 🔑 Auth context
  const company = 'Mpesa Shop'; // Hardcoded company name

  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Fetch transactions after login
  useEffect(() => {
    if (!user) {
      setLoading(false); // user not logged in
      return;
    }

    const fetchTransactions = async () => {
      try {
        const response = await databases.listDocuments(
          DATABASE_ID,
          COLLECTION_ID,
          [Query.equal('company', company)]
        );
        setTransactions(response.documents);
      } catch (err) {
        console.error('Error fetching transactions:', err);
        setError('Failed to load transactions.');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [user]);

  // Login function
  const login = async () => {
    setError('');
    setLoading(true);
    try {
      await account.createEmailPasswordSession(email, password);
      const currentUser = await account.get();
      setUser(currentUser); // update global auth state
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed. Check credentials.');
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await account.deleteSession('current');
      setUser(null);
      setTransactions([]);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // Loading state
  if (loading) return <div>Loading...</div>;

  // Not logged in → show login form
  if (!user)
    return (
      <div>
        <h1>Login to {company.toUpperCase()} Dashboard</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button onClick={login}>Login</button>
      </div>
    );

  // Dashboard view
  return (
    <div>
      <h1>{company.toUpperCase()} Dashboard</h1>
      <p>Welcome, {user.name || user.email}</p>
      <button onClick={logout}>Logout</button>
      <h2>Transactions</h2>
      {transactions.length > 0 ? (
        <table border="1">
          <thead>
            <tr>
              <th>Company</th>
              <th>Transaction Code</th>
              <th>Date</th>
              <th>Time</th>
              <th>Name</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.$id}>
                <td>{tx.company}</td>
                <td>{tx.transaction_code}</td>
                <td>{tx.date}</td>
                <td>{tx.time}</td>
                <td>{tx.name}</td>
                <td>{tx.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No transactions found for {company}.</p>
      )}
    </div>
  );
}
