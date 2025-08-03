import pool from '../../../../lib/db'
import bcrypt from 'bcryptjs'

export async function POST(request) {
  try {
    const { name, email, password, phone, address } = await request.json()

    // Validate required fields
    if (!name || !email || !password) {
      return Response.json(
        { message: 'Name, email, and password are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return Response.json(
        { message: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Validate password length
    if (password.length < 6) {
      return Response.json(
        { message: 'Password must be at least 6 characters long' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const { rows: existingUsers } = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [email.toLowerCase()]
    )

    if (existingUsers.length > 0) {
      return Response.json(
        { message: 'An account with this email already exists' },
        { status: 409 }
      )
    }

    // Hash password
    const saltRounds = 12
    const password_hash = await bcrypt.hash(password, saltRounds)

    // Insert new user into database
    const { rows: newUser } = await pool.query(
      `INSERT INTO users (name, email, password_hash, phone, address, role) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING id, name, email, phone, role, created_at`,
      [name.trim(), email.toLowerCase(), password_hash, phone || null, address || null, 'customer']
    )

    // Return success response (don't include password_hash)
    return Response.json({
      message: 'Account created successfully',
      user: {
        id: newUser[0].id,
        name: newUser[0].name,
        email: newUser[0].email,
        phone: newUser[0].phone,
        role: newUser[0].role,
        created_at: newUser[0].created_at
      }
    }, { status: 201 })

  } catch (error) {
    console.error('Signup error:', error)
    
    // Handle specific database errors
    if (error.code === '23505') { // Unique constraint violation
      return Response.json(
        { message: 'An account with this email already exists' },
        { status: 409 }
      )
    }

    return Response.json(
      { message: 'Internal server error. Please try again.' },
      { status: 500 }
    )
  }
}
