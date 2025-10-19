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
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { ToastContainer, toast } from "react-toastify";
function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router>
          <div className="App">
            <Helmet>
              <title>DondaX - #1 Electric Motorcycles & Automobiles in Nigeria | Leading EV Bikes</title>
              <meta name="description" content="Nigeria's premier electric motorcycle manufacturer. Discover our range of eco-friendly electric bikes and automobiles. Premium quality, affordable prices, nationwide delivery and service across Lagos, Abuja and other parts of Nigeria ." />
              <meta name="keywords" content="electric motorcycles Nigeria, electric bikes Lagos, DondaX, eco-friendly motorcycles, electric automobiles Nigeria, EV bikes Nigeria, motorcycle price Nigeria, electric scooter Lagos, green transportation Nigeria, Adventure Model, GN Model, Sport Model, Urban Model" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <meta name="theme-color" content="#000000" />
              <meta property="og:title" content="DondaX - Nigeria's Leading Electric Motorcycle Manufacturer" />
              <meta property="og:description" content="Discover Nigeria's finest electric motorcycles. Eco-friendly, cost-effective, and built for African roads." />
              <meta name="geo.region" content="NG" />
              <meta name="geo.placename" content="Nigeria" />
              <link rel="canonical" href="https://www.dondax.com" />
            </Helmet>
            <Navbar />
            <Routes>
              <Route path="/" element={
                <>
                  <Helmet>
                    <title>DondaX - Nigeria's Premier Electric Motorcycle & Automobile Company</title>
                    <meta name="description" content="Transform your ride with DondaX electric motorcycles. Leading innovation in Nigeria's EV market with sustainable, powerful, and cost-effective electric bikes. Available in Lagos, Abuja, and nationwide." />
                    <meta property="og:title" content="DondaX - Premium Electric Motorcycles in Nigeria" />
                    <meta property="og:description" content="Experience the future of transportation with DondaX electric motorcycles. Designed for Nigerian roads, backed by nationwide service." />
                  </Helmet>
                  <Hero />
                  <About />
                  <Contact />
                </>
              } />
            
            <Route path="/blog" element={
                <>
                  <Helmet>
                    <title>DondaX - Blog</title>
                    <meta name="description" content="Stay updated with the latest news, insights, and stories from DondaX motorcycles." />
                  </Helmet>
                  <Blog />
                </>
              } />
              <Route path="/order" element={
                <>
                  <Helmet>
                    <title>Buy Electric Motorcycles in Nigeria | DondaX EV Bikes for Sale</title>
                    <meta name="description" content="Order your DondaX electric motorcycle today. Affordable prices, nationwide delivery in Nigeria. Choose from Adventure, GN, Sport, and Urban models. Available in Lagos, Abuja, Port Harcourt." />
                    <meta property="og:title" content="Purchase DondaX Electric Motorcycles - Best Prices in Nigeria" />
                    <meta property="og:description" content="Buy your electric motorcycle today. Nationwide delivery, excellent after-sales service, and flexible payment options available." />
                  </Helmet>
                  <Order />
                </>
              } />
              <Route path="/products/gn-model" element={
                <>
                  <Helmet>
                    <title>DondaX - GN Model</title>
                    <meta name="description" content="Discover the powerful and versatile DondaX GN Model. Experience premium performance and innovative design." />
                  </Helmet>
                  <GNModel />
                </>
              } />
              <Route path="/blog/dondax-gn-model" element={
                <>
                  <Helmet>
                    <title>DondaX - GN Model Story</title>
                    <meta name="description" content="Learn about the development and features of our revolutionary GN Model motorcycle." />
                  </Helmet>
                  <DondaXGNstory />
                </>
              } />
            {/* Add other routes here */}
          </Routes>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
