import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import About from "../pages/About";
import Pricing from "../pages/Pricing";
import Contact from "../pages/Contact";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Layout */}
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />

        <Route path="about" element={<About />} />

        <Route path="pricing" element={<Pricing />} />

        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;