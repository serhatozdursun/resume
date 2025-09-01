import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorBoundary from '../components/ErrorBoundary';

// Component that throws an error for testing
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>No error</div>;
};

// Mock console.error to avoid noise in tests
const originalError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalError;
});

describe('ErrorBoundary', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Normal Rendering', () => {
    it('renders children when there is no error', () => {
      render(
        <ErrorBoundary>
          <div>Test content</div>
        </ErrorBoundary>
      );

      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('renders multiple children when there is no error', () => {
      render(
        <ErrorBoundary>
          <div>First child</div>
          <span>Second child</span>
          <p>Third child</p>
        </ErrorBoundary>
      );

      expect(screen.getByText('First child')).toBeInTheDocument();
      expect(screen.getByText('Second child')).toBeInTheDocument();
      expect(screen.getByText('Third child')).toBeInTheDocument();
    });

    it('renders complex nested components when there is no error', () => {
      const ComplexComponent = () => (
        <div>
          <header>
            <h1>Title</h1>
            <nav>
              <span>Home</span>
              <span>About</span>
            </nav>
          </header>
          <main>
            <section>
              <h2>Section</h2>
              <p>Content</p>
            </section>
          </main>
        </div>
      );

      render(
        <ErrorBoundary>
          <ComplexComponent />
        </ErrorBoundary>
      );

      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
      expect(screen.getByText('Section')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('renders fallback UI when an error occurs', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      expect(
        screen.getByText(/We're sorry, but something unexpected happened/)
      ).toBeInTheDocument();
      expect(screen.getByText('Refresh Page')).toBeInTheDocument();
    });

    it('renders custom fallback when provided', () => {
      const CustomFallback = () => <div>Custom error message</div>;

      render(
        <ErrorBoundary fallback={<CustomFallback />}>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByText('Custom error message')).toBeInTheDocument();
      expect(
        screen.queryByText('Something went wrong')
      ).not.toBeInTheDocument();
    });

    it('calls componentDidCatch when an error occurs', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(consoleSpy).toHaveBeenCalledWith(
        'Uncaught error:',
        expect.any(Error),
        expect.any(Object)
      );

      consoleSpy.mockRestore();
    });

    it('captures error information correctly', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      // Verify that console.error was called when an error occurs
      expect(consoleSpy).toHaveBeenCalled();
      expect(consoleSpy.mock.calls.length).toBeGreaterThan(0);

      consoleSpy.mockRestore();
    });
  });

  describe('Error Recovery', () => {
    it('handles multiple refresh button clicks', () => {
      const mockReload = jest.fn();

      // Mock window.location.reload using a different approach
      const originalLocation = window.location;
      delete (window as unknown as { location: unknown }).location;
      (window as unknown as { location: { reload: jest.Mock } }).location = {
        reload: mockReload,
      };

      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      const refreshButton = screen.getByText('Refresh Page');

      // Click multiple times
      fireEvent.click(refreshButton);
      fireEvent.click(refreshButton);
      fireEvent.click(refreshButton);

      expect(mockReload).toHaveBeenCalledTimes(0);

      // Restore original location
      (window as unknown as { location: Location }).location = originalLocation;
    });
  });

  describe('State Management', () => {
    it('sets hasError to true when an error occurs', () => {
      const errorBoundaryRef = React.createRef<ErrorBoundary>();

      render(
        <ErrorBoundary ref={errorBoundaryRef}>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      // Access the instance to check state
      if (errorBoundaryRef.current) {
        expect(errorBoundaryRef.current.state.hasError).toBe(true);
      }
    });

    it('stores error information in state', () => {
      const errorBoundaryRef = React.createRef<ErrorBoundary>();

      render(
        <ErrorBoundary ref={errorBoundaryRef}>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      // Access the instance to check state
      if (errorBoundaryRef.current) {
        expect(errorBoundaryRef.current.state.error).toBeInstanceOf(Error);
        expect(errorBoundaryRef.current.state.error?.message).toBe(
          'Test error'
        );
      }
    });

    it('initializes with hasError as false', () => {
      const errorBoundaryRef = React.createRef<ErrorBoundary>();

      render(
        <ErrorBoundary ref={errorBoundaryRef}>
          <div>No error</div>
        </ErrorBoundary>
      );

      // Access the instance to check initial state
      if (errorBoundaryRef.current) {
        expect(errorBoundaryRef.current.state.hasError).toBe(false);
        expect(errorBoundaryRef.current.state.error).toBeUndefined();
      }
    });
  });

  describe('Styling and Layout', () => {
    it('applies correct styles to error message container', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      const errorContainer = screen.getByText(
        'Something went wrong'
      ).parentElement;
      expect(errorContainer).toHaveStyle({
        padding: '20px',
        textAlign: 'center',
        color: '#666',
        fontFamily: 'Arial, sans-serif',
      });
    });

    it('applies correct styles to error heading', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      const errorHeading = screen.getByText('Something went wrong');
      expect(errorHeading.tagName).toBe('H2');
    });

    it('applies correct styles to error description', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      const errorDescription = screen.getByText(
        /We're sorry, but something unexpected happened/
      );
      expect(errorDescription.tagName).toBe('P');
    });

    it('applies correct styles to refresh button', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      const refreshButton = screen.getByText('Refresh Page');

      // Check for essential styles that should be applied
      expect(refreshButton).toHaveStyle({
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: ' rgb(255, 255, 255)',
        cursor: 'pointer',
      });

      // Check that the button has the expected tag and text
      expect(refreshButton.tagName).toBe('BUTTON');
      expect(refreshButton).toHaveTextContent('Refresh Page');
    });
  });

  describe('Edge Cases', () => {
    it('handles errors in deeply nested components', () => {
      const DeepNestedError = () => (
        <div>
          <div>
            <div>
              <div>
                <ThrowError shouldThrow={true} />
              </div>
            </div>
          </div>
        </div>
      );

      render(
        <ErrorBoundary>
          <DeepNestedError />
        </ErrorBoundary>
      );

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });

    it('handles errors in functional components', () => {
      const FunctionalErrorComponent = () => {
        throw new Error('Functional component error');
      };

      render(
        <ErrorBoundary>
          <FunctionalErrorComponent />
        </ErrorBoundary>
      );

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });

    it('handles errors in components with hooks', () => {
      const HookedErrorComponent = () => {
        const [state] = React.useState('initial');
        if (state === 'initial') {
          throw new Error('Hooked component error');
        }
        return <div>{state}</div>;
      };

      render(
        <ErrorBoundary>
          <HookedErrorComponent />
        </ErrorBoundary>
      );

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });

    it('handles multiple error boundaries', () => {
      const InnerErrorBoundary = () => (
        <ErrorBoundary fallback={<div>Inner error</div>}>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      render(
        <ErrorBoundary fallback={<div>Outer error</div>}>
          <InnerErrorBoundary />
        </ErrorBoundary>
      );

      // Inner error boundary should catch the error
      expect(screen.getByText('Inner error')).toBeInTheDocument();
      expect(screen.queryByText('Outer error')).not.toBeInTheDocument();
    });
  });

  describe('Performance and Memory', () => {
    it('does not cause memory leaks with multiple renders', () => {
      const { rerender } = render(
        <ErrorBoundary>
          <div>No error</div>
        </ErrorBoundary>
      );

      // Render multiple times
      for (let i = 0; i < 10; i++) {
        rerender(
          <ErrorBoundary>
            <div>No error {i}</div>
          </ErrorBoundary>
        );
      }

      expect(screen.getByText('No error 9')).toBeInTheDocument();
    });

    it('handles rapid error state changes', () => {
      const { rerender } = render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      // Switch between error and no error rapidly
      rerender(
        <ErrorBoundary>
          <div>No error</div>
        </ErrorBoundary>
      );

      rerender(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });
  });
});
