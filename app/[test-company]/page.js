'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { account, databases, DATABASE_ID, COLLECTION_ID, Query } from '../../lib/appwrite';

export default function CompanyDashboard() {
  const { company } = useParams();
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const currentUser = await account.get();
        if (currentUser.prefs?.company === company) {
          setUser(currentUser);
          await fetchTransactions(company);
        } else {
          await account.deleteSession('current');
          setError('You are not authorized for this company.');
        }
      } catch (err) {
        // Not logged in or session expired
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, [company]);

  const login = async () => {
    setError('');
    try {
      await account.createEmailPasswordSession(email, password);
      const currentUser = await account.get();
      if (currentUser.prefs?.company === company) {
        setUser(currentUser);
        await fetchTransactions(company);
      } else {
        await account.deleteSession('current');
        setError('You are not authorized for this company.');
      }
    } catch (err) {
      setError('Invalid email or password.');
    }
  };

  const logout = async () => {
    await account.deleteSession('current');
    setUser(null);
    setTransactions([]);
  };

  const fetchTransactions = async (comp) => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        
      );
      setTransactions(response.documents);
    } catch (err) {
      setError('Failed to load transactions.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <div>
        <h1>Login to {company} Dashboard</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <br />
        <button onClick={login}>Login</button>
      </div>
    );
  }

  return (
    <div>
      <h1>{company} Dashboard</h1>
      <p>Welcome, {user.name}</p>
      <button onClick={logout}>Logout</button>
      <h2>Transactions</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table border="1">
        <thead>
          <tr>
            <th>company</th>
            <th>Transaction Code</th>
            <th>Date</th>
            <th>Time</th>
            <th>Name</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((tx) => (
              <tr key={tx.$id}>
                <td>{tx.company}</td>
                <td>{tx.transaction_code}</td>
                <td>{tx.date}</td>
                <td>{tx.time}</td>
                <td>{tx.name}</td>
                <td>{tx.amount}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No transactions found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}