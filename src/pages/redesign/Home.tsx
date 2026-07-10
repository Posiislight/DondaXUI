import { Link } from 'react-router-dom';
import DondaxLayout, { DondaxNav, AutoplayVideo } from './DondaxLayout';
import Reveal from './Reveal';
import { ASSET, SRCSET, STAT_STRIP, COLOURS } from './data';

const SECTION = { maxWidth: 1400, margin: '0 auto' } as const;

function HeroStreaks() {
  const streaks: Array<[number, number, number, number, number]> = [
    // top%, width%, height, duration, delay
    [22, 42, 2, 3.4, 0], [44, 36, 1, 4.6, 1.1], [63, 48, 2, 4, 2.2], [78, 30, 1, 5.2, 0.6],
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }} aria-hidden>
      {streaks.map(([top, width, h, dur, delay], i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: `${top}%`,
            left: '-42%',
            width: `${width}%`,
            height: h,
            background: 'linear-gradient(90deg,transparent,oklch(85% 0.19 128 / .7),transparent)',
            filter: h > 1 ? 'blur(.5px)' : undefined,
            animation: `dx-streak ${dur}s linear infinite ${delay}s`,
          }}
        />
      ))}
    </div>
  );
}

function Hero() {
  return (
    <div style={{ position: 'relative', height: '88vh', minHeight: 600, overflow: 'hidden' }}>
      <AutoplayVideo
        src={ASSET('hero-video.mp4')}
        poster={ASSET('hero-poster.webp')}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <HeroStreaks />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg,rgba(9,9,8,.62) 0%,rgba(9,9,8,.32) 32%,rgba(9,9,8,.62) 62%,rgba(9,9,8,.98) 100%)',
          pointerEvents: 'none',
        }}
      />
      <div style={{ position: 'relative', zIndex: 3 }}>
        <DondaxNav active="/" />
      </div>

      <div className="dx-section" style={{ position: 'absolute', bottom: 64, left: 0, right: 0, padding: '0 56px', zIndex: 2 }}>
        <Reveal>
          <div className="dx-eyebrow" style={{ marginBottom: 16 }}>
            Electric Motorcycles · Designed in Nigeria
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 style={{ font: '800 clamp(40px,6vw,76px)/0.98 var(--dx-sora)', margin: '0 0 22px', maxWidth: 900, letterSpacing: -1 }}>
            Ride electric.
            <br />
            Ride DondaX.
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p style={{ font: '500 17px/1.6 var(--dx-manrope)', color: 'var(--dx-text-soft)', maxWidth: 520, margin: '0 0 32px' }}>
            Cutting-edge electric motorcycles engineered for the future of urban mobility across Africa.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <Link to="/products" className="dx-btn">Explore Motorcycles</Link>
            <Link to="/order" className="dx-btn-outline">Place Order Request</Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function StatStrip() {
  return (
    <div
      className="dx-stats"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3,1fr)',
        borderBottom: '1px solid var(--dx-border)',
        ...SECTION,
        background: 'oklch(11% 0.004 95 / .6)',
        backdropFilter: 'blur(6px)',
      }}
    >
      {STAT_STRIP.map((s, i) => (
        <Reveal
          key={s.label}
          delay={i * 0.1}
          className="dx-stat"
          style={{
            padding: '36px 56px',
            borderRight: i < STAT_STRIP.length - 1 ? '1px solid var(--dx-border)' : undefined,
          }}
        >
          <div className="dx-stat__value" style={{ font: '800 40px var(--dx-sora)', color: 'var(--dx-accent)' }}>{s.value}</div>
          <div style={{ font: '600 13px var(--dx-manrope)', color: 'var(--dx-text-muted)', marginTop: 6 }}>{s.label}</div>
        </Reveal>
      ))}
    </div>
  );
}

