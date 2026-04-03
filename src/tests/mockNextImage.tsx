import React from 'react';

/** Next.js <Image /> props that must not be forwarded to a DOM <img>. */
const NEXT_IMAGE_ONLY_PROPS = new Set([
  'priority',
  'fill',
  'placeholder',
  'blurDataURL',
  'sizes',
  'quality',
  'loader',
  'onLoadingComplete',
  'unoptimized',
  'overrideSrc',
]);

/**
 * Test double for next/image: forwards only DOM-safe props to <img>.
 */
export default function MockNextImage(
  props: Record<string, unknown>
): React.ReactElement {
  const domProps: Record<string, unknown> = {};
  for (const key of Object.keys(props)) {
    if (!NEXT_IMAGE_ONLY_PROPS.has(key)) {
      domProps[key] = props[key];
    }
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element -- intentional test mock
    <img {...(domProps as React.ImgHTMLAttributes<HTMLImageElement>)} />
  );
}

MockNextImage.displayName = 'MockNextImage';
