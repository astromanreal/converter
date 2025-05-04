
import type { MetadataRoute } from 'next';

// Assuming converter types are keys from your converterComponents map + new scientific ones
const converterTypes = [
  'currency', 'distance', 'weight', 'temperature', 'time',
  'volume', 'speed', 'area', 'data-storage', 'energy',
  'pressure', 'power', 'molar-mass', 'ph-calculator', 'ohms-law' // Added new types
];

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002'; // Use your actual production URL

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${siteUrl}/quiz`, // Added Quiz page
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
     {
      url: `${siteUrl}/learn`, // Added Learn page
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // Settings and History might not need to be in sitemap if noindex is set
    // {
    //   url: `${siteUrl}/settings`,
    //   lastModified: new Date(),
    //   changeFrequency: 'yearly',
    //   priority: 0.1,
    // },
    // {
    //   url: `${siteUrl}/history`,
    //   lastModified: new Date(),
    //   changeFrequency: 'never', // As it's user-specific local storage
    //   priority: 0.1,
    // },
  ];

  // Dynamic converter pages
  const converterPages: MetadataRoute.Sitemap = converterTypes.map((type) => ({
    url: `${siteUrl}/converters/${type}`,
    lastModified: new Date(), // Or fetch a last modified date if relevant
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    ...staticPages,
    ...converterPages,
  ];
}

