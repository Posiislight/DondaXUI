import { Link } from 'react-router-dom';
import DondaxLayout from './DondaxLayout';
import Reveal from './Reveal';
import { ASSET, COLOURS } from './data';

const MODELS = [
  {
    slug: 'gn-model',
    name: 'GN Model',
    image: ASSET('gn-urban.jpg'),
    blurb: 'Perfect for city commuting with smart connectivity features.',
    specs: ['100km range', '120km/h', '2-3h charge'],
  },
];

export default function Products() {
  return (
    <DondaxLayout active="/products">
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '64px 56px 96px' }} className="dx-section">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24, marginBottom: 40 }}>
          <Reveal>
            <div className="dx-eyebrow" style={{ marginBottom: 14 }}>Our Lineup</div>
            <h1 style={{ font: '800 clamp(32px,6vw,44px) var(--dx-sora)' }}>DondaX Motors</h1>
          </Reveal>
          <Reveal delay={0.1} style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <span style={{ background: 'var(--dx-accent)', color: '#fff', font: '700 13px var(--dx-manrope)', padding: '10px 20px', borderRadius: 999 }}>All</span>
            <span style={{ border: '1px solid var(--dx-border-strong)', color: 'oklch(78% 0.01 95)', font: '600 13px var(--dx-manrope)', padding: '10px 20px', borderRadius: 999 }}>Urban</span>
          </Reveal>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(340px,100%),1fr))', gap: 28 }}>
          {MODELS.map((m, i) => (
            <Reveal
              key={m.slug}
              delay={i * 0.1}
              className="dx-card dx-colour-card"
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <img src={m.image} alt={m.name} style={{ width: '100%', height: 240, objectFit: 'cover' }} />
              <div style={{ padding: 26, display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ font: '700 20px var(--dx-sora)', margin: '0 0 8px' }}>{m.name}</h3>
                <p style={{ font: '500 14px/1.6 var(--dx-manrope)', color: 'var(--dx-text-muted)', margin: '0 0 18px', flex: 1 }}>{m.blurb}</p>
                <div style={{ display: 'flex', gap: 16, font: '600 12px var(--dx-manrope)', color: 'var(--dx-text-muted)', marginBottom: 16, flexWrap: 'wrap' }}>
                  {m.specs.map((s, idx) => (
                    <span key={s} style={{ display: 'flex', gap: 16 }}>
                      {s}
                      {idx < m.specs.length - 1 && <span aria-hidden>·</span>}
                    </span>
                  ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                  <span style={{ font: '600 12px var(--dx-manrope)', color: 'var(--dx-text-muted)' }}>Colours</span>
                  {COLOURS.map((c) => (
                    <span
                      key={c.key}
                      title={c.name}
                      style={{ width: 16, height: 16, borderRadius: '50%', background: c.swatch, border: '1px solid rgba(255,255,255,.3)' }}
                    />
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <Link to="/order" className="dx-btn dx-btn--sm" style={{ flex: 1 }}>Order</Link>
                  <Link to={`/products/${m.slug}`} className="dx-btn-outline dx-btn-outline--sm" style={{ flex: 1 }}>Details</Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </DondaxLayout>
  );
}
