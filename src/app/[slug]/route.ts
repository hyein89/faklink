import { NextResponse } from 'next/server';
import links from '@/data/links.json';

// --- KONFIGURASI LINK OFFER ---
// Masukkan link offer/iklan kamu di sini
const OFFER_URL = "https://shopee.co.id/flash-sale"; 

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  // 1. Ambil Slug
  const { slug } = await params;

  // 2. Cek apakah link ada di database JSON kita
  const entry = (links as any[]).find((item) => item.id === slug);

  // Jika link tidak ada, langsung lempar ke 404
  if (!entry) {
    const url = new URL(request.url);
    return NextResponse.redirect(new URL('/404', url.origin), { status: 302 });
  }

  // 3. DETEKSI FACEBOOK
  // Kita bongkar URL untuk melihat query parameter
  const urlObj = new URL(request.url);
  const searchParams = urlObj.searchParams;
  const referer = request.headers.get('referer') || "";
  const userAgent = request.headers.get('user-agent') || "";

  // Cek apakah ada 'fbclid' (Tanda user klik dari FB)
  const hasFbclid = searchParams.has('fbclid');
  
  // Cek apakah referer mengandung 'facebook.com'
  const isFromFbReferer = referer.includes('facebook.com') || referer.includes('fb.com');

  // Cek apakah ini BOT Facebook (PENTING: Jangan redirect bot ke offer agar preview aman)
  const isFbBot = userAgent.includes('facebookexternalhit') || userAgent.includes('Facebot');

  // LOGIKA UTAMA:
  // Jika dari FB (ada fbclid atau referer) DAN BUKAN BOT
  if ((hasFbclid || isFromFbReferer) && !isFbBot) {
    // Redirect ke Link Offer
    return NextResponse.redirect(OFFER_URL, { status: 302 });
  }

  // 4. Jika bukan dari FB (atau Bot FB), arahkan ke Link Asli
  // Ini penting supaya Meta Preview di Facebook tetap mengambil data dari Link Asli
  return NextResponse.redirect(entry.url, { status: 307 });
}
