import { type PropsWithChildren, useEffect } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

function Layout({ children }: PropsWithChildren) {
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
        {children}
      </main>
      <Footer />
    </>
  );
}

export default Layout;

