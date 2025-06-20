import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
  const backendUrl = `${apiUrl}/issues/?${searchParams.toString()}`;

  try {
    const response = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ detail: errorText }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error('API Error:', err);
    return NextResponse.json(
      { detail: 'Failed to reach backend server' },
      { status: 500 }
    );
  }
}
// export async function GET(request: Request) {
//   try {
//     const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
//     const response = await fetch(`${backendUrl}/issues`);
//     if (!response.ok) {
//       return NextResponse.json({ error: 'Failed to fetch issues' }, { status: response.status });
//     }
//     const issues = await response.json();
//     return NextResponse.json(issues);
//   } catch {
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }