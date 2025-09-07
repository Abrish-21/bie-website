import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AdminRegister() {
  const [form, setForm] = useState({ username: '', name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || 'Registration failed');
    } else {
      setSuccess('Registration successful! Await super-admin approval.');
      setForm({ username: '', name: '', email: '', password: '' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form className="bg-white p-8 rounded shadow-md w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6">Admin Registration</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}
        <input name="username" value={form.username} onChange={handleChange} placeholder="Username" required className="mb-4 w-full p-2 border rounded" />
        <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" required className="mb-4 w-full p-2 border rounded" />
        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" required className="mb-4 w-full p-2 border rounded" />
        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" required className="mb-6 w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Register</button>
      </form>
    </div>
  );
}
