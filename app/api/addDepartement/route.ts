import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { hash } from 'argon2';
import { userService } from '@/db/services';
import nodemailer from 'nodemailer';
import { error } from 'console';


const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');

function generateRandomPassword(length: number = 12): string {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

export async function POST(request: Request) {
  try {
    // Verify admin authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized', error: true }, { status: 401 });
    }

    const { payload } = await jwtVerify(token, JWT_SECRET);
    
    if (payload.role !== 'platform_admin') {
      return NextResponse.json({ message: 'Forbidden', error: true }, { status: 403 });
    }

    // Parse request body
    const { departement, admin, email } = await request.json();
    console.log(departement, admin, email)

    if (!departement || !admin || !email) {
      return NextResponse.json(
        { message: 'Missing required fields', error: true },
        { status: 400 }
      );
    }

    // Check if admin email already exists
    const existingAdmin = await userService.getUserByEmail(email);

    if (existingAdmin) {
      return NextResponse.json(
        { message: 'Admin already in use', error: true },
        { status: 400 }
      );
    }

    // Generate random password
    const randomPassword = generateRandomPassword();
    console.log(randomPassword);

    // Hash the password using Argon2
    const hashedPassword = await hash(randomPassword);

    // Create department admin
    await userService.createUser(
      admin,
      hashedPassword,
      email,
      departement,
      'departement_admin'
    );

    // Configure nodemailer with Gmail
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                
                auth: {
                    user: process.env.GMAIL_USER,
                    pass: process.env.GMAIL_APP_PASSWORD,
                },
            });
    
            // Email content
            const mailOptions = {
                from: process.env.GMAIL_USER,
                to: email, // You'll receive emails at your Gmail address
                subject: `Contact Form: credential of departement (${departement}) admin: ${admin}`,
                html: `
                    <h3>New Contact Form Submission</h3>
                    <p><strong>Name:</strong> ${admin}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Password:</strong> ${randomPassword}</p>
                `,
            };
    
            // Send email
            await transporter.sendMail(mailOptions);

    // Return success response with the generated password
    return NextResponse.json({
      message: 'Department and admin created successfully',
      error: false,
      department: {
        name: departement
      },
      admin: {
        email: email,
        name: admin,
        role: 'departement_admin'
      },
      password: randomPassword // Include the generated password in the response
    });

  } catch (error) {
    console.error('Error creating department:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: true },
      { status: 500 }
    );
  }
}
