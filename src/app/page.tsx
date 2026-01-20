'use client';

import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, error

  const handleShorten = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    // Pura-pura loading
    setStatus('loading');
    
    // Setelah 1.5 detik, kasih pesan error "Private Access"
    // Ini bikin orang mikir "Oh, ini tools privat, bukan web phising"
    setTimeout(() => {
      setStatus('error');
    }, 1500);
  };

  return (
    <div style={styles.container}>
      {/* HEADER / NAVIGASI */}
      <nav style={styles.nav}>
        <div style={styles.logo}>Link<span style={{color: '#3b82f6'}}>Manager</span></div>
        <div style={styles.navLinks}>
          <a href="#" style={styles.link}>Features</a>
          <a href="#" style={styles.link}>Pricing</a>
          <button style={styles.loginBtn}>Login</button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <main style={styles.main}>
        <h1 style={styles.title}>
          Shorten Your Links,<br />
          <span style={styles.gradientText}>Expand Your Reach.</span>
        </h1>
        <p style={styles.subtitle}>
          A powerful URL shortener built for developers and marketers. 
          Track clicks, analyze traffic, and optimize your campaigns in real-time.
        </p>

        {/* INPUT BOX PURA-PURA */}
        <form onSubmit={handleShorten} style={styles.form}>
          <input
            type="text"
            placeholder="Paste your long link here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button} disabled={status === 'loading'}>
            {status === 'loading' ? 'Processing...' : 'Shorten URL'}
          </button>
        </form>

        {/* PESAN ERROR 'PRIVAT' */}
        {status === 'error' && (
          <div style={styles.message}>
            ⚠️ <strong>Access Restricted:</strong> Public registration is currently closed. 
            This node is reserved for internal usage only.
          </div>
        )}

        {/* FITUR (Biar kelihatan penuh & pro) */}
        <div style={styles.features}>
          <div style={styles.featureCard}>
            <h3>🚀 Fast Redirect</h3>
            <p>Lightning fast redirection using Edge Network.</p>
          </div>
          <div style={styles.featureCard}>
            <h3>🔒 Secure</h3>
            <p>Enterprise-grade encryption and protection.</p>
          </div>
          <div style={styles.featureCard}>
            <h3>📊 Analytics</h3>
            <p>Real-time data insights for your traffic.</p>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <p>&copy; {new Date().getFullYear()} LinkManager Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}

// STYLING (CSS-in-JS biar gampang copy paste)
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#0a0a0a',
    color: '#ffffff',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    display: 'flex',
    flexDirection: 'column',
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 40px',
    borderBottom: '1px solid #333',
  },
  logo: {
    fontSize: '20px',
    fontWeight: 'bold',
    letterSpacing: '1px',
  },
  navLinks: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
  },
  link: {
    color: '#888',
    textDecoration: 'none',
    fontSize: '14px',
  },
  loginBtn: {
    padding: '8px 20px',
    backgroundColor: 'transparent',
    border: '1px solid #333',
    color: '#fff',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 20px',
    textAlign: 'center',
  },
  title: {
    fontSize: '48px',
    fontWeight: '800',
    marginBottom: '20px',
    lineHeight: '1.2',
  },
  gradientText: {
    background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: {
    fontSize: '18px',
    color: '#888',
    maxWidth: '600px',
    marginBottom: '40px',
    lineHeight: '1.6',
  },
  form: {
    display: 'flex',
    gap: '10px',
    width: '100%',
    maxWidth: '500px',
    marginBottom: '20px',
  },
  input: {
    flex: 1,
    padding: '15px',
    borderRadius: '8px',
    border: '1px solid #333',
    backgroundColor: '#111',
    color: '#fff',
    fontSize: '16px',
    outline: 'none',
  },
  button: {
    padding: '15px 30px',
    backgroundColor: '#3b82f6',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'opacity 0.2s',
  },
  message: {
    padding: '15px',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid #ef4444',
    color: '#fca5a5',
    borderRadius: '8px',
    fontSize: '14px',
    marginTop: '10px',
    maxWidth: '500px',
  },
  features: {
    display: 'flex',
    gap: '20px',
    marginTop: '80px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  featureCard: {
    padding: '20px',
    backgroundColor: '#111',
    border: '1px solid #222',
    borderRadius: '10px',
    width: '200px',
    textAlign: 'left' as const,
  },
  footer: {
    padding: '20px',
    textAlign: 'center',
    borderTop: '1px solid #333',
    color: '#444',
    fontSize: '12px',
  },
};
