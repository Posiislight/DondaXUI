import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { ThemeProvider } from "./context/ThemeContext";
import Blog from "./pages/Blog";
import Order from "./pages/order";
import GNModel from "./pages/products/GNModel";
import DondaXGNstory from "./pages/blogStories/DondaXGNstory..tsx";
import { ToastContainer, toast } from "react-toastify";
function App() {
  return (
    <ThemeProvider>
      <Router>
      
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <About />
                <Contact />
              </>
            } />
            <Route path="/blog" element={<Blog />} />
            <Route path="/order" element={<Order />} />
            <Route path="/products/gn-model" element={<GNModel />} />
            <Route path="/blog/dondax-gn-model" element={<DondaXGNstory />} />
            {/* Add other routes here */}
          </Routes>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
