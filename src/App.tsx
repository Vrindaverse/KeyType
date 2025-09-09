import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AnimatedRoutes from "./AnimateRoutes";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Loader from "./components/Loader";

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <Router>
      {loading && <Loader onFinish={() => setLoading(false)} />}
      {!loading && (
        <>
          <Navbar />
          <AnimatedRoutes />
          <Footer />
        </>
      )}
    </Router>
  );
}