function FeaturedModel() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(min(320px,100%),1fr))',
        gap: 64,
        padding: '96px 56px',
        alignItems: 'center',
        ...SECTION,
      }}
      className="dx-section dx-grid"
    >
      <Reveal className="dx-media">
        <img src={ASSET('gn-urban.webp')} srcSet={SRCSET('gn-urban')} sizes="(max-width: 720px) 100vw, 640px" loading="lazy" decoding="async" alt="DondaX GN Model" style={{ width: '100%', height: 'clamp(240px,60vw,420px)', objectFit: 'cover' }} />
        <div className="dx-shine" />
      </Reveal>
      <Reveal delay={0.12}>
        <div className="dx-eyebrow" style={{ marginBottom: 14 }}>Featured Model</div>
        <h2 style={{ font: '700 40px var(--dx-sora)', margin: '0 0 16px' }}>GN Model</h2>
        <p style={{ font: '500 16px/1.7 var(--dx-manrope)', color: 'var(--dx-text-muted)', margin: '0 0 32px', maxWidth: 440 }}>
          Built for the city. Smart connectivity, advanced lithium-ion battery technology, and a design that turns heads.
        </p>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <Link to="/order" className="dx-btn dx-btn--sm">Order Now</Link>
          <Link to="/products/gn-model" className="dx-btn-outline dx-btn-outline--sm">View Details</Link>
        </div>
      </Reveal>
    </div>
  );
}

