import {
  forwardRef,
  type ButtonHTMLAttributes,
  type MouseEvent,
  useState,
} from "react";
import { Link, NavLink } from "react-router";
import SearchBar from "@/components/SearchBar";
import { useAuthState } from "@/contexts/AuthContext";
import {
  useGetProductBrands,
  useGetProductCategories,
} from "@/features/products/api";
import { useLogout } from "@/features/auth/api";
import { useGetUnreadCount } from "@/features/notifications/api/get-notifications";
import { useCartState } from "@/contexts/CartContext";
import { removeAuthToken } from "@/utils/functions";
import ThemeToggle from "@/components/ThemeToggle";
import Logo from "@/components/Logo";
import { Collapse, Dropdown, Image } from "react-bootstrap";
import { env } from "@/config/env";
import { paths } from "@/config/paths";

type NavDropdownToggleProps = ButtonHTMLAttributes<HTMLButtonElement>;

const NavDropdownToggle = forwardRef<HTMLButtonElement, NavDropdownToggleProps>(
  ({ children, className, onClick, ...rest }, ref) => {
    const toggleClassName = ["nav-link dropdown-toggle", className]
      .filter(Boolean)
      .join(" ");

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      onClick?.(event);
    };

    return (
      <button
        ref={ref}
        type="button"
        className={toggleClassName}
        onClick={handleClick}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

NavDropdownToggle.displayName = "NavDropdownToggle";

const Navbar = () => {
  const { isAuthenticated, user } = useAuthState();

  const logoutMutation = useLogout();

  const { data: categories } = useGetProductCategories();
  const { data: brands } = useGetProductBrands();
  const { carts } = useCartState();
  const { data: unreadCount } = useGetUnreadCount();
  const unreadTotal = typeof unreadCount === "number" ? unreadCount : 0;
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(true);

  const handleLogout = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    logoutMutation.mutate(undefined, {
      onSettled: () => {
        removeAuthToken();

        window.location.reload();
      },
    });
  };

  return (
    <>
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

      <header className="sticky-top">
        <div className="d-none d-lg-block py-2 border-bottom topbar">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center small">
              <div className="d-flex align-items-center gap-3">
                <NavLink className="text-muted" to={paths.about.root()}>
                  Tentang Kami
                </NavLink>
                <NavLink className="text-muted" to={paths.contact.root()}>
                  Kontak
                </NavLink>
                <NavLink className="text-muted" to={paths.help.root()}>
                  Bantuan
                </NavLink>
                <NavLink className="text-muted" to={paths.faq.root()}>
                  FAQs
                </NavLink>
              </div>
              {env.FREE_SHIPPING_100K && env.FREE_SHIPPING_100K === true && (
                <div>
                  <p className="mb-0 text-muted">
                    Gratis ongkir untuk semua pesanan di atas 100k
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <nav className="navbar navbar-expand-lg border-bottom">
          <div className="container">
            <NavLink
              className="navbar-brand d-flex align-items-center d-none d-lg-block"
              to={paths.landing.root()}
            >
              <Logo className="img-fluid" />
            </NavLink>

            <SearchBar className="flex-grow-1 d-lg-none mx-2" />

            <button
              className="navbar-toggler navbar-toggler-custom d-lg-none"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-line"></span>
              <span className="navbar-toggler-line"></span>
              <span className="navbar-toggler-line"></span>
            </button>
            <div
              className="collapse navbar-collapse align-items-center"
              id="navbarSupportedContent"
            >
              <div className="d-none d-lg-flex w-100 align-items-center">
                <SearchBar className="mx-4 d-none d-lg-block" />

                <ul className="navbar-nav nav-primary gap-2">
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        "nav-link " + (isActive ? "active" : "")
                      }
                      to={paths.landing.root()}
                    >
                      Home
                    </NavLink>
                  </li>
                  <Dropdown as="li" className="nav-item">
                    <Dropdown.Toggle
                      as={NavDropdownToggle}
                      id="nav-dropdown-categories"
                    >
                      Kategori
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {categories?.map((category) => (
                        <Dropdown.Item
                          as={Link}
                          key={category.id}
                          to={`/products?category_id=${category.id}`}
                        >
                          {category.name}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown as="li" className="nav-item">
                    <Dropdown.Toggle
                      as={NavDropdownToggle}
                      id="nav-dropdown-brands"
                    >
                      Brand
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {brands?.map((brand) => (
                        <Dropdown.Item
                          as={Link}
                          key={brand.id}
                          to={`/products?brand_id=${brand.id}`}
                        >
                          {brand.name}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        "nav-link " + (isActive ? "active" : "")
                      }
                      to={paths.products.root()}
                    >
                      Produk
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        "nav-link " + (isActive ? "active" : "")
                      }
                      to={paths.blog.root()}
                    >
                      Blog
                    </NavLink>
                  </li>
                </ul>

                <ul className="navbar-nav nav-actions ms-lg-auto gap-2 align-items-lg-center">
                  {isAuthenticated ? (
                    <>
                      <li className="nav-item">
                        <NavLink
                          className="nav-link"
                          to={paths.account.notifications()}
                          title="Notifikasi"
                        >
                          <div className="position-relative d-inline-block">
                            <i className="bi bi-bell fs-5"></i>
                            {unreadTotal > 0 && (
                              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {unreadTotal > 99 ? "99+" : unreadTotal}
                              </span>
                            )}
                          </div>
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          className="nav-link"
                          to={paths.cart.root()}
                          title="Keranjang Belanja"
                        >
                          <div className="position-relative d-inline-block">
                            <i className="bi bi-cart2 fs-5"></i>
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                              {carts?.length}
                            </span>
                          </div>
                        </NavLink>
                      </li>
                      <Dropdown as="li" className="nav-item">
                        <Dropdown.Toggle
                          as={NavDropdownToggle}
                          className="nav-user-toggle d-flex align-items-center"
                          id="nav-dropdown-account"
                          title="Akun Saya"
                        >
                          <Image
                            src={user?.avatar}
                            width={32}
                            height={32}
                            roundedCircle
                            className="border border-primary border-2"
                          />
                        </Dropdown.Toggle>

                        <Dropdown.Menu align="end" className="nav-user-menu">
                          <Dropdown.Item
                            as={Link}
                            to={paths.account.profile()}
                            className="nav-user-item"
                          >
                            Profil
                          </Dropdown.Item>
                          <Dropdown.Item
                            as={Link}
                            to={paths.account.orders.root()}
                            className="nav-user-item"
                          >
                            Pesanan
                          </Dropdown.Item>
                          <Dropdown.Item
                            as={Link}
                            to={paths.account.wishlist()}
                            className="nav-user-item"
                          >
                            Wishlist
                          </Dropdown.Item>
                          <Dropdown.Item
                            as={Link}
                            to={paths.account.notifications()}
                            className="nav-user-item"
                          >
                            Notifikasi
                          </Dropdown.Item>
                          <Dropdown.Item
                            as={Link}
                            to={paths.account.changePassword()}
                            className="nav-user-item"
                          >
                            Ubah Password
                          </Dropdown.Item>

                          <Dropdown.Divider />

                          <Dropdown.Item
                            as={Link}
                            to="/"
                            className="nav-user-item text-danger nav-user-logout"
                            onClick={handleLogout}
                          >
                            Logout
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </>
                  ) : (
                    <>
                      <li className="nav-item d-flex flex-column flex-lg-row gap-2 mt-3 mt-lg-0">
                        <Link
                          className="btn btn-outline-primary px-lg-3 py-lg-1 rounded-pill"
                          to={paths.auth.login.root()}
                        >
                          Masuk
                        </Link>

                        <Link
                          className="btn btn-primary text-white px-lg-3 py-lg-1 rounded-pill"
                          to={paths.auth.register()}
                        >
                          Daftar
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>

              <div className="d-lg-none mobile-menu">
                {isAuthenticated ? (
                  <button
                    type="button"
                    className="mobile-user-card"
                    onClick={() => {
                      setIsAccountMenuOpen((prev) => !prev);
                    }}
                    aria-expanded={isAccountMenuOpen}
                  >
                    <Image
                      src={user?.avatar}
                      width={44}
                      height={44}
                      roundedCircle
                      className="border border-primary border-2"
                    />
                    <div className="mobile-user-info">
                      <div className="fw-semibold">{user?.name}</div>
                      <div className="text-muted small">{user?.email}</div>
                    </div>
                    <span
                      className={`ms-auto mobile-chevron${
                        isAccountMenuOpen ? " is-open" : ""
                      }`}
                      aria-hidden="true"
                    ></span>
                  </button>
                ) : (
                  <div className="mobile-guest-card">
                    <div className="d-flex flex-column gap-2 mt-3 w-100">
                      <Link
                        className="btn btn-outline-primary w-100 rounded-pill"
                        to={paths.auth.login.root()}
                      >
                        Masuk
                      </Link>
                      <Link
                        className="btn btn-primary text-white w-100 rounded-pill"
                        to={paths.auth.register()}
                      >
                        Daftar
                      </Link>
                    </div>
                  </div>
                )}

                {isAuthenticated ? (
                  <Collapse in={isAccountMenuOpen}>
                    <div className="mobile-menu-section">
                      <div className="mobile-menu-title">Akun</div>
                      <NavLink
                        className="mobile-menu-item"
                        to={paths.account.profile()}
                      >
                        <span>Profil</span>
                      </NavLink>
                      <NavLink
                        className="mobile-menu-item"
                        to={paths.account.orders.root()}
                      >
                        <span>Pesanan</span>
                      </NavLink>
                      <NavLink
                        className="mobile-menu-item"
                        to={paths.account.wishlist()}
                      >
                        <span>Wishlist</span>
                      </NavLink>
                      <NavLink
                        className="mobile-menu-item"
                        to={paths.account.notifications()}
                      >
                        <span>Notifikasi</span>
                      </NavLink>
                      <NavLink
                        className="mobile-menu-item"
                        to={paths.account.changePassword()}
                      >
                        <span>Ubah Password</span>
                      </NavLink>
                    </div>
                  </Collapse>
                ) : null}

                <div className="mobile-menu-divider"></div>

                <div className="mobile-menu-section">
                  <div className="mobile-menu-title">Menu</div>
                  <NavLink
                    className="mobile-menu-item"
                    to={paths.landing.root()}
                  >
                    <span>Beranda</span>
                  </NavLink>
                  <details className="mobile-menu-details">
                    <summary className="mobile-menu-item">
                      <span>Kategori</span>
                    </summary>
                    <div className="mobile-menu-sublist">
                      {categories?.map((category) => (
                        <Link
                          className="mobile-menu-subitem"
                          key={category.id}
                          to={`/products?category_id=${category.id}`}
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </details>
                  <details className="mobile-menu-details">
                    <summary className="mobile-menu-item">
                      <span>Brand</span>
                    </summary>
                    <div className="mobile-menu-sublist">
                      {brands?.map((brand) => (
                        <Link
                          className="mobile-menu-subitem"
                          key={brand.id}
                          to={`/products?brand_id=${brand.id}`}
                        >
                          {brand.name}
                        </Link>
                      ))}
                    </div>
                  </details>
                  <NavLink
                    className="mobile-menu-item"
                    to={paths.products.root()}
                  >
                    <span>Produk</span>
                  </NavLink>
                  <NavLink className="mobile-menu-item" to={paths.blog.root()}>
                    <span>Blog</span>
                  </NavLink>
                  <div className="mobile-menu-item">
                    <span>Tema</span>
                    <span className="ms-auto">
                      <ThemeToggle />
                    </span>
                  </div>
                </div>

                {isAuthenticated ? (
                  <div className="mobile-menu-footer">
                    <Link
                      className="btn btn-outline-danger w-100 rounded-pill d-flex align-items-center justify-content-center gap-2"
                      to="/"
                      onClick={handleLogout}
                    >
                      <span className="fw-semibold">Keluar</span>
                    </Link>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="d-none d-lg-flex align-items-center ms-3">
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
