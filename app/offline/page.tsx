export const metadata = {
  title: 'Offline — United Global Consulting',
  robots: { index: false, follow: false },
};

export default function OfflinePage() {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily:
            'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          background:
            'radial-gradient(900px circle at 20% 10%, rgba(0,212,170,0.18), transparent 50%), linear-gradient(180deg, #0a2540 0%, #061a2e 100%)',
          color: '#ffffff',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 520 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: '#00d4aa',
              color: '#031612',
              fontSize: 32,
              fontWeight: 800,
              letterSpacing: '-0.04em',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
            }}
          >
            UG
          </div>
          <h1
            style={{
              fontSize: 32,
              margin: '0 0 12px',
              fontWeight: 800,
              letterSpacing: '-0.02em',
            }}
          >
            You are offline
          </h1>
          <p style={{ color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
            Check your internet connection. United Global Consulting will be
            available again as soon as you are back online.
          </p>
          <p style={{ marginTop: 28 }}>
            {/* Full reload is intentional — SPA <Link> wouldn't trigger a fresh network attempt. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/"
              style={{
                display: 'inline-block',
                background: '#00d4aa',
                color: '#031612',
                padding: '12px 22px',
                borderRadius: 12,
                textDecoration: 'none',
                fontWeight: 700,
              }}
            >
              Try again
            </a>
          </p>
        </div>
      </body>
    </html>
  );
}
