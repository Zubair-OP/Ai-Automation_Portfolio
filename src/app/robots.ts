import type { MetadataRoute } from 'next'
import { PERSON } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${PERSON.siteUrl}/sitemap.xml`,
  }
}