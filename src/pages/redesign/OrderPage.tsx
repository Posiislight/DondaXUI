import { useState, type FormEvent } from 'react';
import DondaxLayout from './DondaxLayout';
import { COLOURS } from './data';

export default function OrderPage() {
  const [colour, setColour] = useState(COLOURS[0]);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  /* controlled form fields */
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    /* split full name into first / last for the API */
    const nameParts = fullName.trim().split(/\s+/);
    const first_name = nameParts[0] || '';
    const last_name = nameParts.slice(1).join(' ') || '';

    try {
      const res = await fetch('/api/sendemail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name,
          last_name,
          email,
          phone,
          address,
          city,
          zip_code: state, // re-using state field for region/state
          motorcycle_model: 'GN Model',
          color: colour.name,
          quantity: 1,
          frequency: 'One-time',
          additional_features: [],
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({ error: 'Request failed' }));
        throw new Error(body.error || `Server responded with ${res.status}`);
      }

      setStatus('sent');
    } catch (err: any) {
      console.error('Order submission failed:', err);
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
      setStatus('error');
    }
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
                <input
                  required
                  placeholder="Full Name"
                  className="dx-input"
                  style={{ gridColumn: 'span 2' }}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                <input
                  required
                  type="email"
                  placeholder="Email"
                  className="dx-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  required
                  placeholder="Phone Number"
                  className="dx-input"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
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
                <input
                  required
                  placeholder="Delivery Address"
                  className="dx-input"
                  style={{ gridColumn: 'span 2' }}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <input
                  required
                  placeholder="City"
                  className="dx-input"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <input
                  required
                  placeholder="State"
                  className="dx-input"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
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
            <button
              type="submit"
              className="dx-btn"
              disabled={status === 'sending' || status === 'sent'}
              style={{
                display: 'flex', width: '100%', marginTop: 24, padding: 16,
                opacity: status === 'sending' ? 0.7 : 1,
                cursor: status === 'sent' ? 'default' : undefined,
              }}
            >
              {status === 'sending' && 'Sending…'}
              {status === 'sent' && 'Request Received ✓'}
              {(status === 'idle' || status === 'error') && 'Place Order'}
            </button>
            {status === 'sent' && (
              <p style={{ font: '500 13px/1.5 var(--dx-manrope)', color: 'var(--dx-light-muted)', marginTop: 14, textAlign: 'center' }}>
                Thanks — our team will reach out with a quote shortly.
              </p>
            )}
            {status === 'error' && (
              <p style={{ font: '500 13px/1.5 var(--dx-manrope)', color: '#e55', marginTop: 14, textAlign: 'center' }}>
                {errorMsg}
              </p>
            )}
          </aside>
        </div>
      </form>
    </DondaxLayout>
  );
}
