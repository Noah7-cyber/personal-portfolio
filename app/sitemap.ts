import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  return ['', '/resume', '/gallery'].map((path) => ({
    url: siteUrl + path,
    lastModified: new Date(),
  }));
}
