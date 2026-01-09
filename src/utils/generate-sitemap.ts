/**
 * Utility untuk generate dynamic sitemap
 *
 * CATATAN: File ini adalah contoh/template untuk generate sitemap dinamis.
 * Untuk production, Anda perlu:
 * 1. Membuat endpoint API di backend untuk generate sitemap
 * 2. Atau menggunakan build script untuk generate sitemap saat build time
 * 3. Atau menggunakan library seperti 'sitemap' npm package
 */

import { env } from "@/config/env";

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
}

/**
 * Generate sitemap XML string
 */
export function generateSitemapXML(urls: SitemapUrl[]): string {
  const urlEntries = urls
    .map(
      (url) => `
  <url>
    <loc>${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ""}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ""}
    ${url.priority !== undefined ? `<priority>${url.priority}</priority>` : ""}
  </url>`
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urlEntries}
</urlset>`;
}

/**
 * Get static pages URLs
 */
export function getStaticPages(): SitemapUrl[] {
  const baseUrl = env.APP_URL || "https://www.jaf.co.id";
  const today = new Date().toISOString().split("T")[0];

  return [
    {
      loc: `${baseUrl}/`,
      lastmod: today,
      changefreq: "daily",
      priority: 1.0,
    },
    {
      loc: `${baseUrl}/products`,
      lastmod: today,
      changefreq: "daily",
      priority: 0.9,
    },
    {
      loc: `${baseUrl}/flash-sale`,
      lastmod: today,
      changefreq: "hourly",
      priority: 0.9,
    },
    {
      loc: `${baseUrl}/blog`,
      lastmod: today,
      changefreq: "weekly",
      priority: 0.8,
    },
    {
      loc: `${baseUrl}/about`,
      lastmod: today,
      changefreq: "monthly",
      priority: 0.7,
    },
    {
      loc: `${baseUrl}/contact`,
      lastmod: today,
      changefreq: "monthly",
      priority: 0.7,
    },
    {
      loc: `${baseUrl}/faq`,
      lastmod: today,
      changefreq: "monthly",
      priority: 0.6,
    },
    {
      loc: `${baseUrl}/help`,
      lastmod: today,
      changefreq: "monthly",
      priority: 0.6,
    },
  ];
}

/**
 * Generate product URLs from API data
 *
 * @example
 * const products = await fetchAllProducts();
 * const productUrls = generateProductUrls(products);
 */
export function generateProductUrls(
  products: Array<{ slug: string; updated_at?: string }>
): SitemapUrl[] {
  const baseUrl = env.APP_URL || "https://www.jaf.co.id";

  return products.map((product) => ({
    loc: `${baseUrl}/products/${product.slug}`,
    lastmod: product.updated_at
      ? new Date(product.updated_at).toISOString().split("T")[0]
      : undefined,
    changefreq: "weekly",
    priority: 0.8,
  }));
}

/**
 * Generate blog URLs from API data
 *
 * @example
 * const blogs = await fetchAllBlogs();
 * const blogUrls = generateBlogUrls(blogs);
 */
export function generateBlogUrls(
  blogs: Array<{ slug: string; updated_at?: string }>
): SitemapUrl[] {
  const baseUrl = env.APP_URL || "https://www.jaf.co.id";

  return blogs.map((blog) => ({
    loc: `${baseUrl}/blog/${blog.slug}`,
    lastmod: blog.updated_at
      ? new Date(blog.updated_at).toISOString().split("T")[0]
      : undefined,
    changefreq: "monthly",
    priority: 0.7,
  }));
}

/**
 * Example: Generate complete sitemap
 *
 * Untuk menggunakan ini, Anda perlu:
 * 1. Fetch data dari API
 * 2. Generate sitemap XML
 * 3. Save ke file atau serve via endpoint
 */
export async function generateCompleteSitemap(): Promise<string> {
  // Get static pages
  const staticPages = getStaticPages();

  // TODO: Fetch dynamic data from API
  // const products = await api.get('/products/all');
  // const blogs = await api.get('/blogs/all');
  // const productUrls = generateProductUrls(products.data);
  // const blogUrls = generateBlogUrls(blogs.data);

  // Combine all URLs
  const allUrls = [
    ...staticPages,
    // ...productUrls,
    // ...blogUrls,
  ];

  return generateSitemapXML(allUrls);
}

/**
 * CARA PENGGUNAAN:
 *
 * Option 1: Generate saat build time
 * - Buat script di package.json: "generate-sitemap": "node scripts/generate-sitemap.js"
 * - Script akan fetch data dan generate sitemap.xml
 *
 * Option 2: Generate via backend endpoint
 * - Backend menyediakan endpoint GET /sitemap.xml
 * - Frontend redirect /sitemap.xml ke backend endpoint
 *
 * Option 3: Menggunakan library
 * - Install: npm install sitemap
 * - Gunakan library untuk generate sitemap lebih mudah
 */
