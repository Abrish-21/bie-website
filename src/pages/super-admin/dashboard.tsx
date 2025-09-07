import { useEffect, useState } from 'react';

export default function SuperAdminDashboard() {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [error, setError] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    // Assume token is stored in localStorage after super-admin login
    const t = localStorage.getItem('authToken');
    setToken(t || '');
    if (t) fetchPendingUsers(t);
  }, []);

  const fetchPendingUsers = async (token: string) => {
    setError('');
    const res = await fetch('/api/admin/verify', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) setError(data.error || 'Failed to fetch users');
    else setPendingUsers(data.users || []);
  };

  const approveUser = async (userId: string) => {
    setError('');
    const res = await fetch('/api/admin/verify', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ userId, status: 'active' })
    });
    const data = await res.json();
    if (!res.ok) setError(data.error || 'Failed to approve user');
    else fetchPendingUsers(token);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h2 className="text-2xl font-bold mb-6">Super Admin Verification Panel</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <table className="w-full bg-white rounded shadow-md">
        <thead>
          <tr>
            <th className="p-2 border">Username</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {pendingUsers.length === 0 ? (
            <tr><td colSpan={4} className="p-4 text-center">No pending users</td></tr>
          ) : (
            pendingUsers.map((user: any) => (
              <tr key={user._id}>
                <td className="p-2 border">{user.username}</td>
                <td className="p-2 border">{user.name}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">
                  <button className="bg-green-600 text-white px-3 py-1 rounded" onClick={() => approveUser(user._id)}>
                    Approve
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
