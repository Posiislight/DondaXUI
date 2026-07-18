import { Link } from 'react-router-dom';
import DondaxLayout, { AutoplayVideo } from './DondaxLayout';
import Reveal from './Reveal';
import CountUp from './CountUp';
import { ASSET, SRCSET, COLOURS } from './data';

function Hero() {
  return (
    <div className="dx-m-hero" style={{ position: 'relative', height: 640, overflow: 'hidden' }}>
      <AutoplayVideo
        src={ASSET('hero-video.mp4')}
        poster={ASSET('hero-poster.webp')}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg,rgba(8,8,7,.55) 0%,rgba(8,8,7,.15) 40%,rgba(8,8,7,.78) 100%)',
          pointerEvents: 'none',
        }}
      />
      <div className="dx-m-hero-text" style={{ position: 'absolute', left: 48, right: 48, bottom: 120 }}>
        <Reveal>
          <div className="dx-eyebrow" style={{ marginBottom: 16 }}>
            Electric Motorcycles · Designed in Nigeria
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="dx-m-fs-38" style={{ font: '800 clamp(44px,5.5vw,72px)/0.98 var(--dx-sora)', margin: '0 0 20px', maxWidth: 760, letterSpacing: -1.5 }}>
            Ride electric.
            <br />
            Ride DondaX.
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
            <Link to="/products/gn-model" className="dx-btn">Explore the GN Model</Link>
            <Link to="/order" className="dx-btn-outline">Place Order Request</Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

const STATS = [
  { label: 'Range per charge', to: 100, suffix: ' km' },
  { label: 'Top speed', to: 120, suffix: ' km/h' },
  { label: 'Fast charge', to: 3, prefix: '2–', suffix: ' h' },
  { label: 'Colourways', to: 3 },
];

