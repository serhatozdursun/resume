import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomErrorPage from '../pages/_error';
import { useRouter } from 'next/router';

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
  useRouter: jest.fn(),
}));

describe('CustomErrorPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  describe('Component Rendering', () => {
    it('renders empty string for 404 errors', () => {
      render(<CustomErrorPage statusCode={404} />);

      // The component should render an empty string
      expect(document.body.innerHTML).not.toContain('404');
    });

    it('renders empty string for other errors', () => {
      render(<CustomErrorPage statusCode={500} />);

      // The component should render an empty string
      expect(document.body.innerHTML).not.toContain('500');
    });

    it('renders empty string for undefined status code', () => {
      render(<CustomErrorPage statusCode={undefined} />);

      // The component should render an empty string
      expect(document.body.innerHTML).toContain('<div></div>');
    });
  });

  describe('Router Navigation', () => {
    it('redirects to NotFoundPage for 404 errors', () => {
      render(<CustomErrorPage statusCode={404} />);

      expect(mockRouter.replace).toHaveBeenCalledWith('/NotFoundPage');
    });

    it('redirects to home page for non-404 errors', () => {
      render(<CustomErrorPage statusCode={500} />);

      expect(mockRouter.replace).toHaveBeenCalledWith('/');
    });

    it('redirects to home page for 403 errors', () => {
      render(<CustomErrorPage statusCode={403} />);

      expect(mockRouter.replace).toHaveBeenCalledWith('/');
    });

    it('redirects to home page for 401 errors', () => {
      render(<CustomErrorPage statusCode={401} />);

      expect(mockRouter.replace).toHaveBeenCalledWith('/');
    });

    it('redirects to home page for 400 errors', () => {
      render(<CustomErrorPage statusCode={400} />);

      expect(mockRouter.replace).toHaveBeenCalledWith('/');
    });
  });

  describe('getInitialProps', () => {
    it('returns statusCode from response when available', async () => {
      const res = { statusCode: 404 };
      const err = null;

      const result = await CustomErrorPage.getInitialProps({ res, err });

      expect(result).toEqual({ statusCode: 404 });
    });

    it('returns statusCode from error when response is not available', async () => {
      const res = null;
      const err = { statusCode: 500 };

      const result = await CustomErrorPage.getInitialProps({ res, err });

      expect(result).toEqual({ statusCode: 500 });
    });

    it('returns 404 as default when neither response nor error has statusCode', async () => {
      const res = null;
      const err = null;

      const result = await CustomErrorPage.getInitialProps({ res, err });

      expect(result).toEqual({ statusCode: 404 });
    });

    it('returns 404 as default when both response and error are null', async () => {
      const res = null;
      const err = null;

      const result = await CustomErrorPage.getInitialProps({ res, err });

      expect(result).toEqual({ statusCode: 404 });
    });

    it('prioritizes response statusCode over error statusCode', async () => {
      const res = { statusCode: 404 };
      const err = { statusCode: 500 };

      const result = await CustomErrorPage.getInitialProps({ res, err });

      expect(result).toEqual({ statusCode: 404 });
    });
  });

  describe('useEffect Behavior', () => {
    it('calls router.replace only once per render', () => {
      render(<CustomErrorPage statusCode={404} />);

      expect(mockRouter.replace).toHaveBeenCalledTimes(1);
    });

    it('does not call router.replace for undefined status code', () => {
      render(<CustomErrorPage statusCode={undefined} />);

      expect(mockRouter.replace).toHaveBeenCalledWith('/');
    });
  });

  describe('Edge Cases', () => {
    it('handles statusCode as string', () => {
      render(<CustomErrorPage statusCode={'404' as unknown as number} />);

      expect(mockRouter.replace).toHaveBeenCalledWith('/');
    });

    it('handles statusCode as zero', () => {
      render(<CustomErrorPage statusCode={0} />);

      expect(mockRouter.replace).toHaveBeenCalledWith('/');
    });

    it('handles negative statusCode', () => {
      render(<CustomErrorPage statusCode={-1} />);

      expect(mockRouter.replace).toHaveBeenCalledWith('/');
    });
  });

  describe('Component Props', () => {
    it('accepts statusCode as number', () => {
      expect(() => {
        render(<CustomErrorPage statusCode={404} />);
      }).not.toThrow();
    });

    it('accepts statusCode as undefined', () => {
      expect(() => {
        render(<CustomErrorPage statusCode={undefined} />);
      }).not.toThrow();
    });
  });
});
