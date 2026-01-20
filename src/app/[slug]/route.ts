import { NextResponse } from 'next/server';
import links from '@/data/links.json';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const entry = (links as any[]).find((item) => item.id === slug);

  if (entry) {
    return NextResponse.redirect(entry.url, { status: 307 });
  }

  // JIKA TIDAK KETEMU: Redirect ke halaman not-found bawaan Next.js
  // Kita gunakan URL asal request untuk membuat absolute URL
  const url = new URL(request.url);
  return NextResponse.redirect(new URL('/404', url.origin), { status: 302 });
}
