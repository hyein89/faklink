import { NextResponse } from 'next/server';
import links from '@/data/links.json';

// Perhatikan tipe datanya: params sekarang dibungkus Promise
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  // WAJIB: Gunakan 'await' untuk membuka params di Next.js 16
  const { slug } = await params;

  // Cari data di JSON (pastikan tipe data di links.json cocok)
  const entry = (links as any[]).find((item) => item.id === slug);

  if (entry) {
    return NextResponse.redirect(entry.url, { status: 307 });
  }

  return NextResponse.json(
    { error: "Link not found" },
    { status: 404 }
  );
}
