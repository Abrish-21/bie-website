import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { LogOut } from 'lucide-react';

export default function SuperAdminDashboard() {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Middleware now protects this page, so we can assume the user is authenticated.
    // We can fetch the user data if needed, or just perform actions.
    fetchPendingUsers();
  }, []);

  const fetchPendingUsers = async () => {
    setError('');
    // The token is sent via cookie automatically by the browser
    const res = await fetch('/api/admin/verify');
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
      },
      body: JSON.stringify({ userId, status: 'active' })
    });
    const data = await res.json();
    if (!res.ok) setError(data.error || 'Failed to approve user');
    else fetchPendingUsers();
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout failed', error);
    } finally {
      localStorage.removeItem('user');
      router.push('/admin/login');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Super Admin Verification Panel</h2>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
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

