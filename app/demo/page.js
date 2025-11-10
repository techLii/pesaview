'use client';

import { useState, useEffect } from 'react';
import { databases, DATABASE_ID, COLLECTION_ID, Query, account } from '../../lib/appwrite';
import { useAuth } from '../../lib/auth';

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


export default function CompanyDashboard() {
  const { user, setUser } = useAuth(); // 🔑 Auth context
  const company = 'demo'; // Hardcoded company name

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
      <Card className="w-full sm:w-auto max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Button variant="link">Sign Up</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault(); // prevent page reload
              login();
            }}
          >
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="company@pesaview.com"
                  required
                  value={email} // controlled input
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password} // controlled input
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <Button type="submit" className="w-full mt-4">
              Login
            </Button>
          </form>

        </CardContent>
        
      </Card>
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
