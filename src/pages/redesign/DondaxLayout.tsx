import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ASSET, NAV_LINKS } from './data';
import './dondax.css';

const MenuIcon = ({ open }: { open: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    {open ? (
      <>
        <line x1="6" y1="6" x2="18" y2="18" />
        <line x1="18" y1="6" x2="6" y2="18" />
      </>
    ) : (
      <>
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </>
    )}
  </svg>
);

function Brand() {
  return (
    <Link to="/" className="dx-nav__brand">
      <img src={ASSET('logo.jpg')} alt="DondaX" />
      <span>
        DONDA<span className="dx-accent">X</span>
      </span>
    </Link>
  );
}

interface DondaxNavProps {
  active?: string; // pathname of the active section, e.g. "/products"
  showOrderCta?: boolean;
}

export function DondaxNav({ active, showOrderCta = true }: DondaxNavProps) {
  const [open, setOpen] = useState(false);
  return (
    <nav className="dx-nav dx-nav--border" style={{ position: 'relative' }}>
      <Brand />
      <div className={`dx-nav__links${open ? ' is-open' : ''}`}>
        {NAV_LINKS.map((link) => (
          <Link
            key={link.label}
            to={link.to}
            onClick={() => setOpen(false)}
            className={active && link.to === active ? 'is-active' : undefined}
          >
            {link.label}
          </Link>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {showOrderCta && (
          <Link to="/order" className="dx-btn dx-btn--sm" style={{ whiteSpace: 'nowrap' }}>
            Order Now
          </Link>
        )}
        <button
          className="dx-nav__toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <MenuIcon open={open} />
        </button>
      </div>
    </nav>
  );
}

export function DondaxFooter() {
  return (
    <footer className="dx-footer">
      <div className="dx-footer__brand">
        <img src={ASSET('logo.jpg')} alt="DondaX" />
        DONDA<span className="dx-accent">X</span>
      </div>
      <div className="dx-footer__copy">© 2026 DondaX Limited. All rights reserved.</div>
    </footer>
  );
}

/** Animated grid + energy-streak backdrop with a mouse-parallax effect. */
export function DondaxBackground() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let tx = 0, ty = 0, cx = 0, cy = 0;
    let raf: number | null = null;
    const loop = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      grid.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
      if (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = null;
      }
    };
    const onMove = (ev: MouseEvent) => {
      tx = (ev.clientX / window.innerWidth - 0.5) * 34;
      ty = (ev.clientY / window.innerHeight - 0.5) * 34;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // page-wide streaks: [top%, width%, duration s, delay s]
  const streaks: Array<[number, number, number, number]> = [
    [8, 40, 5.6, 0], [23, 32, 7, 1.4], [39, 46, 6.2, 2.6],
    [55, 28, 8, 0.8], [71, 38, 6.8, 3.4], [88, 34, 7.6, 2],
  ];

  return (
    <div className="dx-grid-fixed" aria-hidden="true">
      <div ref={gridRef} className="dx-grid-parallax" />
      {streaks.map(([top, width, dur, delay], i) => (
        <div
          key={i}
          className="dx-streak"
          style={{
            top: `${top}%`,
            left: '-42%',
            width: `${width}%`,
            animation: `dx-streak ${dur}s linear infinite ${delay}s`,
          }}
        />
      ))}
    </div>
  );
}

interface DondaxLayoutProps {
  children: ReactNode;
  /** pathname to highlight in the nav */
  active?: string;
  /** render the animated grid backdrop (home page) */
  background?: boolean;
  /** hide the nav (the Home page renders its own nav over the hero) */
  hideNav?: boolean;
}

/**
 * Wraps a redesign page: applies the scoped `.dondax-root` theme, scrolls to
 * top / to a hash anchor on navigation, and renders shared nav + footer.
 */
export default function DondaxLayout({
  children,
  active,
  background = false,
  hideNav = false,
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
    <div className="dondax-root" style={{ position: 'relative', overflow: 'hidden' }}>
      {background && <DondaxBackground />}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {!hideNav && <DondaxNav active={active} />}
        {children}
        <DondaxFooter />
      </div>
    </div>
  );
}