function Colours() {
  return (
    <div style={{ ...SECTION, padding: '0 56px 40px' }} className="dx-section">
      <Reveal style={{ textAlign: 'center', marginBottom: 44 }}>
        <div className="dx-eyebrow" style={{ marginBottom: 14 }}>One Model · Three Colours</div>
        <h2 style={{ font: '800 clamp(30px,3.6vw,44px) var(--dx-sora)' }}>
          Pick your <span className="dx-accent">colour</span>
        </h2>
      </Reveal>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(280px,100%),1fr))', gap: 24 }}>
        {COLOURS.map((c, i) => (
          <Reveal key={c.key} delay={i * 0.1} className="dx-card dx-colour-card">
            <img src={c.image} srcSet={c.imageSet} sizes="(max-width: 720px) 100vw, 440px" loading="lazy" decoding="async" alt={`GN Model in ${c.name}`} style={{ width: '100%', height: 250, objectFit: 'cover' }} />
            <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <span
                style={{
                  width: 18, height: 18, borderRadius: '50%', background: c.swatch,
                  border: '1px solid rgba(255,255,255,.3)', flex: 'none',
                }}
              />
              <span style={{ font: '700 16px var(--dx-sora)' }}>{c.name}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function About() {
  const buildPoints = [
    'Advanced lithium-ion battery technology',
    'Smart connectivity and IoT integration',
    'Sustainable manufacturing processes',
    'Local talent and innovation',
  ];
  return (
    <div id="about" style={{ ...SECTION, padding: '80px 56px', scrollMarginTop: 20 }} className="dx-section">
      <Reveal style={{ textAlign: 'center', maxWidth: 900, margin: '0 auto 64px' }}>
        <h2 style={{ font: '800 clamp(34px,4.4vw,56px) var(--dx-sora)', margin: '0 0 28px', letterSpacing: -0.5 }}>
          About <span className="dx-accent">DondaX</span>
        </h2>
        <p style={{ font: '500 17px/1.8 var(--dx-manrope)', color: 'var(--dx-text-muted)' }}>
          DondaX is leading the movement towards a cleaner, smarter, and more affordable way to move. We are a proudly
          Nigerian electric mobility company, focused on redefining transportation with cutting-edge electric
          motorcycles designed for the streets and communities of Africa. We believe transportation should be more than
          just movement — it should be empowering, sustainable, and accessible to everyone.
        </p>
      </Reveal>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(320px,100%),1fr))', gap: 28, marginBottom: 80 }}>
        {[
          {
            title: 'Our Mission',
            body: 'To reduce transportation costs, cut down harmful emissions, and create new economic opportunities through clean energy solutions. Every DondaX ride is not just a journey — it’s a statement of freedom, progress, and a greener future.',
          },
          {
            title: 'Our Vision',
            body: 'To revolutionize urban transportation in Africa by providing cutting-edge, eco-friendly electric motorcycles that combine performance, sustainability, and affordability. We’re committed to reducing carbon emissions while empowering communities through innovative mobility solutions.',
          },
        ].map((card, i) => (
          <Reveal key={card.title} delay={i * 0.12} className="dx-card dx-card--glass dx-about-card" style={{ padding: 'clamp(24px,5vw,40px)' }}>
            <h3 style={{ font: '700 24px var(--dx-sora)', margin: '0 0 16px', color: 'var(--dx-accent)' }}>{card.title}</h3>
            <p style={{ font: '500 15px/1.75 var(--dx-manrope)', color: 'var(--dx-text-muted)' }}>{card.body}</p>
          </Reveal>
        ))}
      </div>

      <div className="dx-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(320px,100%),1fr))', gap: 64, alignItems: 'center' }}>
        <Reveal>
          <h3 style={{ font: '700 clamp(28px,5vw,36px) var(--dx-sora)', margin: '0 0 32px' }}>
            Building the <span className="dx-accent">Future</span>
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            {buildPoints.map((point, i) => (
              <div key={point} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span className="dx-pulse-dot" style={{ animationDelay: `${i * 0.4}s` }} />
                <span style={{ font: '600 16px var(--dx-manrope)', color: 'oklch(88% 0.006 95)' }}>{point}</span>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.12} className="dx-media">
          <img src={ASSET('gn-urban.webp')} srcSet={SRCSET('gn-urban')} sizes="(max-width: 720px) 100vw, 640px" loading="lazy" decoding="async" alt="DondaX electric motorcycle" style={{ width: '100%', height: 'clamp(220px,55vw,380px)', objectFit: 'cover' }} />
          <div className="dx-shine" style={{ animationDelay: '2s' }} />
        </Reveal>
      </div>
    </div>
  );
}

function CtaBanner() {
  return (
    <Reveal style={{ textAlign: 'center', padding: '80px 56px' }} className="dx-section">
      <h3 style={{ font: '800 clamp(28px,3.4vw,42px) var(--dx-sora)', margin: '0 0 32px' }}>
        Ready to Join the <span className="dx-accent">Electric</span> Revolution?
      </h3>
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/products" className="dx-btn">Explore Products</Link>
        <a href="#contact" className="dx-btn-outline">Contact Us</a>
      </div>
    </Reveal>
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
    <div id="contact" style={{ ...SECTION, padding: '40px 56px 96px', scrollMarginTop: 20 }} className="dx-section">
      <Reveal style={{ textAlign: 'center', marginBottom: 48 }}>
        <div className="dx-eyebrow" style={{ marginBottom: 14 }}>Get in Touch</div>
        <h2 style={{ font: '800 clamp(32px,4vw,48px) var(--dx-sora)' }}>
          Contact <span className="dx-accent">Us</span>
        </h2>
      </Reveal>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(320px,100%),1fr))', gap: 28 }}>
        <Reveal className="dx-card dx-card--glass" style={{ padding: 'clamp(20px,4vw,32px)' }}>
          <h3 style={{ font: '700 20px var(--dx-sora)', margin: '0 0 20px' }}>Our Location</h3>
          <div style={{ position: 'relative', width: '100%', height: 'clamp(260px,60vw,360px)', borderRadius: 14, overflow: 'hidden', border: '1px solid var(--dx-border)' }}>
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
              className="dx-card dx-card--glass dx-contact-card"
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
                <div style={{ font: '600 12px var(--dx-manrope)', color: 'var(--dx-text-muted)', marginBottom: 4 }}>{item.label}</div>
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
                  background: 'var(--dx-surface-glass)', border: '1px solid rgba(255,255,255,.12)',
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

export default function Home() {
  return (
    <DondaxLayout background hideNav>
      <Hero />
      <StatStrip />
      <FeaturedModel />
      <Colours />
      <About />
      <CtaBanner />
      <Contact />
    </DondaxLayout>
  );
}
