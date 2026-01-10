import { Card } from "react-bootstrap";
import { Link } from "react-router";
import SEO from "@/components/SEO";
import { paths } from "@/config/paths";

const NotFound = () => {
  return (
    <>
      <SEO
        title="404 - Halaman Tidak Ditemukan"
        description="Maaf, halaman yang Anda cari tidak ditemukan."
        noIndex={true}
        noFollow={false}
      />

      <a
        href="#main-content"
        className="skip-link"
        onClick={() => {
          const el = document.getElementById("main-content");
          if (el) {
            el.focus();
          }
        }}
      >
        Lewati ke konten utama
      </a>

      <main
        id="main-content"
        className="d-flex align-items-center min-dvh-100"
        role="main"
        tabIndex={-1}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-6 col-lg-4">
              <Card>
                <Card.Body className="text-center px-4 py-5">
                  <h1
                    className="card-title mb-3 fw-bold"
                    style={{ letterSpacing: "10px" }}
                  >
                    404
                  </h1>
                  <Card.Text>Halaman Tidak Ditemukan</Card.Text>
                  <Card.Text>Halaman yang Anda cari tidak tersedia.</Card.Text>
                  <Card.Text>
                    Silakan periksa kembali URL atau kembali ke halaman utama.
                  </Card.Text>

                  <Link to={paths.landing.root()} className="btn btn-primary">
                    <i className="bi bi-arrow-left me-2"></i>Kembali ke Beranda
                  </Link>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default NotFound;
