import { useState } from 'react';
import { Link } from 'react-router-dom';
import DondaxLayout from './DondaxLayout';
import { COLOURS, SPECS } from './data';

export default function ProductDetail() {
  const [selected, setSelected] = useState(COLOURS[0]);

  return (
    <DondaxLayout active="/products">
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '48px 56px 96px' }} className="dx-section">
        <Link
          to="/products"
          style={{ font: '600 13px var(--dx-manrope)', color: 'var(--dx-text-muted)', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 32 }}
        >
          ← Back to Motors
        </Link>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 64, alignItems: 'start' }}>
          {/* gallery */}
          <div>
            <img
              src={selected.image}
              alt={`DondaX GN Model — ${selected.name}`}
              style={{ width: '100%', height: 480, objectFit: 'cover', borderRadius: 20, border: '1px solid var(--dx-border)' }}
            />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginTop: 14 }}>
              {COLOURS.map((c) => (
                <button
                  key={c.key}
                  onClick={() => setSelected(c)}
                  aria-label={`View ${c.name}`}
                  style={{
                    padding: 0, cursor: 'pointer', background: 'none', borderRadius: 12,
                    border: `2px solid ${selected.key === c.key ? 'var(--dx-accent)' : 'rgba(255,255,255,.1)'}`,
                    overflow: 'hidden', transition: 'border-color .25s',
                  }}
                >
                  <img src={c.image} alt={`GN Model ${c.name}`} style={{ width: '100%', height: 120, objectFit: 'cover', display: 'block' }} />
                </button>
              ))}
            </div>
          </div>

          {/* info */}
          <div>
            <div className="dx-eyebrow" style={{ marginBottom: 14 }}>GN Series</div>
            <h1 style={{ font: '800 44px var(--dx-sora)', margin: '0 0 16px' }}>GN Model</h1>
            <p style={{ font: '500 16px/1.7 var(--dx-manrope)', color: 'var(--dx-text-muted)', margin: '0 0 28px' }}>
              Built for the city. Smart connectivity, advanced lithium-ion battery technology, and a design that turns
              heads — the everyday electric motorcycle for African cities.
            </p>

            <div style={{ marginBottom: 32 }}>
              <div style={{ font: '600 12px var(--dx-manrope)', color: 'var(--dx-text-muted)', marginBottom: 12 }}>
                Colour — <span style={{ color: '#fff', fontWeight: 700 }}>{selected.name}</span>
              </div>
              <div style={{ display: 'flex', gap: 14 }}>
                {COLOURS.map((c) => (
                  <button
                    key={c.key}
                    onClick={() => setSelected(c)}
                    title={c.name}
                    aria-label={c.name}
                    style={{
                      cursor: 'pointer', width: 34, height: 34, borderRadius: '50%', background: c.swatch, padding: 0,
                      border: `2px solid ${selected.key === c.key ? '#fff' : 'rgba(255,255,255,.25)'}`,
                      outlineOffset: 2,
                    }}
                  />
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16, marginBottom: 32 }}>
              {SPECS.map((spec) => (
                <div key={spec.label} style={{ background: 'var(--dx-surface)', border: '1px solid var(--dx-border)', borderRadius: 12, padding: 18 }}>
                  <div style={{ font: '600 12px var(--dx-manrope)', color: 'var(--dx-text-muted)', marginBottom: 6 }}>{spec.label}</div>
                  <div style={{ font: '700 18px var(--dx-sora)' }}>{spec.value}</div>
                </div>
              ))}
            </div>

            <Link to="/order" className="dx-btn" style={{ display: 'flex', width: '100%', padding: 17 }}>
              Place Order Request
            </Link>
          </div>
        </div>
      </div>
    </DondaxLayout>
  );
}
