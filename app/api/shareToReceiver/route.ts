import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { hash } from 'argon2';
import { sharedFileService, userService, fileService } from '@/db/services';

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
    // Parse request body
    const { fileId, email } = await request.json();
    console.log(fileId, payload.userId, email);

    if (!fileId || !payload.userId || !email) {
        return NextResponse.json(
          { message: 'Missing required fields' },
          { status: 400 }
        );
    }

    // Check if file already exists
    const existingfile = await sharedFileService.getSharedFileById(fileId);
    console.log(existingfile);
    const DepartementSharedFiles = await sharedFileService.getSharedFileByIdInDepartement(fileId);
    console.log(fileId, DepartementSharedFiles);

    if ((existingfile  && existingfile.length > 0) || (DepartementSharedFiles && DepartementSharedFiles.length > 0)) {
      return NextResponse.json(
        { message: 'file already shared' },
        { status: 400 }
      );
    }

    const receiver = await userService.getUserByEmail(email);

    if (!receiver) {
      return NextResponse.json(
        { message: 'receiver does not exist' },
        { status: 400 }
      );
    }

    if(receiver.departement !== payload.departement){
        return NextResponse.json(
            { message: 'cant send to users outside your departement' },
            { status: 400 }
          );
    }

    
    // unssert file
    await sharedFileService.shareFileWithUser(
        fileId, payload.userId, receiver.id
    );

    await fileService.updateFileSharedStatus(fileId, 1);

    // Return success response
    return NextResponse.json({
      message: 'file shared successfully',
    }, {status: 200});

  } catch (error) {
    console.error('Error sharing file:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
