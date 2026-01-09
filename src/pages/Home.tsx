import { useGetLanding } from "@/features/landing/api";
import ProductItem from "@/features/products/components/ProductItem";
import BlogItem from "@/features/blogs/components/BlogItem";
import type { ProductItemTypes } from "@/types/product";
import Loading from "@/components/ui/loading";
import OurServices from "@/components/OurServices";
import OurMarketplace from "@/components/OurMarketplace";
import Newsletter from "@/components/Newsletter";
import SEO from "@/components/SEO";
import { env } from "@/config/env";
import { websiteSchema } from "@/utils/seo-schemas";
import BannerSlider from "@/features/landing/components/BannerSlider";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import BrandSlider from "@/features/landing/components/BrandSlider";
import { useGetProductBrands } from "@/features/products/api";
import { Link } from "react-router";
import { useGetFlashSales } from "@/features/flash-sale/api";
import type { FlashSaleScheduleTypes } from "@/types/flash-sale";
import CountdownBlocks from "@/components/ui/countdown-blocks";
import FlashSaleSlider from "@/features/flash-sale/components/FlashSaleSlider";
import { paths } from "@/config/paths";

function HomePage() {
  const { data: landing, isLoading } = useGetLanding();
  const { data: brands, isLoading: isLoadingBrands } = useGetProductBrands();
  const { data: flashSales, isLoading: isLoadingFlashSales } =
    useGetFlashSales();

  const getRunningFlashSale = (flashSales?: FlashSaleScheduleTypes[]) =>
    flashSales?.find((sale) => sale.status === "running");

  const runningFlashSale = getRunningFlashSale(flashSales);

  return (
    <>
      <SEO
        title="Home"
        description="Belanja parfum original dengan pilihan aroma eksklusif, promo harian, dan layanan pengiriman cepat hanya di JAF Parfum's."
        keywords="toko parfum, parfum original, parfum pria, parfum wanita, diskon parfum, jual parfum online, parfum murah, parfum branded"
        canonical={`${env.APP_URL}/`}
        ogType="website"
        ogImage={`${env.APP_URL}/images/og-cover.png`}
        ogImageAlt="JAF Parfum's - Koleksi Parfum Terlengkap"
        structuredData={[
          websiteSchema,
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": `${env.APP_URL}/#webpage`,
            url: `${env.APP_URL}/`,
            name: "Home | JAF Parfum's",
            description:
              "Belanja parfum original dengan pilihan aroma eksklusif, promo harian, dan layanan pengiriman cepat hanya di JAF Parfum's.",
            isPartOf: {
              "@id": `${env.APP_URL}/#website`,
            },
          },
        ]}
      />

      <Navbar />

      <main
        id="main-content"
        className="main-content mb-0"
        role="main"
        tabIndex={-1}
      >
        {/* Banner slider */}
        <section>
          <div className="container">
            <BannerSlider banners={landing?.banners || []} />
          </div>
        </section>

        {/* Brand section */}
        <section className="mt-5 mt-lg-6">
          <div className="container">
            <div className="d-flex justify-content-between align-items-end mb-3">
              <div>
                <h2 className="h4 mb-1">Belanja Berdasarkan Brand</h2>
                <p className="text-secondary mb-0">
                  Jelajahi koleksi parfum dari brand-brand terbaik pilihan kami.
                </p>
              </div>
            </div>

            {isLoadingBrands && <Loading className="py-4" />}

            {brands && brands.length > 0 && <BrandSlider brands={brands} />}
          </div>
        </section>

        {/* Flash Sale section */}
        <section className="mt-5 mt-lg-6">
          <div className="container">
            <div className="flash-sale-home-header mb-4">
              <div className="d-flex flex-column gap-1">
                <span className="text-primary fw-semibold text-uppercase small flash-sale-home-label">
                  Promo Terbatas
                </span>
                <div className="d-flex align-items-center flex-wrap gap-3 flash-sale-home-meta">
                  <h2 className="h4 mb-0">Flash Sale Eksklusif</h2>
                  {runningFlashSale?.end_at && (
                    <div className="flash-sale-home-countdown">
                      <CountdownBlocks
                        targetDate={runningFlashSale.end_at}
                        size="sm"
                      />
                    </div>
                  )}
                </div>
                <p className="text-secondary mb-0">
                  Kejar diskon tercepat sebelum waktunya habis!
                </p>
              </div>
              <Link to={paths.flashSale.root()} className="flash-sale-home-cta">
                Lihat Semua <i className="bi bi-arrow-right ms-1"></i>
              </Link>
            </div>

            {isLoadingFlashSales && <Loading className="py-4" />}

            {runningFlashSale && (
              <FlashSaleSlider products={runningFlashSale.products || []} />
            )}
          </div>
        </section>
        {/* End Flash Sale section */}

        {/* New arrivals */}
        <section className="mt-5 mt-lg-6">
          <div className="container">
            <div className="d-flex justify-content-between align-items-end mb-3">
              <div>
                <h2 className="h4 mb-1">Produk Terbaru</h2>
                <p className="text-secondary mb-0">
                  Wangi terkini untuk lengkapi gaya Anda setiap hari.
                </p>
              </div>
              <Link
                to={paths.products.root()}
                className="btn btn-link d-none d-md-inline-flex"
              >
                Jelajahi Produk <i className="bi bi-arrow-right ms-2"></i>
              </Link>
            </div>

            {isLoading && <Loading className="py-4" />}

            {landing?.products.length === 0 && (
              <p className="text-center text-secondary py-5">
                Produk belum tersedia saat ini.
              </p>
            )}

            {landing?.products && landing?.products.length > 0 && (
              <div className="row g-3">
                {landing.products.map((product: ProductItemTypes) => (
                  <div className="col-6 col-md-3 col-lg-2" key={product.id}>
                    <ProductItem
                      product={product}
                      showSoldCount={false}
                      showRating={false}
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="text-center mt-4 d-md-none">
              <Link to={paths.products.root()} className="btn btn-outline-primary">
                Jelajahi Produk
              </Link>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="mt-5 mt-lg=6">
          <div className="container">
            <div className="text-center mb-4">
              <h2 className="h4 mb-1">Kenapa Pilih JAF Parfum's ?</h2>
              <p className="text-secondary mb-0">
                Layanan istimewa untuk pengalaman belanja makin berkesan.
              </p>
            </div>
            <OurServices />
          </div>
        </section>

        {/* Outlet banner with overlay CTA */}
        <section className="mt-5 mt-lg-6">
          <div className="container">
            <div className="overflow-hidden rounded-3 position-relative">
              <img
                src="/images/outlets.jpg"
                alt="Kunjungi Outlet Resmi JAF Parfum"
                className="w-100 h-100 object-fit-cover"
                loading="lazy"
              />
              <div
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,.45), rgba(0,0,0,0))",
                }}
              />
              <div className="position-absolute bottom-0 start-0 w-100">
                <div className="p-3 p-md-4 d-flex justify-content-between align-items-end">
                  <div className="d-none d-md-block">
                    <h3
                      className="h5 mb-1 text-white"
                      style={{ textShadow: "0 2px 8px rgba(0,0,0,.6)" }}
                    >
                      Kunjungi Outlet Kami
                    </h3>
                    <p className="text-white-50 mb-0 small">
                      Coba langsung koleksi terbaik kami di toko.
                    </p>
                  </div>
                  <Link to={paths.contact.root()} className="btn btn-light btn-sm">
                    Lihat Lokasi
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blogs */}
        <section className="mt-5 mt-lg-6">
          <div className="container">
            <div className="d-flex justify-content-between align-items-end mb-3">
              <div>
                <h2 className="h4 mb-1">Artikel Terbaru</h2>
                <p className="text-secondary mb-0">
                  Tips & inspirasi memilih parfum favorit Anda.
                </p>
              </div>
              <Link to={paths.blog.root()} className="btn btn-link d-none d-md-inline-flex">
                Jelajahi Artikel <i className="bi bi-arrow-right ms-2"></i>
              </Link>
            </div>

            {isLoading && <Loading className="py-5" />}

            {landing?.blogs.length === 0 && (
              <p className="text-center text-secondary py-5">
                Belum ada artikel.
              </p>
            )}

            {landing?.blogs && landing?.blogs.length > 0 && (
              <div className="row g-4">
                {landing.blogs.slice(0, 4).map((blog) => (
                  <div className="col-12 col-md-4 col-lg-3" key={blog.id}>
                    <BlogItem blog={blog} />
                  </div>
                ))}
              </div>
            )}

            <div className="text-center mt-4 d-md-none">
              <Link to={paths.blog.root()} className="btn btn-outline-primary">
                Baca Semua
              </Link>
            </div>
          </div>
        </section>

        {/* Marketplace */}
        <section className="mt-5 mt-lg-6">
          <div className="container">
            <div className="text-center mb-4">
              <h2 className="h4 mb-1">Belanja di Marketplace Favorit Anda</h2>
              <p className="text-secondary mb-0">
                Official store kami hadir di berbagai platform.
              </p>
            </div>
            <OurMarketplace />
          </div>
        </section>
        {/* End Marketplace */}

        {/* Newsletter */}
        <section className="mt-5 mt-lg-6">
          <Newsletter />
        </section>
        {/* End Newsletter */}
      </main>

      <Footer />
    </>
  );
}

export default HomePage;
