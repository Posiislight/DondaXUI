import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { ThemeProvider } from "./context/ThemeContext";

// DondaX redesign (mockup) — dark, cinematic EV brand site
import Home from "./pages/redesign/Home";
import Products from "./pages/redesign/Products";
import ProductDetail from "./pages/redesign/ProductDetail";
import OrderPage from "./pages/redesign/OrderPage";
import GNHub from "./pages/redesign/GNHub";

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router>
          <div className="App">
            <Helmet>
              <title>DondaX — Electric Motorcycles Designed in Nigeria</title>
              <meta
                name="description"
                content="Cutting-edge electric motorcycles engineered for the future of urban mobility across Africa. Explore the DondaX GN Model — 100km range, 120km/h top speed, fast charging."
              />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <meta name="theme-color" content="#0a0a0a" />
              <meta property="og:title" content="DondaX — Electric Motorcycles Designed in Nigeria" />
              <meta
                property="og:description"
                content="Ride electric. Ride DondaX. Cutting-edge electric motorcycles for African cities."
              />
              <meta name="geo.region" content="NG" />
              <meta name="geo.placename" content="Nigeria" />
              <link rel="canonical" href="https://www.dondax.com" />
            </Helmet>

            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Helmet>
                      <title>DondaX — Nigeria's Premier Electric Motorcycle Company</title>
                    </Helmet>
                    <Home />
                  </>
                }
              />
              <Route
                path="/products"
                element={
                  <>
                    <Helmet>
                      <title>DondaX Motors — Our Electric Motorcycle Lineup</title>
                    </Helmet>
                    <Products />
                  </>
                }
              />
              <Route
                path="/products/gn-model"
                element={
                  <>
                    <Helmet>
                      <title>DondaX GN Model — Electric Motorcycle</title>
                    </Helmet>
                    <ProductDetail />
                  </>
                }
              />
              <Route
                path="/order"
                element={
                  <>
                    <Helmet>
                      <title>Place an Order Request — DondaX GN Model</title>
                    </Helmet>
                    <OrderPage />
                  </>
                }
              />
              <Route
                path="/gnhub"
                element={
                  <>
                    <Helmet>
                      <title>GNHub — DondaX Stories, Media & Updates</title>
                    </Helmet>
                    <GNHub />
                  </>
                }
              />
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
