import { useState } from 'react';
import DondaxLayout from './DondaxLayout';
import Reveal from './Reveal';
import { ASSET, STORIES, STORY_FILTERS, type Story } from './data';

function StoryView({ story, onBack }: { story: Story; onBack: () => void }) {
  return (
    <>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 56px 0' }} className="dx-section">
        <button
          onClick={onBack}
          style={{ background: 'none', border: 0, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8, font: '700 13px var(--dx-manrope)', color: 'oklch(78% 0.01 95)' }}
        >
          ← Back to GNHub
        </button>
      </div>
      <div style={{ maxWidth: 900, margin: '24px auto 0', padding: '0 56px' }} className="dx-section">
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 18 }}>
          <span style={{ background: 'oklch(80% 0.19 128 / .14)', color: 'var(--dx-accent)', font: '700 12px var(--dx-manrope)', padding: '6px 14px', borderRadius: 999 }}>{story.category}</span>
          <span style={{ font: '600 12px var(--dx-manrope)', color: 'var(--dx-text-faint)' }}>{story.date}</span>
        </div>
        <h1 style={{ font: '800 clamp(30px,4vw,46px)/1.15 var(--dx-sora)', margin: '0 0 32px', letterSpacing: -0.5 }}>{story.title}</h1>
      </div>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 56px' }} className="dx-section">
        <img src={story.image} alt={story.title} style={{ width: '100%', height: 'clamp(220px,55vw,440px)', objectFit: 'cover', borderRadius: 20, border: '1px solid var(--dx-border)' }} />
      </div>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 56px 96px' }} className="dx-section">
        {story.body.map((para, i) => (
          <p key={i} style={{ font: '500 17px/1.85 var(--dx-manrope)', color: 'var(--dx-text-muted)', margin: '0 0 22px' }}>{para}</p>
        ))}
        <button onClick={onBack} className="dx-btn-outline dx-btn-outline--sm" style={{ marginTop: 12 }}>← Back to GNHub</button>
      </div>
    </>
  );
}

