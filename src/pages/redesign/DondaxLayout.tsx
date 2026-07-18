import { useEffect, useRef, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ASSET } from './data';
import './dondax.css';

/**
 * <video> that fights to keep autoplaying on mobile: Low Power Mode /
 * Data Saver block autoplay, and iOS pauses videos scrolled off-screen.
 * Retries play() on first touch, on scroll back into view, and when the
 * tab becomes visible again.
 */
export function AutoplayVideo(props: React.ComponentPropsWithoutRef<'video'>) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true; // set the property directly — required for autoplay
    const tryPlay = () => {
      if (video.paused) video.play().catch(() => {});
    };
    tryPlay();

    const onVisibility = () => {
      if (document.visibilityState === 'visible') tryPlay();
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) tryPlay();
    });
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('touchstart', tryPlay, { passive: true });
    observer.observe(video);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('touchstart', tryPlay);
      observer.disconnect();
    };
  }, []);

  return <video ref={ref} autoPlay muted loop playsInline {...props} />;
}

function Brand() {
  return (
    <Link to="/" className="dx-nav__brand">
      <img src={ASSET('logo.webp')} alt="DondaX" />
      <span>
        DONDA<span className="dx-accent">X</span>
      </span>
    </Link>
  );
}

interface DondaxNavProps {
  active?: string; // pathname of the active section, e.g. "/products"
  /** the order page drops the CTA (it duplicates the form's own button) */
  showOrderCta?: boolean;
}

export function DondaxNav({ active, showOrderCta = true }: DondaxNavProps) {
  const productsActive = active === '/products';
  return (
    <nav className="dx-nav">
      <Brand />
      <div className="dx-nav__links">
        <Link to="/" className={active === '/' ? 'is-active' : undefined}>Home</Link>
        <Link to="/#about">About</Link>
        <div className="dx-nav__drop">
          <Link
            to="/products"
            className={`dx-nav__drop-trigger${productsActive ? ' is-active' : ''}`}
          >
            Products <span className="dx-nav__drop-caret">▾</span>
          </Link>
          <div className="dx-nav__menu">
            <div className="dx-nav__menu-inner">
              <Link to="/products/gn-model">
                <span className="dx-nav__menu-dot" />
                GN Model
              </Link>
            </div>
          </div>
        </div>
        <Link to="/gnhub" className={active === '/gnhub' ? 'is-active' : undefined}>GNHub</Link>
        <Link to="/#contact">Contact</Link>
      </div>
      {showOrderCta ? (
        <Link to="/order" className="dx-btn dx-btn--sm" style={{ whiteSpace: 'nowrap' }}>
          Order Now
        </Link>
      ) : (
        <div style={{ width: 118 }} aria-hidden />
      )}
    </nav>
  );
}

export function DondaxFooter() {
  return (
    <footer className="dx-footer">
      <div className="dx-footer__brand">
        <img src={ASSET('logo.webp')} alt="DondaX" />
        DONDA<span className="dx-accent">X</span>
      </div>
      <div className="dx-footer__copy">© 2026 DondaX Limited. All rights reserved.</div>
    </footer>
  );
}

interface DondaxLayoutProps {
  children: ReactNode;
  /** pathname to highlight in the nav */
  active?: string;
  /** hide the nav's Order CTA (used by the order page) */
  navShowOrderCta?: boolean;
}

/**
 * Wraps a redesign page: applies the scoped `.dondax-root` theme, scrolls to
 * top / to a hash anchor on navigation, and renders shared nav + footer.
 */
export default function DondaxLayout({
  children,
  active,
  navShowOrderCta = true,
}: DondaxLayoutProps) {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <div className="dondax-root">
      <DondaxNav active={active} showOrderCta={navShowOrderCta} />
      {children}
      <DondaxFooter />
    </div>
  );
}
