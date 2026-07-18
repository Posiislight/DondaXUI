import { Link } from 'react-router-dom';
import DondaxLayout from './DondaxLayout';
import Reveal from './Reveal';
import CountUp from './CountUp';
import { ASSET, SRCSET, COLOURS } from './data';

const SPEC_BAND = [
  { label: 'Range per charge', to: 100, suffix: ' km', unit: 'km' },
  { label: 'Top speed', to: 120, suffix: ' km/h', unit: 'km/h' },
  { label: 'Fast charge time', to: 3, prefix: '2–', suffix: ' h', unit: 'h' },
];

function SpecBand() {
  return (
    <div
      className="dx-m-specband"
      style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', borderTop: '1px solid var(--dx-border)', borderBottom: '1px solid var(--dx-border)' }}
    >
      {SPEC_BAND.map((s, i) => (
        <div key={s.label} style={{ padding: '40px 48px', borderRight: i < SPEC_BAND.length - 1 ? '1px solid var(--dx-border)' : undefined }}>
          <div className="dx-spec__value" style={{ font: '800 48px var(--dx-sora)', color: 'var(--dx-accent)', letterSpacing: -1 }}>
            <CountUp to={s.to} prefix={s.prefix} />
            <span style={{ font: '700 22px var(--dx-sora)', color: 'oklch(70% 0.015 95)' }}> {s.unit}</span>
          </div>
          <div style={{ font: '600 12px var(--dx-manrope)', letterSpacing: 1.5, textTransform: 'uppercase', color: 'oklch(62% 0.015 95)', marginTop: 8 }}>
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Products() {
  return (
    <DondaxLayout active="/products">
      {/* header */}
      <div className="dx-section" style={{ padding: '72px 48px 64px' }}>
        <Reveal>
          <div className="dx-eyebrow" style={{ marginBottom: 16 }}>Our Lineup</div>
          <h1 className="dx-m-fs-36" style={{ font: '800 56px var(--dx-sora)', margin: '0 0 18px', letterSpacing: -1 }}>The GN Model</h1>
          <p style={{ font: '500 17px/1.7 var(--dx-manrope)', color: 'oklch(72% 0.015 95)', maxWidth: 540 }}>
            One motorcycle, engineered for African cities — available in three colourways, each with the same
            performance underneath.
          </p>
        </Reveal>
      </div>

      <SpecBand />

      {/* colourways: light studio band */}
      <div className="dx-band-light dx-section" style={{ padding: '88px 48px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20, marginBottom: 44 }}>
          <div>
            <div className="dx-eyebrow dx-eyebrow--deep" style={{ marginBottom: 12 }}>One model · Three colours</div>
            <h2 className="dx-m-fs-28" style={{ font: '800 42px var(--dx-sora)', letterSpacing: -0.5 }}>Pick your colour</h2>
          </div>
          <Link
            to="/products/gn-model"
            style={{ font: '700 14px var(--dx-manrope)', color: 'oklch(25% 0.01 95)', borderBottom: '2px solid var(--dx-accent)', paddingBottom: 3 }}
          >
            View full specifications →
          </Link>
        </div>
        <div className="dx-m-cols" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
          {COLOURS.map((c, i) => (
            <Reveal key={c.key} delay={i * 0.1} className="dx-colour-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <img src={c.image} srcSet={c.imageSet} sizes="(max-width: 760px) 100vw, 440px" loading="lazy" decoding="async" alt={`GN Model — ${c.name}`} style={{ width: '100%', height: 280, objectFit: 'cover' }} />
              <div style={{ padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ width: 18, height: 18, borderRadius: '50%', background: c.swatch, flex: 'none' }} />
                    <span style={{ font: '700 16px var(--dx-sora)' }}>{c.name}</span>
                  </span>
                  <span style={{ font: '600 13px var(--dx-manrope)', color: 'var(--dx-light-muted)' }}>GN Model</span>
                </div>
                <div style={{ display: 'flex', gap: 10, marginTop: 'auto' }}>
                  <Link
                    to="/order"
                    style={{ flex: 1, textAlign: 'center', background: 'var(--dx-accent)', color: 'var(--dx-accent-ink)', font: '700 13px var(--dx-manrope)', padding: 12, borderRadius: 999 }}
                  >
                    Order
                  </Link>
                  <Link
                    to="/products/gn-model"
                    style={{ flex: 1, textAlign: 'center', border: '1px solid rgba(0,0,0,.18)', color: 'var(--dx-light-ink)', font: '700 13px var(--dx-manrope)', padding: 12, borderRadius: 999 }}
                  >
                    Details
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* lifestyle strip */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <img
          src={ASSET('gn-urban.webp')}
          srcSet={SRCSET('gn-urban')}
          sizes="100vw"
          loading="lazy"
          decoding="async"
          alt="GN Model on the street"
          style={{ width: '100%', height: 420, objectFit: 'cover', objectPosition: 'center 55%', filter: 'brightness(.45) saturate(1.05)' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,rgba(8,8,7,.85) 0%,rgba(8,8,7,.35) 60%,rgba(8,8,7,.1) 100%)' }} />
        <div className="dx-m-overlay-text" style={{ position: 'absolute', top: '50%', left: 48, transform: 'translateY(-50%)', maxWidth: 520 }}>
          <div className="dx-eyebrow" style={{ marginBottom: 14 }}>Built for the city</div>
          <h2 className="dx-m-fs-28" style={{ font: '800 36px/1.15 var(--dx-sora)', margin: '0 0 22px', letterSpacing: -0.5 }}>
            Smart connectivity. Instant torque. Zero fuel.
          </h2>
          <Link to="/order" className="dx-btn">Place Order Request</Link>
        </div>
      </div>
    </DondaxLayout>
  );
}