export default function GNHub() {
  const [filter, setFilter] = useState<string>('all');
  const [openId, setOpenId] = useState<number | null>(null);

  const openStory = STORIES.find((s) => s.id === openId) ?? null;
  const featured = STORIES[0];
  const wanted = STORY_FILTERS.find((f) => f.key === filter)?.category ?? null;
  const feed = STORIES.slice(1).filter((s) => !wanted || s.category === wanted);

  if (openStory) {
    return (
      <DondaxLayout active="/gnhub">
        <StoryView story={openStory} onBack={() => setOpenId(null)} />
      </DondaxLayout>
    );
  }

  return (
    <DondaxLayout active="/gnhub">
      {/* header */}
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '64px 56px 40px' }} className="dx-section">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
          <Reveal style={{ maxWidth: 640 }}>
            <div className="dx-eyebrow" style={{ marginBottom: 14 }}>Stories · Media · Updates</div>
            <h1 style={{ font: '800 clamp(38px,5vw,60px)/1 var(--dx-sora)', margin: '0 0 18px', letterSpacing: -1 }}>
              GN<span className="dx-accent">Hub</span>
            </h1>
            <p style={{ font: '500 17px/1.7 var(--dx-manrope)', color: 'var(--dx-text-muted)' }}>
              The home of everything GN — behind the build, launch news, and the moments that move DondaX forward.
            </p>
          </Reveal>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {STORY_FILTERS.map((f) => {
              const active = filter === f.key;
              return (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  style={{
                    cursor: 'pointer',
                    background: active ? 'var(--dx-accent)' : 'transparent',
                    color: active ? '#fff' : 'oklch(78% 0.01 95)',
                    border: `1px solid ${active ? 'var(--dx-accent)' : 'rgba(255,255,255,.15)'}`,
                    font: '700 13px var(--dx-manrope)', padding: '10px 20px', borderRadius: 999,
                    transition: 'background .2s, color .2s, border-color .2s',
                  }}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* featured story */}
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '24px 56px 40px' }} className="dx-section">
        <button onClick={() => setOpenId(featured.id)} className="dx-featured" style={{ width: '100%', textAlign: 'left', cursor: 'pointer', padding: 0, color: 'inherit', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(320px,100%),1fr))', background: 'var(--dx-surface)', border: '1px solid var(--dx-border)', borderRadius: 22, overflow: 'hidden' }}>
          <div style={{ position: 'relative', minHeight: 'clamp(240px,60vw,420px)' }}>
            <img src={featured.image} alt={featured.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <span style={{ position: 'absolute', top: 22, left: 22, background: 'var(--dx-accent)', color: 'var(--dx-accent-ink)', font: '700 12px var(--dx-manrope)', padding: '7px 14px', borderRadius: 999 }}>Featured</span>
          </div>
          <div style={{ padding: 'clamp(24px,5vw,48px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
              <span style={{ background: 'oklch(80% 0.19 128 / .14)', color: 'var(--dx-accent)', font: '700 12px var(--dx-manrope)', padding: '6px 14px', borderRadius: 999 }}>{featured.category}</span>
              <span style={{ font: '600 12px var(--dx-manrope)', color: 'var(--dx-text-faint)' }}>{featured.date}</span>
            </div>
            <h2 style={{ font: '700 clamp(24px,4.5vw,32px)/1.15 var(--dx-sora)', margin: '0 0 18px' }}>{featured.title}</h2>
            <p style={{ font: '500 15px/1.75 var(--dx-manrope)', color: 'var(--dx-text-muted)', margin: '0 0 28px' }}>{featured.excerpt}</p>
            <span className="dx-btn dx-btn--sm" style={{ alignSelf: 'flex-start' }}>Read the Story</span>
          </div>
        </button>
      </div>

      {/* latest updates */}
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '32px 56px 24px' }} className="dx-section">
        <h3 style={{ font: '700 24px var(--dx-sora)', margin: '0 0 28px' }}>Latest <span className="dx-accent">Updates</span></h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(300px,100%),1fr))', gap: 28 }}>
          {feed.length === 0 && (
            <p style={{ font: '500 15px var(--dx-manrope)', color: 'var(--dx-text-muted)' }}>No updates in this category yet.</p>
          )}
          {feed.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.08}>
              <button
                onClick={() => setOpenId(post.id)}
                className="dx-update-card"
                style={{ textAlign: 'left', cursor: 'pointer', padding: 0, color: 'inherit', width: '100%', background: 'var(--dx-surface)', border: '1px solid var(--dx-border)', borderRadius: 18, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
              >
                <img src={post.image} alt={post.title} style={{ width: '100%', height: 190, objectFit: 'cover' }} />
                <div style={{ padding: 24, display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                    <span style={{ background: 'oklch(80% 0.19 128 / .14)', color: 'var(--dx-accent)', font: '700 11px var(--dx-manrope)', padding: '5px 12px', borderRadius: 999 }}>{post.category}</span>
                    <span style={{ font: '600 11px var(--dx-manrope)', color: 'var(--dx-text-faint)' }}>{post.date}</span>
                  </div>
                  <h4 style={{ font: '700 18px/1.3 var(--dx-sora)', margin: '0 0 10px' }}>{post.title}</h4>
                  <p style={{ font: '500 14px/1.65 var(--dx-manrope)', color: 'var(--dx-text-muted)', margin: '0 0 16px', flex: 1 }}>{post.excerpt}</p>
                  <span style={{ font: '700 13px var(--dx-manrope)', color: 'var(--dx-accent)' }}>Read more →</span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* media gallery */}
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '48px 56px 24px' }} className="dx-section">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 28 }}>
          <h3 style={{ font: '700 24px var(--dx-sora)' }}>Media <span className="dx-accent">Gallery</span></h3>
          <span style={{ font: '600 13px var(--dx-manrope)', color: 'var(--dx-text-muted)' }}>On the streets, in every colour</span>
        </div>
        <div className="dx-gallery" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gridAutoRows: 'clamp(110px,26vw,180px)', gap: 16 }}>
          <video src={ASSET('hero-video.mp4')} autoPlay muted loop playsInline style={{ gridColumn: 'span 2', gridRow: 'span 2', width: '100%', height: '100%', objectFit: 'cover', borderRadius: 16, border: '1px solid var(--dx-border)' }} />
          <img src={ASSET('gn-green.jpg')} alt="GN Model, Electric Green, studio side profile" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 16, border: '1px solid var(--dx-border)' }} />
          <img src={ASSET('gn-red.jpg')} alt="GN Model, Signal Red, three-quarter front" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 16, border: '1px solid var(--dx-border)' }} />
          <img src={ASSET('gn-urban.jpg')} alt="GN Model, Midnight Black, on an Abuja street" style={{ gridColumn: 'span 2', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%', borderRadius: 16, border: '1px solid var(--dx-border)' }} />
        </div>
      </div>

      {/* newsletter */}
      <div style={{ maxWidth: 1400, margin: '48px auto 0', padding: '0 56px' }} className="dx-section">
        <div style={{ background: 'var(--dx-surface)', border: '1px solid var(--dx-border)', borderRadius: 22, padding: 'clamp(24px,6vw,56px)', textAlign: 'center' }}>
          <h3 style={{ font: '800 clamp(26px,3vw,38px) var(--dx-sora)', margin: '0 0 14px' }}>Stay in the <span className="dx-accent">Loop</span></h3>
          <p style={{ font: '500 16px/1.6 var(--dx-manrope)', color: 'var(--dx-text-muted)', margin: '0 auto 28px', maxWidth: 480 }}>
            Get launch news, ride events, and GN stories delivered straight to your inbox.
          </p>
          <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', maxWidth: 520, margin: '0 auto' }}>
            <input placeholder="Enter your email" type="email" className="dx-input" style={{ flex: 1, minWidth: 220, background: 'var(--dx-bg)', borderRadius: 999, padding: '15px 22px' }} />
            <button type="submit" className="dx-btn dx-btn--sm">Subscribe</button>
          </form>
        </div>
      </div>

      <div style={{ height: 64 }} />
    </DondaxLayout>
  );
}
