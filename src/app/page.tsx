'use client';

import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');

  const handleShorten = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setStatus('loading');

    // Simulasi loading 1.5 detik, lalu muncul error
    setTimeout(() => {
      setStatus('error');
    }, 1500);
  };

  return (
    <div style={styles.container}>
      {/* Kotak Utama (Card) */}
      <div style={styles.card}>
        
        {/* Judul & Deskripsi */}
        <div style={styles.header}>
          <h1 style={styles.title}>URL SHORTENER</h1>
          <p style={styles.subtitle}>Private Link Management System</p>
        </div>

        {/* Form Input */}
        <form onSubmit={handleShorten} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Paste Long URL</label>
            <input
              type="text"
              placeholder="https://example.com/very-long-url..."
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (status === 'error') setStatus('idle'); // Reset error kalau ngetik ulang
              }}
              style={styles.input}
            />
          </div>

          <button 
            type="submit" 
            style={status === 'loading' ? styles.buttonLoading : styles.button}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'PROCESSING...' : 'SHORTEN URL'}
          </button>
        </form>

        {/* Notifikasi Error (Muncul Hanya Saat Diperlukan) */}
        {status === 'error' && (
          <div style={styles.alertBox}>
            <span style={styles.alertIcon}>🚫</span>
            <div>
              <strong style={{display: 'block', marginBottom: '4px'}}>Access Denied</strong>
              <span style={{fontSize: '12px', opacity: 0.8}}>
                Public registration is currently closed. Only authorized IPs can create new links.
              </span>
            </div>
          </div>
        )}

      </div>
      
      {/* Footer Kecil */}
      <div style={styles.footer}>
        &copy; 2024 SecureLink System. v2.1.0
      </div>
    </div>
  );
}

// STYLING: Tema Gelap, Tajam (No Radius), Rapi
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#050505', // Hitam pekat
    color: '#ffffff',
    fontFamily: 'Courier New, Courier, monospace', // Font ala hacker/dev
    padding: '20px',
    boxSizing: 'border-box',
  },
  card: {
    width: '100%',
    maxWidth: '420px', // Membatasi lebar agar tidak melebar kemana-mana
    backgroundColor: '#111',
    border: '1px solid #333',
    padding: '40px 30px',
    display: 'flex',
    flexDirection: 'column',
    gap: '25px',
    boxShadow: '0 20px 50px rgba(0,0,0,0.5)', // Shadow biar elegan
  },
  header: {
    textAlign: 'center',
    borderBottom: '1px solid #222',
    paddingBottom: '20px',
  },
  title: {
    margin: 0,
    fontSize: '24px',
    fontWeight: '700',
    letterSpacing: '2px',
    color: '#fff',
  },
  subtitle: {
    margin: '8px 0 0 0',
    fontSize: '12px',
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    textAlign: 'left',
  },
  label: {
    fontSize: '12px',
    color: '#888',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '15px',
    backgroundColor: '#000',
    border: '1px solid #333',
    color: '#fff',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    transition: 'border-color 0.3s',
  },
  button: {
    width: '100%',
    padding: '16px',
    backgroundColor: '#fff', // Tombol Putih Kontras
    color: '#000',
    border: 'none',
    fontSize: '14px',
    fontWeight: '900',
    cursor: 'pointer',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    transition: 'background 0.3s',
  },
  buttonLoading: {
    width: '100%',
    padding: '16px',
    backgroundColor: '#333',
    color: '#888',
    border: 'none',
    fontSize: '14px',
    fontWeight: '900',
    cursor: 'not-allowed',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  alertBox: {
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    border: '1px solid #8B0000',
    padding: '15px',
    color: '#ff6b6b',
    fontSize: '13px',
    display: 'flex',
    alignItems: 'start',
    gap: '12px',
    textAlign: 'left',
    animation: 'fadeIn 0.3s ease-in',
  },
  alertIcon: {
    fontSize: '18px',
  },
  footer: {
    marginTop: '40px',
    color: '#333',
    fontSize: '10px',
    textTransform: 'uppercase',
    letterSpacing: '2px',
  },
};
