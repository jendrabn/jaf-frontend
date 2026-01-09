import { env } from "@/config/env";

const siteUrl = env.APP_URL || "https://www.jaf.co.id";
const siteName = env.APP_NAME || "JAF Parfum's";

/**
 * Organization Schema for JAF Parfum's
 */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  url: siteUrl,
  logo: `${siteUrl}/images/logo-light.png`,
  description: "Toko parfum online terlengkap dan terpercaya di Indonesia",
  foundingDate: "2009-07-20",
  founder: {
    "@type": "Person",
    name: "Muhammad Jawad",
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "ID",
    addressRegion: "Jawa Timur",
    addressLocality: "Jember",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Service",
    availableLanguage: ["Indonesian"],
  },
  sameAs: [
    "https://www.facebook.com/jafparfums",
    "https://www.instagram.com/jafparfums",
    "https://twitter.com/jafparfums",
  ],
};

/**
 * Website Schema
 */
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  url: siteUrl,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl}/products?search={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

/**
 * LocalBusiness Schema for Contact Page
 */
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteUrl}/#localbusiness`,
  name: siteName,
  image: `${siteUrl}/images/logo-light.png`,
  url: siteUrl,
  telephone: "+62-xxx-xxxx-xxxx", // Replace with actual phone
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jl. Example Street",
    addressLocality: "Jember",
    addressRegion: "Jawa Timur",
    postalCode: "68100",
    addressCountry: "ID",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -8.181028682013878,
    longitude: 113.7107621745602,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
  ],
};

/**
 * Product Schema Generator
 */
export const generateProductSchema = (product: {
  name: string;
  description: string;
  image: string;
  price: number;
  currency?: string;
  availability: "in stock" | "out of stock" | "preorder";
  brand?: string;
  sku?: string;
  rating?: number;
  reviewCount?: number;
  url: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.name,
  description: product.description,
  image: product.image,
  sku: product.sku,
  brand: product.brand
    ? {
        "@type": "Brand",
        name: product.brand,
      }
    : undefined,
  offers: {
    "@type": "Offer",
    url: product.url,
    priceCurrency: product.currency || "IDR",
    price: product.price,
    availability:
      product.availability === "in stock"
        ? "https://schema.org/InStock"
        : product.availability === "out of stock"
        ? "https://schema.org/OutOfStock"
        : "https://schema.org/PreOrder",
    priceValidUntil: new Date(
      new Date().setFullYear(new Date().getFullYear() + 1)
    )
      .toISOString()
      .split("T")[0],
  },
  aggregateRating:
    product.rating && product.reviewCount
      ? {
          "@type": "AggregateRating",
          ratingValue: product.rating,
          reviewCount: product.reviewCount,
        }
      : undefined,
});

/**
 * Article Schema Generator
 */
export const generateArticleSchema = (article: {
  title: string;
  description: string;
  image: string;
  author: string;
  publishedTime: string;
  modifiedTime?: string;
  url: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: article.title,
  description: article.description,
  image: article.image,
  author: {
    "@type": "Person",
    name: article.author,
  },
  publisher: organizationSchema,
  datePublished: article.publishedTime,
  dateModified: article.modifiedTime || article.publishedTime,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": article.url,
  },
});

/**
 * FAQPage Schema Generator
 */
export const generateFAQSchema = (
  faqs: Array<{ question: string; answer: string }>
) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});

/**
 * Breadcrumb Schema Generator
 */
export const generateBreadcrumbSchema = (
  items: Array<{ name: string; url: string }>
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

/**
 * ItemList Schema Generator (for product listings)
 */
export const generateItemListSchema = (
  products: Array<{
    name: string;
    url: string;
    image: string;
    price: number;
  }>
) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: products.map((product, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Product",
      name: product.name,
      url: product.url,
      image: product.image,
      offers: {
        "@type": "Offer",
        price: product.price,
        priceCurrency: "IDR",
      },
    },
  })),
});
