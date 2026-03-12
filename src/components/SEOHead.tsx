import React from 'react';
import Script from 'next/script';
import { Helmet } from 'react-helmet';
import { meta, getStructuredData } from '../data/profile';
import { env } from '../utils/env';

interface SEOHeadProps {
  siteUrl?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({ siteUrl = env.SITE_URL }) => {
  const baseUrl = siteUrl.replace(/\/$/, '');
  const fullUrl = `${baseUrl}/`;
  const imageUrl = `${baseUrl}/profile.png`;

  return (
    <>
      <Helmet>
        <html lang='en' />
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta name='description' content={meta.description} />
        <title>{meta.title}</title>
        <link rel='icon' href='/favicon_.ico' />

        <meta property='og:type' content='website' />
        <meta property='og:url' content={fullUrl} />
        <meta property='og:title' content={meta.ogTitle} />
        <meta property='og:description' content={meta.ogDescription} />
        <meta property='og:image' content={imageUrl} />

        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:url' content={fullUrl} />
        <meta property='twitter:title' content={meta.ogTitle} />
        <meta property='twitter:description' content={meta.description} />
        <meta property='twitter:image' content={imageUrl} />

        <meta name='author' content={meta.author} />
        <meta name='language' content='English' />
        <meta name='robots' content='index, follow' />
        <meta name='theme-color' content='#ffffff' />
        <link rel='canonical' href={fullUrl} />
        <meta name='keywords' content={meta.keywords} />
      </Helmet>

      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${env.GA_TRACKING_ID}`}
        strategy='afterInteractive'
      />
      <Script
        id='gtag-init'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${env.GA_TRACKING_ID}');
          `,
        }}
      />

      <Script
        id='ldjson-schema'
        type='application/ld+json'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getStructuredData(fullUrl)),
        }}
      />
    </>
  );
};

export default SEOHead;
