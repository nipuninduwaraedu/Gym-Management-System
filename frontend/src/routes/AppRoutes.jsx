import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import About from "../pages/About";
import Pricing from "../pages/Pricing";
import Contact from "../pages/Contact";

function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/about" element={<About />} />

      <Route path="/pricing" element={<Pricing />} />

      <Route path="/contact" element={<Contact />} />

    </Routes>
  );
}

export default AppRoutes;