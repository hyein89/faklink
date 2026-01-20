import { NextResponse } from 'next/server';
import links from '@/data/links.json';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  // Ambil slug, misal '123abc'
  const slug = params.slug;

  // Cari di JSON
  const entry = links.find((item) => item.id === slug);

  // Jika ketemu, Redirect Server-Side
  if (entry) {
    // 307 = Temporary Redirect (Bagus agar bot sosmed fetch ulang setiap saat)
    // 301 = Permanent Redirect (Kalau kamu yakin link tidak akan berubah selamanya)
    return NextResponse.redirect(entry.url, { status: 307 });
  }

  // Jika tidak ketemu (404)
  return NextResponse.json(
    { error: "Link not found" },
    { status: 404 }
  );
}
