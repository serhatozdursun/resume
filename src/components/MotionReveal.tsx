import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface MotionRevealProps {
  children: React.ReactNode;
  delayMs?: number;
  className?: string;
}

const RevealWrapper = styled.div<{ $visible: boolean; $delayMs: number }>`
  opacity: ${props => (props.$visible ? 1 : 0)};
  padding: 0 0 10px;
  /* translateY(0) still establishes a transform containing block and breaks descendant
     position:sticky vs the viewport; use none when revealed. */
  transform: ${props => (props.$visible ? 'none' : 'translateY(14px)')};
  transition:
    opacity 420ms ease,
    transform 420ms ease;
  transition-delay: ${props => `${props.$delayMs}ms`};
  will-change: ${props => (props.$visible ? 'auto' : 'opacity, transform')};

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    transform: none;
    transition: none;
  }
`;

const MotionReveal: React.FC<MotionRevealProps> = ({
  children,
  delayMs = 0,
  className,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function'
    ) {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      if (prefersReducedMotion) {
        setIsVisible(true);
        return;
      }
    }

    if (!ref.current || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <RevealWrapper
      ref={ref}
      className={className}
      $visible={isVisible}
      $delayMs={delayMs}
    >
      {children}
    </RevealWrapper>
  );
};

export default MotionReveal;
