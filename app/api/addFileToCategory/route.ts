import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { hash } from 'argon2';
import { userService, fileService, categoryService } from '@/db/services';

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
    const { category, fileId } = await request.json();
    console.log(category, fileId)

    if (!category || !fileId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if user file already added
    //const f = await categoryService.getCategoriesByName(category);
    //console.log(f);
    const TheCategory = await categoryService.getCategoriesByNameAndUserId(category, payload.userId);
    const file = await fileService.getFilesByIds([fileId]);

    if (TheCategory[0].id === file[0].categoryId) { 
      return NextResponse.json(
        { error: `file already added to category: ${category}` },
        { status: 400 }
      );
    }

    // add file to category
    fileService.updateFileCategoryId(fileId, TheCategory[0].id);
    

    // Return success response with the generated password
    return NextResponse.json({
      message: 'file added to category successfully'
    });

  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
