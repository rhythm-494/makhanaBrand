import sql from '../../../lib/db';

export async function GET() {
  try {
    const users = await sql`SELECT * FROM users`;
    return Response.json(users);
  } catch (error) {
    console.error('Database query failed:', error);
    return Response.json(
      { error: 'Database query failed' },
      { status: 500 }
    );
  }
}
