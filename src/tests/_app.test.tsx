import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../pages/_app';
import { validateEnv } from '../utils/env';

// Mock the validateEnv function
jest.mock('../utils/env', () => ({
  validateEnv: jest.fn(),
}));

// Mock Next.js router
const mockRouter = {
  pathname: '/',
  query: {},
  asPath: '/',
  push: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn(),
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
  isLocaleDomain: false,
  isReady: true,
  defaultLocale: 'en',
  domainLocales: [],
  isPreview: false,
};

jest.mock('next/router', () => ({
  useRouter: () => mockRouter,
}));

// Mock ErrorBoundary component
jest.mock('../components/ErrorBoundary', () => {
  return function MockErrorBoundary({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return <div data-testid='error-boundary'>{children}</div>;
  };
});

// Mock console.error
const originalConsoleError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
});

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset NODE_ENV
    delete process.env.NODE_ENV;
  });

  it('renders without crashing', () => {
    const Component = () => <div>Test Component</div>;
    const pageProps = {};

    render(<App Component={Component} pageProps={pageProps} />);

    expect(screen.getByTestId('error-boundary')).toBeInTheDocument();
    expect(screen.getByText('Test Component')).toBeInTheDocument();
  });

  it('wraps component with ErrorBoundary', () => {
    const Component = () => <div>Wrapped Component</div>;
    const pageProps = {};

    render(<App Component={Component} pageProps={pageProps} />);

    const errorBoundary = screen.getByTestId('error-boundary');
    expect(errorBoundary).toBeInTheDocument();
    expect(screen.getByText('Wrapped Component')).toBeInTheDocument();
  });

  it('passes pageProps to component', () => {
    const Component = ({ testProp }: { testProp: string }) => (
      <div>{testProp}</div>
    );
    const pageProps = { testProp: 'Test Prop Value' };

    render(<App Component={Component} pageProps={pageProps} />);

    expect(screen.getByText('Test Prop Value')).toBeInTheDocument();
  });

  describe('Environment Validation', () => {
    it('calls validateEnv in development mode', () => {
      process.env.NODE_ENV = 'development';
      const Component = () => <div>Dev Component</div>;
      const pageProps = {};

      render(<App Component={Component} pageProps={pageProps} />);

      expect(validateEnv).toHaveBeenCalledTimes(1);
    });

    it('does not call validateEnv in production mode', () => {
      process.env.NODE_ENV = 'production';
      const Component = () => <div>Prod Component</div>;
      const pageProps = {};

      render(<App Component={Component} pageProps={pageProps} />);

      expect(validateEnv).not.toHaveBeenCalled();
    });

    it('handles validateEnv errors gracefully', () => {
      process.env.NODE_ENV = 'development';
      const mockError = new Error('Environment validation failed');
      (validateEnv as jest.Mock).mockImplementation(() => {
        throw mockError;
      });

      const Component = () => <div>Error Component</div>;
      const pageProps = {};

      render(<App Component={Component} pageProps={pageProps} />);

      expect(validateEnv).toHaveBeenCalledTimes(1);
      expect(console.error).toHaveBeenCalledWith(
        'Environment validation failed:',
        mockError
      );
      expect(screen.getByText('Error Component')).toBeInTheDocument();
    });

    it('does not call validateEnv when NODE_ENV is not set', () => {
      const Component = () => <div>No Env Component</div>;
      const pageProps = {};

      render(<App Component={Component} pageProps={pageProps} />);

      expect(validateEnv).not.toHaveBeenCalled();
    });
  });

  describe('Component Integration', () => {
    it('renders complex components correctly', () => {
      const ComplexComponent = ({
        title,
        description,
      }: {
        title: string;
        description: string;
      }) => (
        <div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      );
      const pageProps = {
        title: 'Test Title',
        description: 'Test Description',
      };

      render(<App Component={ComplexComponent} pageProps={pageProps} />);

      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toBeInTheDocument();
    });

    it('handles components with no props', () => {
      const NoPropsComponent = () => <div>No Props Component</div>;
      const pageProps = {};

      render(<App Component={NoPropsComponent} pageProps={pageProps} />);

      expect(screen.getByText('No Props Component')).toBeInTheDocument();
    });

    it('handles empty pageProps', () => {
      const Component = () => <div>Empty Props Component</div>;
      const pageProps = {};

      render(<App Component={Component} pageProps={pageProps} />);

      expect(screen.getByText('Empty Props Component')).toBeInTheDocument();
    });
  });

  describe('Error Boundary Integration', () => {
    it('wraps components with ErrorBoundary', () => {
      const TestComponent = () => <div>Test Component</div>;
      const pageProps = {};

      render(<App Component={TestComponent} pageProps={pageProps} />);
      expect(screen.getByTestId('error-boundary')).toBeInTheDocument();
      expect(screen.getByText('Test Component')).toBeInTheDocument();
    });
  });
});
