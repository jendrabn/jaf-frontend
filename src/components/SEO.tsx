import { Helmet } from "react-helmet";
import { env } from "@/config/env";

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogType?: "website" | "article" | "product" | "profile";
  ogImage?: string;
  ogImageAlt?: string;
  twitterCard?: "summary" | "summary_large_image" | "app" | "player";
  noIndex?: boolean;
  noFollow?: boolean;
  structuredData?: object | object[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  // Product-specific
  productPrice?: number;
  productCurrency?: string;
  productAvailability?: "in stock" | "out of stock" | "preorder";
  productBrand?: string;
}

export default function SEO({
  title,
  description,
  keywords,
  canonical,
  ogType = "website",
  ogImage,
  ogImageAlt,
  twitterCard = "summary_large_image",
  noIndex = false,
  noFollow = false,
  structuredData,
  author,
  publishedTime,
  modifiedTime,
  productPrice,
  productCurrency = "IDR",
  productAvailability,
  productBrand,
}: SEOProps) {
  const siteUrl = env.APP_URL || "https://www.jaf.co.id";
  const siteName = env.APP_NAME || "JAF Parfum's";

  // Format title with site name
  const fullTitle = `${title} | ${siteName}`;

  // Default OG image
  const defaultOgImage = `${siteUrl}/images/og-cover.png`;
  const ogImageUrl = ogImage || defaultOgImage;

  // Canonical URL
  const canonicalUrl =
    canonical ||
    (typeof window !== "undefined" ? window.location.href : siteUrl);

  // Robots meta
  const robotsContent =
    noIndex || noFollow
      ? `${noIndex ? "noindex" : "index"}, ${noFollow ? "nofollow" : "follow"}`
      : "index, follow";

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robotsContent} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Author */}
      {author && <meta name="author" content={author} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={ogImageUrl} />
      {ogImageAlt && <meta property="og:image:alt" content={ogImageAlt} />}
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="id_ID" />

      {/* Article-specific OG tags */}
      {ogType === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {ogType === "article" && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {ogType === "article" && author && (
        <meta property="article:author" content={author} />
      )}

      {/* Product-specific OG tags */}
      {ogType === "product" && productPrice && (
        <>
          <meta
            property="product:price:amount"
            content={productPrice.toString()}
          />
          <meta property="product:price:currency" content={productCurrency} />
        </>
      )}
      {ogType === "product" && productAvailability && (
        <meta property="product:availability" content={productAvailability} />
      )}
      {ogType === "product" && productBrand && (
        <meta property="product:brand" content={productBrand} />
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content="@jafparfums" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />
      {ogImageAlt && <meta name="twitter:image:alt" content={ogImageAlt} />}

      {/* Structured Data (JSON-LD) */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(
            Array.isArray(structuredData) ? structuredData : [structuredData]
          )}
        </script>
      )}
    </Helmet>
  );
}
