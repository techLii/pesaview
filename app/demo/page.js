'use client';

import { useState, useEffect } from 'react';
import { databases, DATABASE_ID, COLLECTION_ID, Query } from '../../lib/appwrite';

export default function CompanyDashboard() {
  const company = 'demo'; // 🔥 Hardcoded company name

  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await databases.listDocuments(
          DATABASE_ID,
          COLLECTION_ID,
          [Query.equal('company', company)] // 🔍 Only fetch "demo" rows
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
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <h1>{company.toUpperCase()} Dashboard</h1>
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
