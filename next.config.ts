import type { NextConfig } from 'next'
import { withContentCollections } from '@content-collections/next'
import NextBundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = NextBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })
const withContentCollectionsTyped = withContentCollections as (config: NextConfig) => NextConfig

// You might need to insert additional domains in script-src if you are using external services
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' umami.is *.umami.is hcaptcha.com *.hcaptcha.com;
  worker-src 'self' 'unsafe-eval' 'unsafe-inline' cloudflare.com *.cloudflare.com;
  style-src 'self' 'unsafe-inline' hcaptcha.com *.hcaptcha.com googleapis.com *.googleapis.com;
  img-src * blob: data:;
  media-src *.s3.amazonaws.com;
  connect-src * hcaptcha.com *.hcaptcha.com;
  font-src 'self' gstatic.com *.gstatic.com;
  frame-src giscus.app hcaptcha.com *.hcaptcha.com;
`

const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, ''),
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
]

const nextConfig: () => NextConfig = () => {
  const plugins: Array<(config: NextConfig) => NextConfig> = [
    withContentCollectionsTyped,
    withBundleAnalyzer,
  ]

  return plugins.reduce<NextConfig>((acc, next) => next(acc), {
    allowedDevOrigins: ['localhost.com'],
    reactStrictMode: true,
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    images: {
      remotePatterns: [],
    },
    turbopack: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: securityHeaders,
        },
      ]
    },
  })
}

export default nextConfig
