import { useState } from 'react';
import DondaxLayout, { AutoplayVideo } from './DondaxLayout';
import Reveal from './Reveal';
import { ASSET, SRCSET, STORIES, STORY_FILTERS, FEATURED_EXCERPT, type Story } from './data';

function StoryView({ story, onBack }: { story: Story; onBack: () => void }) {
  return (
    <>
      <div className="dx-section" style={{ maxWidth: 900, margin: '0 auto', padding: '48px 56px 0' }}>
        <button
          onClick={onBack}
          style={{ background: 'none', border: 0, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8, font: '700 13px var(--dx-manrope)', color: 'oklch(78% 0.01 95)' }}
        >
          ← Back to GNHub
        </button>
      </div>
      <div className="dx-section" style={{ maxWidth: 900, margin: '24px auto 0', padding: '0 56px' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 18 }}>
          <span style={{ background: 'oklch(80% 0.19 128 / .14)', color: 'var(--dx-accent)', font: '700 12px var(--dx-manrope)', padding: '6px 14px', borderRadius: 999 }}>{story.category}</span>
          <span style={{ font: '600 12px var(--dx-manrope)', color: 'oklch(58% 0.015 95)' }}>{story.date}</span>
        </div>
        <h1 style={{ font: '800 clamp(30px,4vw,46px)/1.15 var(--dx-sora)', margin: '0 0 32px', letterSpacing: -0.5 }}>{story.title}</h1>
      </div>
      <div className="dx-section" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 56px' }}>
        <img src={story.image} srcSet={story.imageSet} sizes="(max-width: 760px) 100vw, 990px" decoding="async" alt={story.title} className="dx-m-simg" style={{ width: '100%', height: 440, objectFit: 'cover', borderRadius: 20, border: '1px solid var(--dx-border)' }} />
      </div>
      <div className="dx-section" style={{ maxWidth: 760, margin: '0 auto', padding: '40px 56px 96px' }}>
        {story.body.map((para, i) => (
          <p key={i} style={{ font: '500 17px/1.85 var(--dx-manrope)', color: 'oklch(76% 0.015 95)', margin: '0 0 22px' }}>{para}</p>
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
      <div className="dx-section" style={{ maxWidth: 1400, margin: '0 auto', padding: '64px 56px 40px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
          <Reveal style={{ maxWidth: 640 }}>
            <div className="dx-eyebrow" style={{ marginBottom: 14 }}>Stories · Media · Updates</div>
            <h1 style={{ font: '800 clamp(38px,5vw,60px)/1 var(--dx-sora)', margin: '0 0 18px', letterSpacing: -1 }}>
              GN<span className="dx-accent">Hub</span>
            </h1>
            <p style={{ font: '500 17px/1.7 var(--dx-manrope)', color: 'oklch(72% 0.015 95)' }}>
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
                    color: active ? 'var(--dx-accent-ink)' : 'oklch(78% 0.01 95)',
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
      <div className="dx-section" style={{ maxWidth: 1400, margin: '0 auto', padding: '24px 56px 40px' }}>
        <button
          onClick={() => setOpenId(featured.id)}
          className="dx-featured dx-m-cols"
          style={{ width: '100%', textAlign: 'left', cursor: 'pointer', padding: 0, color: 'inherit', display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 0, background: 'var(--dx-surface)', border: '1px solid var(--dx-border)', borderRadius: 22, overflow: 'hidden' }}
        >
          <div className="dx-m-fimg" style={{ position: 'relative', minHeight: 420 }}>
            <img src={featured.image} srcSet={featured.imageSet} sizes="(max-width: 760px) 100vw, 720px" decoding="async" alt={featured.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <span style={{ position: 'absolute', top: 22, left: 22, background: 'var(--dx-accent)', color: 'var(--dx-accent-ink)', font: '700 12px var(--dx-manrope)', padding: '7px 14px', borderRadius: 999 }}>Featured</span>
          </div>
          <div className="dx-m-card-pad" style={{ padding: 48, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
              <span style={{ background: 'oklch(80% 0.19 128 / .14)', color: 'var(--dx-accent)', font: '700 12px var(--dx-manrope)', padding: '6px 14px', borderRadius: 999 }}>{featured.category}</span>
              <span style={{ font: '600 12px var(--dx-manrope)', color: 'oklch(58% 0.015 95)' }}>{featured.date}</span>
            </div>
            <h2 className="dx-m-fs-26" style={{ font: '700 32px/1.15 var(--dx-sora)', margin: '0 0 18px' }}>{featured.title}</h2>
            <p style={{ font: '500 15px/1.75 var(--dx-manrope)', color: 'var(--dx-text-muted)', margin: '0 0 28px' }}>{FEATURED_EXCERPT}</p>
            <span className="dx-btn dx-btn--sm" style={{ alignSelf: 'flex-start', padding: '13px 28px' }}>Read the Story</span>
          </div>
        </button>
      </div>

      {/* latest updates */}
      <div className="dx-section" style={{ maxWidth: 1400, margin: '0 auto', padding: '32px 56px 24px' }}>
        <h3 style={{ font: '700 24px var(--dx-sora)', margin: '0 0 28px' }}>Latest <span className="dx-accent">Updates</span></h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(320px,100%),1fr))', gap: 28 }}>
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
                <img src={post.image} srcSet={post.imageSet} sizes="(max-width: 760px) 100vw, 420px" loading="lazy" decoding="async" alt={post.title} style={{ width: '100%', height: 190, objectFit: 'cover' }} />
                <div style={{ padding: 24, display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                    <span style={{ background: 'oklch(80% 0.19 128 / .14)', color: 'var(--dx-accent)', font: '700 11px var(--dx-manrope)', padding: '5px 12px', borderRadius: 999 }}>{post.category}</span>
                    <span style={{ font: '600 11px var(--dx-manrope)', color: 'oklch(56% 0.015 95)' }}>{post.date}</span>
                  </div>
                  <h4 style={{ font: '700 18px/1.3 var(--dx-sora)', margin: '0 0 10px' }}>{post.title}</h4>
                  <p style={{ font: '500 14px/1.65 var(--dx-manrope)', color: 'oklch(66% 0.015 95)', margin: '0 0 16px', flex: 1 }}>{post.excerpt}</p>
                  <span style={{ font: '700 13px var(--dx-manrope)', color: 'var(--dx-accent)' }}>Read more →</span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* media gallery */}
      <div className="dx-section" style={{ maxWidth: 1400, margin: '0 auto', padding: '48px 56px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 28 }}>
          <h3 style={{ font: '700 24px var(--dx-sora)' }}>Media <span className="dx-accent">Gallery</span></h3>
          <span style={{ font: '600 13px var(--dx-manrope)', color: 'oklch(60% 0.015 95)' }}>On the streets, in every colour</span>
        </div>
        <div className="dx-gallery" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gridAutoRows: 180, gap: 16 }}>
          <AutoplayVideo src={ASSET('hero-video.mp4')} poster={ASSET('hero-poster.webp')} style={{ gridColumn: 'span 2', gridRow: 'span 2', width: '100%', height: '100%', objectFit: 'cover', borderRadius: 16, border: '1px solid var(--dx-border)' }} />
          <img src={ASSET('gn-green.webp')} srcSet={SRCSET('gn-green')} sizes="(max-width: 760px) 50vw, 330px" loading="lazy" decoding="async" alt="GN Model, Electric Green, studio side profile" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 16, border: '1px solid var(--dx-border)' }} />
          <img src={ASSET('gn-red.webp')} srcSet={SRCSET('gn-red')} sizes="(max-width: 760px) 50vw, 330px" loading="lazy" decoding="async" alt="GN Model, Signal Red, three-quarter front" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 16, border: '1px solid var(--dx-border)' }} />
          <img src={ASSET('gn-urban.webp')} srcSet={SRCSET('gn-urban')} sizes="(max-width: 760px) 100vw, 660px" loading="lazy" decoding="async" alt="GN Model, Midnight Black, on an Abuja street" style={{ gridColumn: 'span 2', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%', borderRadius: 16, border: '1px solid var(--dx-border)' }} />
        </div>
      </div>

      {/* newsletter: light card */}
      <div className="dx-section" style={{ maxWidth: 1400, margin: '48px auto 0', padding: '0 56px' }}>
        <div className="dx-card-light dx-m-card-pad" style={{ borderRadius: 22, padding: 56, textAlign: 'center' }}>
          <h3 style={{ font: '800 clamp(26px,3vw,38px) var(--dx-sora)', margin: '0 0 14px' }}>
            Stay in the <span style={{ color: 'var(--dx-accent-deep)' }}>Loop</span>
          </h3>
          <p style={{ font: '500 16px/1.6 var(--dx-manrope)', color: 'oklch(40% 0.01 95)', margin: '0 auto 28px', maxWidth: 480 }}>
            Get launch news, ride events, and GN stories delivered straight to your inbox.
          </p>
          <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', maxWidth: 520, margin: '0 auto' }}>
            <input
              placeholder="Enter your email"
              type="email"
              style={{ flex: 1, minWidth: 220, background: '#fff', border: '1px solid rgba(0,0,0,.14)', borderRadius: 999, padding: '15px 22px', color: 'var(--dx-light-ink)', font: '500 14px var(--dx-manrope)', outline: 'none' }}
            />
            <button type="submit" className="dx-btn dx-btn--sm" style={{ padding: '15px 30px' }}>Subscribe</button>
          </form>
        </div>
      </div>

      <div style={{ height: 64 }} />
    </DondaxLayout>
  );
}
