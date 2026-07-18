import { useState } from 'react';
import { Link } from 'react-router-dom';
import DondaxLayout from './DondaxLayout';
import { COLOURS, SPECS } from './data';

export default function ProductDetail() {
  const [selected, setSelected] = useState(COLOURS[0]);

  return (
    <DondaxLayout active="/products">
      <div className="dx-section" style={{ maxWidth: 1400, margin: '0 auto', padding: '48px 48px 96px' }}>
        <Link
          to="/products"
          style={{ font: '600 13px var(--dx-manrope)', color: 'var(--dx-text-faint)', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 32 }}
        >
          ← Back to Motors
        </Link>

        <div className="dx-m-cols dx-m-cols--g36" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 64, alignItems: 'start' }}>
          {/* gallery */}
          <div>
            <div className="dx-studio dx-m-pd-hero" style={{ borderRadius: 20, height: 480 }}>
              <img
                src={selected.image}
                srcSet={selected.imageSet}
                sizes="(max-width: 760px) 100vw, 720px"
                decoding="async"
                alt={`DondaX GN Model — ${selected.name}`}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginTop: 14 }}>
              {COLOURS.map((c) => (
                <button
                  key={c.key}
                  onClick={() => setSelected(c)}
                  aria-label={`View ${c.name}`}
                  className="dx-studio dx-m-thumb"
                  style={{
                    padding: 0,
                    cursor: 'pointer',
                    borderRadius: 12,
                    height: 120,
                    border: `2px solid ${selected.key === c.key ? 'var(--dx-accent)' : 'rgba(255,255,255,.1)'}`,
                    transition: 'border-color .25s',
                  }}
                >
                  <img src={c.image} srcSet={c.imageSet} sizes="220px" loading="lazy" decoding="async" alt={`GN Model ${c.name}`} style={{ pointerEvents: 'none' }} />
                </button>
              ))}
            </div>
          </div>

          {/* info */}
          <div>
            <div className="dx-eyebrow" style={{ marginBottom: 14 }}>GN Series</div>
            <h1 className="dx-m-fs-32" style={{ font: '800 44px var(--dx-sora)', margin: '0 0 16px' }}>GN Model</h1>
            <p style={{ font: '500 16px/1.7 var(--dx-manrope)', color: 'var(--dx-text-muted)', margin: '0 0 28px' }}>
              Built for the city. Smart connectivity, advanced lithium-ion battery technology, and a design that turns
              heads — the everyday electric motorcycle for African cities.
            </p>

            <div style={{ marginBottom: 32 }}>
              <div style={{ font: '600 12px var(--dx-manrope)', color: 'oklch(60% 0.015 95)', marginBottom: 12 }}>
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

            {/* light spec card */}
            <div
              className="dx-card-light"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', borderRadius: 16, boxShadow: '0 18px 44px -18px rgba(0,0,0,.6)', marginBottom: 32 }}
            >
              {SPECS.map((spec, i) => (
                <div
                  key={spec.label}
                  style={{
                    padding: '22px 26px',
                    borderRight: i % 2 === 0 ? '1px solid rgba(0,0,0,.08)' : undefined,
                    borderBottom: i < 2 ? '1px solid rgba(0,0,0,.08)' : undefined,
                  }}
                >
                  <div style={{ font: '600 11px var(--dx-manrope)', letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--dx-light-muted)' }}>{spec.label}</div>
                  <div style={{ font: '800 26px var(--dx-sora)', color: 'var(--dx-accent-deep)', marginTop: 4 }}>{spec.value}</div>
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
