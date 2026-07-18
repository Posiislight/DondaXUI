import { useState, type FormEvent } from 'react';
import DondaxLayout from './DondaxLayout';
import { COLOURS } from './data';

export default function OrderPage() {
  const [colour, setColour] = useState(COLOURS[0]);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <DondaxLayout active="/order" navShowOrderCta={false}>
      <form onSubmit={onSubmit} className="dx-section" style={{ maxWidth: 1100, margin: '0 auto', padding: '56px 48px 96px' }}>
        <div className="dx-eyebrow" style={{ marginBottom: 14 }}>Order Request</div>
        <h1 className="dx-m-fs-32" style={{ font: '800 44px var(--dx-sora)', margin: '0 0 40px', letterSpacing: -0.5 }}>Place Order Request</h1>

        <div className="dx-m-cols dx-m-cols--g32" style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.9fr', gap: 40, alignItems: 'start' }}>
          {/* form fields */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <section>
              <h2 style={{ font: '700 18px var(--dx-sora)', margin: '0 0 18px' }}>Personal Information</h2>
              <div className="dx-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <input required placeholder="Full Name" className="dx-input" style={{ gridColumn: 'span 2' }} />
                <input required type="email" placeholder="Email" className="dx-input" />
                <input required placeholder="Phone Number" className="dx-input" />
              </div>
            </section>

            <section>
              <h2 style={{ font: '700 18px var(--dx-sora)', margin: '0 0 18px' }}>Colour</h2>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                {COLOURS.map((c) => {
                  const active = colour.key === c.key;
                  return (
                    <button
                      key={c.key}
                      type="button"
                      onClick={() => setColour(c)}
                      style={{
                        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10,
                        background: active ? 'oklch(80% 0.19 128 / .14)' : 'var(--dx-surface)',
                        border: `1.5px solid ${active ? 'var(--dx-accent)' : 'rgba(255,255,255,.14)'}`,
                        borderRadius: 999, padding: '10px 18px 10px 12px', color: '#fff', font: '700 13px var(--dx-manrope)',
                        transition: 'background .2s, border-color .2s',
                      }}
                    >
                      <span style={{ width: 18, height: 18, borderRadius: '50%', background: c.swatch, border: '1px solid rgba(255,255,255,.35)', flex: 'none' }} />
                      {c.name}
                    </button>
                  );
                })}
              </div>
            </section>

            <section>
              <h2 style={{ font: '700 18px var(--dx-sora)', margin: '0 0 18px' }}>Delivery Details</h2>
              <div className="dx-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <input required placeholder="Delivery Address" className="dx-input" style={{ gridColumn: 'span 2' }} />
                <input required placeholder="City" className="dx-input" />
                <input required placeholder="State" className="dx-input" />
              </div>
            </section>
          </div>

          {/* light summary card */}
          <aside
            className="dx-order-summary dx-card-light"
            style={{ borderRadius: 18, padding: 28, position: 'sticky', top: 24, overflow: 'visible' }}
          >
            <h2 style={{ font: '700 18px var(--dx-sora)', margin: '0 0 20px' }}>Order Summary</h2>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 24 }}>
              <span className="dx-studio" style={{ width: 72, height: 64, flex: 'none', borderRadius: 10 }}>
                <img src={colour.image} srcSet={colour.imageSet} sizes="72px" loading="lazy" decoding="async" alt="GN Model" />
              </span>
              <div>
                <div style={{ font: '700 15px var(--dx-sora)' }}>GN Model</div>
                <div style={{ font: '600 12px var(--dx-manrope)', color: 'var(--dx-light-muted)' }}>{colour.name}</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, font: '500 14px var(--dx-manrope)', color: 'oklch(40% 0.01 95)', borderTop: '1px solid rgba(0,0,0,.08)', paddingTop: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Product Price</span><span style={{ color: 'var(--dx-light-ink)', fontWeight: 700 }}>On request</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Delivery</span><span style={{ color: 'var(--dx-light-ink)', fontWeight: 700 }}>Free</span></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', font: '800 18px var(--dx-sora)', marginTop: 20, paddingTop: 20, borderTop: '1px solid rgba(0,0,0,.08)' }}>
              <span>Total</span><span style={{ color: 'var(--dx-accent-deep)' }}>Quote on request</span>
            </div>
            <button type="submit" className="dx-btn" style={{ display: 'flex', width: '100%', marginTop: 24, padding: 16 }}>
              {submitted ? 'Request Received ✓' : 'Place Order'}
            </button>
            {submitted && (
              <p style={{ font: '500 13px/1.5 var(--dx-manrope)', color: 'var(--dx-light-muted)', marginTop: 14, textAlign: 'center' }}>
                Thanks — our team will reach out with a quote shortly.
              </p>
            )}
          </aside>
        </div>
      </form>
    </DondaxLayout>
  );
}
