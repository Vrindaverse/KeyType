import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Play from "./pages/Play";
import Auth from "./pages/Auth"

export default function App() {
  const [] = useState(true);

  return (
    <Router>

        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/play" element={<Play />} />
          </Routes>
          <Footer />
        </>
      )
    </Router>
  );
}
