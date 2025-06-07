import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { hash } from 'argon2';
import { departmentService } from '@/db/services';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');
interface Payload {
    userId: number,
    email: string,
    role: string,
    departement: string
}

export async function POST(request: Request) {
  try {
    // Verify admin authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { payload } = await jwtVerify(token, JWT_SECRET) as { payload: Payload };
    //console.log(payload);
    if (payload.role !== 'departement_admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Parse request body
    const { departement } = await request.json();
    console.log(departement)

    if (!departement) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if invitation already exists
    const existingColaboration = await departmentService.getAppendingColaboration(departement);

    if (existingColaboration.length > 0) {
      return NextResponse.json(
        { message: 'colaboration already exist' },
        { status: 400 }
      );
    }

    await departmentService.requestCollaboration(payload.departement, departement);
    return NextResponse.json({
      message: 'departement colaboration created successfully',
    });

  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
