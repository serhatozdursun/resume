import { useEffect } from 'react';
import { useRouter } from 'next/router';

const CustomErrorPage = ({ statusCode }: { statusCode: number }) => {
  const router = useRouter();

  useEffect(() => {
    if (statusCode === 404) {
      // Redirect to the custom NotFoundPage for 404 errors
      router.replace('/NotFoundPage');
    } else {
      // For other errors, you can choose to show a fallback or redirect elsewhere
      router.replace('/');
    }
  }, [statusCode, router]);

  return ''; // No need to render anything here, just redirect
};

CustomErrorPage.getInitialProps = async ({
  res,
  err,
}: {
  res: { statusCode: number } | null;
  err: { statusCode: number } | null;
}) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default CustomErrorPage;
