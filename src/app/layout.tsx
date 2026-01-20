import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "URL Shortener",
  description: "Simple Redirector",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, fontFamily: 'sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
