import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0a2540 0%, #1e3a5f 100%)',
          color: '#ffffff',
          fontFamily: 'system-ui, sans-serif',
          borderRadius: 36,
        }}
      >
        <div
          style={{
            fontSize: 84,
            fontWeight: 800,
            color: '#00d4aa',
            letterSpacing: '-0.05em',
            lineHeight: 1,
          }}
        >
          UG
        </div>
        <div
          style={{
            marginTop: 8,
            fontSize: 18,
            fontWeight: 600,
            color: '#ffffff',
            opacity: 0.85,
            letterSpacing: '0.05em',
          }}
        >
          GLOBAL
        </div>
      </div>
    ),
    { ...size }
  );
}
