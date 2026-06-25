import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../styles/MainLayout.css";

function MainLayout({ children }) {
  return (
    <div className="layout">

      <Navbar />

      <main className="content">
        {children}
      </main>

      <Footer />

    </div>
  );
}

export default MainLayout;