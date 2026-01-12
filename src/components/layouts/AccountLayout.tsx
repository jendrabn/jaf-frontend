import { type PropsWithChildren, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Nav } from "react-bootstrap";
import { NavLink, useLocation } from "react-router";
import { paths } from "@/config/paths";

type AuthLayoutProps = PropsWithChildren & {
  title: string;
};

const NavAccount = () => {
  const location = useLocation();

  const menus = [
    { to: paths.account.profile(), label: "Profil" },
    { to: paths.account.orders.root(), label: "Pesanan" },
    { to: paths.account.wishlist(), label: "Wishlist" },
    { to: paths.account.notifications(), label: "Notifikasi" },
    { to: paths.account.changePassword(), label: "Ubah Password" },
  ];

  return (
    <Nav
      defaultActiveKey={location.pathname}
      className="account-nav flex-column"
      variant="pills"
      as={"ul"}
    >
      {menus.map((menu) => (
        <Nav.Item key={menu.to} as={"li"}>
          <NavLink
            to={menu.to}
            className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
          >
            <i className="bi bi-chevron-right me-2"></i> {menu.label}
          </NavLink>
        </Nav.Item>
      ))}
    </Nav>
  );
};

const AccountLayout = ({ children, title }: AuthLayoutProps) => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <Navbar />

      <main
        id="main-content"
        className="account-layout"
        role="main"
        tabIndex={-1}
      >
        <div className="container">
          <div className="row g-4">
            <div className="col-12 col-lg-3 d-none d-lg-block">
              <div className="account-sidebar">
                <NavAccount />
              </div>
            </div>

            <div className="col-12 col-lg-9">
              <div className="account-content">
                <div className="account-content-header">
                  <h1 className="h4 mb-0 text-body-emphasis">{title}</h1>
                </div>
                <div className="account-content-body">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default AccountLayout;
