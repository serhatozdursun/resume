import React from 'react';
import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MotionReveal from '../components/MotionReveal';

const defaultMatchMedia = () => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
};

describe('MotionReveal', () => {
  const originalIO = window.IntersectionObserver;

  beforeEach(() => {
    defaultMatchMedia();
  });

  afterEach(() => {
    defaultMatchMedia();
    Object.defineProperty(window, 'IntersectionObserver', {
      configurable: true,
      writable: true,
      value: originalIO,
    });
    jest.restoreAllMocks();
  });

  it('renders children with optional className', () => {
    const { container } = render(
      <MotionReveal className='reveal-block'>
        <span>Classed</span>
      </MotionReveal>
    );
    expect(container.querySelector('.reveal-block')).toBeInTheDocument();
    expect(screen.getByText('Classed')).toBeInTheDocument();
  });

  it('reveals immediately when prefers-reduced-motion is enabled', () => {
    window.matchMedia = jest.fn().mockImplementation((query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    render(
      <MotionReveal delayMs={30}>
        <span>Reduced motion</span>
      </MotionReveal>
    );

    expect(screen.getByText('Reduced motion')).toBeInTheDocument();
  });

  it('reveals when IntersectionObserver is not available', () => {
    Object.defineProperty(window, 'IntersectionObserver', {
      configurable: true,
      writable: true,
      value: undefined,
    });

    render(
      <MotionReveal>
        <span>No observer</span>
      </MotionReveal>
    );

    expect(screen.getByText('No observer')).toBeInTheDocument();
  });

  it('reveals when the observed element intersects', () => {
    let capturedCallback: IntersectionObserverCallback | undefined;
    const observeMock = jest.fn();

    class MockIntersectionObserver implements IntersectionObserver {
      readonly root: Element | null = null;
      readonly rootMargin = '';
      readonly thresholds: readonly number[] = [];

      constructor(cb: IntersectionObserverCallback) {
        capturedCallback = cb;
      }

      observe(target: Element): void {
        observeMock(target);
      }

      disconnect(): void {}
      unobserve(): void {}
      takeRecords(): IntersectionObserverEntry[] {
        return [];
      }
    }

    Object.defineProperty(window, 'IntersectionObserver', {
      configurable: true,
      writable: true,
      value: MockIntersectionObserver,
    });

    const { container } = render(
      <MotionReveal delayMs={10}>
        <span>Intersected</span>
      </MotionReveal>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveStyle({ opacity: '0' });

    expect(observeMock).toHaveBeenCalled();
    const observedTarget = observeMock.mock.calls[0][0] as Element;

    act(() => {
      capturedCallback!(
        [
          {
            isIntersecting: true,
            target: observedTarget,
          } as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver
      );
    });

    expect(screen.getByText('Intersected')).toBeInTheDocument();
    expect(wrapper).toHaveStyle({ opacity: '1' });
  });

  it('unobserves the target after intersection and disconnects on unmount', () => {
    const unobserveMock = jest.fn();
    let capturedCallback: IntersectionObserverCallback | undefined;

    class MockIntersectionObserver implements IntersectionObserver {
      readonly root: Element | null = null;
      readonly rootMargin = '';
      readonly thresholds: readonly number[] = [];

      constructor(cb: IntersectionObserverCallback) {
        capturedCallback = cb;
      }

      observe(): void {}

      disconnect(): void {}

      unobserve(target: Element): void {
        unobserveMock(target);
      }

      takeRecords(): IntersectionObserverEntry[] {
        return [];
      }
    }

    Object.defineProperty(window, 'IntersectionObserver', {
      configurable: true,
      writable: true,
      value: MockIntersectionObserver,
    });

    const { container, unmount } = render(
      <MotionReveal delayMs={5}>
        <span>Unobserve test</span>
      </MotionReveal>
    );

    const wrapper = container.firstChild as HTMLElement;
    act(() => {
      capturedCallback!(
        [
          {
            isIntersecting: true,
            target: wrapper,
          } as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver
      );
    });

    expect(unobserveMock).toHaveBeenCalledWith(wrapper);

    unmount();
  });
});
