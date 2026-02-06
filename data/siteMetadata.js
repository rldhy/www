const siteMetadata = {
  title: 'Ritwik Lodhiya | Engineer, Problem Solver',
  author: 'Ritwik Lodhiya',
  headerTitle: 'RITWIK LODHIYA',
  description: 'Sharing my projects, hobbies, and interests.',
  footerTitle: 'RLODHIYA.DEV',
  language: 'en-us',
  theme: 'system', // system, dark or light
  siteUrl: 'https://rlodhiya.dev',
  siteRepo: 'https://github.com/rldhy/www',
  siteLogo: '/static/images/logo.png',
  socialBanner: '/static/images/social-banner.png',
  // mastodon: 'https://mastodon.social',
  email: 'hello@rlodhiya.dev',
  github: 'https://github.com/rldhy',
  // x: 'https://x.com',
  // twitter: 'https://twitter.com',
  // facebook: 'https://facebook.com',
  // youtube: 'https://youtube.com',
  linkedin: 'https://www.linkedin.com/in/rlodhiya',
  // threads: 'https://www.threads.net',
  // instagram: 'https://www.instagram.com',
  // medium: 'https://medium.com',
  // bluesky: 'https://bsky.app/',
  locale: 'en-US',
  analytics: {
    // If you want to use an analytics provider you have to add it to the
    // content security policy in the `next.config.js` file.
    // supports Plausible, Simple Analytics, Umami, Posthog or Google Analytics.
    umamiAnalytics: {
      umamiWebsiteId: process.env.NEXT_UMAMI_ID, // e.g. 123e4567-e89b-12d3-a456-426614174000
      src: 'https://us.umami.is/script.js',
    },
  },
  search: {
    provider: 'kbar', // kbar or algolia
    kbarConfig: {
      searchDocumentsPath: 'search.json', // path to load documents to search
    },
  },
}

export default siteMetadata
