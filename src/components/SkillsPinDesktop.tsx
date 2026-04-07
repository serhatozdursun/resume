import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { SkillsStickySection } from './Layout.styles';

const STICKY_TOP_PX = 96;
const MOBILE_OR_TABLET_QUERY = '(max-width: 1024px)';

export const SkillsPinContext =
  createContext<React.RefObject<HTMLDivElement | null> | null>(null);

export const SkillsPinProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const boundaryRef = useRef<HTMLDivElement | null>(null);
  return (
    <SkillsPinContext.Provider value={boundaryRef}>
      {children}
    </SkillsPinContext.Provider>
  );
};

/** Sentinel at the bottom of the main page row; clamps the fixed Skills block above the footer. */
export const SkillsPinBoundary: React.FC = () => {
  const boundaryRef = useContext(SkillsPinContext);
  if (!boundaryRef) return null;
  return (
    <div
      ref={boundaryRef}
      aria-hidden
      data-testid='skills-pin-boundary'
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 1,
        width: '100%',
        pointerEvents: 'none',
        visibility: 'hidden',
      }}
    />
  );
};

function isMobileViewport(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return false;
  }
  return window.matchMedia(MOBILE_OR_TABLET_QUERY).matches;
}

interface FixedMetrics {
  top: number;
  left: number;
  width: number;
}

/**
 * Desktop-only: keeps the Skills block visible while scrolling the main column
 * (fixed + boundary clamp). Uses IntersectionObserver to co-trigger updates with scroll.
 * Without `SkillsPinProvider`, renders as `SkillsStickySection` for tests / isolated use.
 */
export const SkillsPinDesktop: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const providerBoundaryRef = useContext(SkillsPinContext);
  const fallbackBoundaryRef = useRef<HTMLDivElement | null>(null);
  const boundaryRef = providerBoundaryRef ?? fallbackBoundaryRef;

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const placeholderRef = useRef<HTMLDivElement | null>(null);
  const blockRef = useRef<HTMLDivElement | null>(null);

  const [pinned, setPinned] = useState(false);
  const [fixedMetrics, setFixedMetrics] = useState<FixedMetrics | null>(null);

  const pinnedRef = useRef(false);
  pinnedRef.current = pinned;

  const update = useCallback(() => {
    if (typeof window === 'undefined') return;

    if (!providerBoundaryRef?.current) {
      setPinned(false);
      setFixedMetrics(null);
      const ph = placeholderRef.current;
      if (ph) ph.style.minHeight = '';
      return;
    }

    if (isMobileViewport()) {
      setPinned(false);
      setFixedMetrics(null);
      const ph = placeholderRef.current;
      if (ph) ph.style.minHeight = '';
      return;
    }

    const boundary = boundaryRef.current;
    const block = blockRef.current;
    const placeholder = placeholderRef.current;
    const wrapper = wrapperRef.current;
    if (!boundary || !block || !placeholder || !wrapper) return;

    const h = block.offsetHeight;
    const boundaryTop = boundary.getBoundingClientRect().top;
    const topMax = boundaryTop - h;

    if (pinnedRef.current) {
      const phTop = placeholder.getBoundingClientRect().top;
      if (phTop > STICKY_TOP_PX) {
        placeholder.style.minHeight = '';
        setPinned(false);
        setFixedMetrics(null);
        return;
      }
      const wr = wrapper.getBoundingClientRect();
      setFixedMetrics({
        top: Math.min(STICKY_TOP_PX, topMax),
        left: wr.left,
        width: wr.width,
      });
      return;
    }

    const blockTop = block.getBoundingClientRect().top;
    if (blockTop < STICKY_TOP_PX) {
      placeholder.style.minHeight = `${h}px`;
      const br = block.getBoundingClientRect();
      setPinned(true);
      setFixedMetrics({
        top: Math.min(STICKY_TOP_PX, topMax),
        left: br.left,
        width: br.width,
      });
    }
  }, [boundaryRef, providerBoundaryRef]);

  useEffect(() => {
    if (!providerBoundaryRef) return;

    let raf = 0;
    const scheduleUpdate = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        update();
      });
    };

    const mq =
      typeof window.matchMedia === 'function'
        ? window.matchMedia(MOBILE_OR_TABLET_QUERY)
        : null;
    let io: IntersectionObserver | null = null;
    if (mq?.matches) {
      scheduleUpdate();
      mq.addEventListener('change', scheduleUpdate);
      return () => {
        mq.removeEventListener('change', scheduleUpdate);
        if (raf) cancelAnimationFrame(raf);
        io?.disconnect();
      };
    }
    mq?.addEventListener('change', scheduleUpdate);
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate, { passive: true });

    const wrapper = wrapperRef.current;
    const boundary = boundaryRef.current;
    if (typeof IntersectionObserver !== 'undefined' && wrapper && boundary) {
      io = new IntersectionObserver(scheduleUpdate, {
        root: null,
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
        rootMargin: '0px',
      });
      io.observe(wrapper);
      io.observe(boundary);
    }

    scheduleUpdate();

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      mq?.removeEventListener('change', scheduleUpdate);
      if (raf) cancelAnimationFrame(raf);
      io?.disconnect();
    };
  }, [boundaryRef, providerBoundaryRef, update]);

  if (!providerBoundaryRef) {
    return <SkillsStickySection>{children}</SkillsStickySection>;
  }

  const blockStyle: React.CSSProperties =
    pinned && fixedMetrics
      ? {
          position: 'fixed',
          top: fixedMetrics.top,
          left: fixedMetrics.left,
          width: fixedMetrics.width,
          zIndex: 2,
        }
      : { position: 'relative', width: '100%' };

  return (
    <div
      ref={wrapperRef}
      style={{ width: '100%', alignSelf: 'flex-start' }}
      data-skills-pin-wrapper
    >
      <div ref={placeholderRef} aria-hidden style={{ minHeight: 0 }} />
      <div ref={blockRef} style={blockStyle}>
        {children}
      </div>
    </div>
  );
};
