import { Link } from 'react-router-dom';
import DondaxLayout from './DondaxLayout';

/** Prerendered to dist/404.html, which Vercel serves (with a 404 status) for unknown URLs. */
export default function NotFound() {
  return (
    <DondaxLayout>
      <div className="dx-section" style={{ maxWidth: 760, margin: '0 auto', padding: '120px 48px 140px', textAlign: 'center' }}>
        <div className="dx-eyebrow" style={{ marginBottom: 16 }}>404</div>
        <h1 className="dx-m-fs-32" style={{ font: '800 48px var(--dx-sora)', margin: '0 0 18px', letterSpacing: -1 }}>
          Page not found
        </h1>
        <p style={{ font: '500 17px/1.7 var(--dx-manrope)', color: 'var(--dx-text-muted)', margin: '0 0 36px' }}>
          The page you're looking for doesn't exist or has moved.
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="dx-btn">Back to Home</Link>
          <Link to="/products/gn-model" className="dx-btn-outline">Explore the GN Model</Link>
        </div>
      </div>
    </DondaxLayout>
  );
}
