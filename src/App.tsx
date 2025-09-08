import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Play from "./pages/Play"

function App() {
  return (
    <div className="justify-center">
      <Router>
        <Navbar />
      <Routes>
        <Route path="/" element={<Home /> } />
        <Route path="/play" element={<Play />} />
      </Routes>
      <Footer />
      </Router>
    </div>
  )
}

export default App;