function FloatingStats() {
  return (
    <div className="dx-m-stats-wrap" style={{ position: 'relative', margin: '-72px 48px 0', zIndex: 2 }}>
      <div
        className="dx-m-stats dx-card-light"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', boxShadow: '0 24px 60px -20px rgba(0,0,0,.7)' }}
      >
        {STATS.map((s, i) => (
          <div key={s.label} style={{ padding: '32px 36px', borderRight: i < STATS.length - 1 ? '1px solid rgba(0,0,0,.08)' : undefined }}>
            <div style={{ font: '600 12px var(--dx-manrope)', letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--dx-light-muted)' }}>
              {s.label}
            </div>
            <CountUp
              to={s.to}
              prefix={s.prefix}
              suffix={s.suffix}
              className="dx-stat__value"
              style={{ display: 'block', font: '800 40px var(--dx-sora)', color: 'var(--dx-accent-deep)', marginTop: 6 }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function Mission() {
  return (
    <div id="about" style={{ position: 'relative', marginTop: 96, overflow: 'hidden', scrollMarginTop: 20 }}>
      <img
        src={ASSET('gn-urban.webp')}
        srcSet={SRCSET('gn-urban')}
        sizes="100vw"
        loading="lazy"
        decoding="async"
        alt="GN Model"
        style={{ width: '100%', height: 520, objectFit: 'cover', objectPosition: 'center 60%', filter: 'brightness(.45) saturate(1.05)' }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,rgba(8,8,7,.85) 0%,rgba(8,8,7,.35) 60%,rgba(8,8,7,.1) 100%)' }} />
      <div className="dx-m-overlay-text" style={{ position: 'absolute', top: '50%', left: 48, transform: 'translateY(-50%)', maxWidth: 560 }}>
        <Reveal>
          <div className="dx-eyebrow" style={{ marginBottom: 14 }}>Our Mission</div>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="dx-m-fs-28" style={{ font: '800 38px/1.15 var(--dx-sora)', margin: '0 0 18px', letterSpacing: -0.5 }}>
            Movement that empowers, not just moves.
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p style={{ font: '500 16px/1.8 var(--dx-manrope)', color: 'var(--dx-text-soft)' }}>
            We are a proudly Nigerian electric mobility company cutting transportation costs, cutting emissions, and
            creating new economic opportunity — one ride at a time.
          </p>
        </Reveal>
      </div>
    </div>
  );
}

function Colours() {
  return (
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
          <Reveal key={c.key} delay={i * 0.1}>
            <Link to="/products/gn-model" className="dx-colour-card" style={{ display: 'block', color: 'inherit' }}>
              <img src={c.image} srcSet={c.imageSet} sizes="(max-width: 760px) 100vw, 440px" loading="lazy" decoding="async" alt={`GN Model — ${c.name}`} style={{ width: '100%', height: 280, objectFit: 'cover' }} />
              <span style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ width: 18, height: 18, borderRadius: '50%', background: c.swatch, flex: 'none' }} />
                  <span style={{ font: '700 16px var(--dx-sora)' }}>{c.name}</span>
                </span>
                <span style={{ font: '600 13px var(--dx-manrope)', color: 'var(--dx-light-muted)' }}>GN Model</span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

const WHY = [
  { title: 'Lithium-ion power', body: 'Advanced battery technology with 2–3 hour fast charging at home or work.' },
  { title: 'Smart connectivity', body: "IoT integration keeps you connected to your bike's health and location." },
  { title: 'Lower running costs', body: 'No fuel, minimal maintenance — more of every fare stays in your pocket.' },
  { title: 'Local talent', body: 'Designed in Nigeria, engineered for the streets and communities we serve.' },
];

function WhyDondax() {
  return (
    <div className="dx-section" style={{ padding: '88px 48px' }}>
      <Reveal>
        <h2 className="dx-m-fs-28" style={{ font: '800 38px var(--dx-sora)', margin: '0 0 40px', letterSpacing: -0.5 }}>
          Built for African roads
        </h2>
      </Reveal>
      <div className="dx-m-cols" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 22 }}>
        {WHY.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.08} style={{ borderTop: '2px solid var(--dx-accent)', paddingTop: 20 }}>
            <div style={{ font: '700 17px var(--dx-sora)', marginBottom: 8 }}>{item.title}</div>
            <div style={{ font: '500 14px/1.7 var(--dx-manrope)', color: 'oklch(68% 0.015 95)' }}>{item.body}</div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

const SOCIALS = [
  {
    label: 'Instagram',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9.2" />
        <path d="M13.6 21.4v-7.2h2.3l.4-2.8h-2.7V9.5c0-.8.2-1.4 1.4-1.4h1.5V5.6c-.3 0-1.1-.1-2.1-.1-2.1 0-3.5 1.3-3.5 3.6v2.3H8.6v2.8h2.3v7.2" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M14 4v9.6a3.4 3.4 0 1 1-2.6-3.3" />
        <path d="M14 4c.3 2.2 1.9 3.8 4 4.1" />
      </svg>
    ),
  },
];

function Contact() {
  return (
    <div id="contact" className="dx-section" style={{ padding: '8px 48px 88px', scrollMarginTop: 20 }}>
      <Reveal style={{ marginBottom: 40 }}>
        <div className="dx-eyebrow" style={{ marginBottom: 12 }}>Get in Touch</div>
        <h2 className="dx-m-fs-28" style={{ font: '800 38px var(--dx-sora)', letterSpacing: -0.5 }}>Contact us</h2>
      </Reveal>

      <div className="dx-m-cols" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 24 }}>
        <Reveal className="dx-card" style={{ padding: 28 }}>
          <h3 style={{ font: '700 19px var(--dx-sora)', margin: '0 0 18px' }}>Our Location</h3>
          <div style={{ position: 'relative', width: '100%', height: 340, borderRadius: 14, overflow: 'hidden', border: '1px solid var(--dx-border)' }}>
            <iframe
              title="DondaX HQ — Gwarinpa, Abuja"
              src="https://www.openstreetmap.org/export/embed.html?bbox=7.385%2C9.085%2C7.455%2C9.145&layer=mapnik&marker=9.111%2C7.417"
              style={{ width: '100%', height: '100%', border: 0, filter: 'invert(0.9) hue-rotate(180deg) brightness(0.95) contrast(0.9)' }}
              loading="lazy"
            />
          </div>
          <a
            href="https://www.openstreetmap.org/?mlat=9.111&mlon=7.417#map=14/9.111/7.417"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-block', marginTop: 14, font: '600 13px var(--dx-manrope)' }}
          >
            Gwarinpa, Abuja — View larger map →
          </a>
        </Reveal>

        <Reveal delay={0.12} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            { icon: '✉', label: 'Email', lines: ['care@dondaxlimited.com', 'enquiry@dondaxlimited.com'] },
            { icon: '☎', label: 'Phone', lines: ['+86 132 6535 5246', '+234 803 7789 733'] },
          ].map((item) => (
            <div
              key={item.label}
              className="dx-card dx-contact-card"
              style={{ borderRadius: 16, padding: 24, display: 'flex', alignItems: 'center', gap: 18 }}
            >
              <span
                style={{
                  width: 44, height: 44, flex: 'none', borderRadius: 12,
                  background: 'oklch(80% 0.19 128 / .12)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', fontSize: 20,
                }}
              >
                {item.icon}
              </span>
              <div>
                <div style={{ font: '600 12px var(--dx-manrope)', color: 'oklch(60% 0.015 95)', marginBottom: 4 }}>{item.label}</div>
                {item.lines.map((l) => (
                  <div key={l} style={{ font: '600 15px var(--dx-manrope)', color: '#fff' }}>{l}</div>
                ))}
              </div>
            </div>
          ))}
          <div style={{ display: 'flex', gap: 12, marginTop: 4, flexWrap: 'wrap' }}>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className="dx-social"
                style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
                  background: 'var(--dx-surface)', border: '1px solid rgba(255,255,255,.12)',
                  borderRadius: 12, padding: 14, font: '700 13px var(--dx-manrope)', color: '#fff',
                }}
              >
                {s.icon}
                {s.label}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function CtaBanner() {
  return (
    <Reveal className="dx-m-cta" style={{ textAlign: 'center', padding: '0 48px 80px' }}>
      <h3 className="dx-m-fs-26" style={{ font: '800 36px var(--dx-sora)', margin: '0 0 28px' }}>
        Ready to ride <span className="dx-accent">electric</span>?
      </h3>
      <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/order" className="dx-btn">Place Order Request</Link>
        <a href="#contact" className="dx-btn-outline">Contact Us</a>
      </div>
    </Reveal>
  );
}

export default function Home() {
  return (
    <DondaxLayout active="/">
      <Hero />
      <FloatingStats />
      <Mission />
      <Colours />
      <WhyDondax />
      <Contact />
      <CtaBanner />
    </DondaxLayout>
  );
}
