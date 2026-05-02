import { ImageResponse } from 'next/og';

export const alt = 'United Global Consulting — Study abroad without middlemen';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background:
            'linear-gradient(135deg, #061a2e 0%, #0a2540 60%, #1e3a5f 100%)',
          color: '#ffffff',
          fontFamily: 'system-ui, sans-serif',
          padding: '64px 72px',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(800px circle at 85% 20%, rgba(0, 212, 170, 0.25), transparent 55%), radial-gradient(700px circle at 10% 100%, rgba(255, 184, 0, 0.18), transparent 60%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            position: 'relative',
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#00d4aa',
              borderRadius: 16,
              fontSize: 30,
              fontWeight: 800,
              color: '#031612',
              letterSpacing: '-0.04em',
            }}
          >
            UG
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: '-0.01em',
            }}
          >
            United Global Consulting
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flex: 1,
            position: 'relative',
          }}
        >
          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              maxWidth: 1000,
            }}
          >
            Study abroad without middlemen or false promises
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 30,
              color: '#a8c4e0',
              maxWidth: 900,
              lineHeight: 1.3,
            }}
          >
            Korea · Singapore · USA · Europe · Japan — admission, scholarships, visa
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 28,
            position: 'relative',
            fontSize: 22,
            color: '#cbd5e1',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                background: '#00d4aa',
                display: 'flex',
              }}
            />
            unitedglobal.uz
          </div>
          <div style={{ color: '#475569' }}>·</div>
          <div>10 countries · partner universities</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
