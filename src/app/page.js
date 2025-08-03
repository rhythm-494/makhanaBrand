import pool from '../lib/db';

export default async function HomePage() {
  let users = [];

  try {
    const { rows } = await pool.query('SELECT id, name, email, phone FROM users');
    users = rows;
  } catch (error) {
    console.error('Database query error:', error);
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Users List</h1>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul className="space-y-4">
          {users.map((user) => (
            <li key={user.id} className="border p-3 rounded shadow">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
