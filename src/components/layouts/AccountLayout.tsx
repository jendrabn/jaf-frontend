import { type PropsWithChildren, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, Nav } from "react-bootstrap";
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
      className="flex-column"
      variant="pills"
      as={"ul"}
    >
      {menus.map((menu) => (
        <Nav.Item key={menu.to} as={"li"}>
          <NavLink
            to={menu.to}
            className={({ isActive }) =>
              `nav-link link-body-emphasis fw-medium active-text-white ${
                isActive ? "active" : ""
              }`
            }
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
        className="main-content"
        role="main"
        tabIndex={-1}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-2 mb-3 ">
              {/* Desktop Only */}
              <div className="">
                <NavAccount />
              </div>
              {/* End Desktop Only */}
            </div>

            <div className="col-lg-10">
              <Card className="" body border="primary">
                <Card.Header>
                  <h5 className="fw-bold" style={{ letterSpacing: 1.125 }}>
                    {title}
                  </h5>
                </Card.Header>
                <Card.Body>{children}</Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default AccountLayout;
