export default function Home() {
  return (
    <main style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#111',
      color: '#fff'
    }}>
      <h1>Shortener Ready 🚀</h1>
      <p>Gunakan format: domain.com/[kode]</p>
    </main>
  );
}
