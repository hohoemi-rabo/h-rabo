import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/privacy', '/_next/', '/api/'],
    },
    sitemap: 'https://hohoemi-lab.com/sitemap.xml',
  }
}