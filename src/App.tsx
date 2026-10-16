import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { PAGES } from "./seo";
import Seo from "./components/Seo";

// DondaX redesign (mockup) — dark, cinematic EV brand site
import Home from "./pages/redesign/Home";
import Products from "./pages/redesign/Products";
import ProductDetail from "./pages/redesign/ProductDetail";
import OrderPage from "./pages/redesign/OrderPage";
import GNHub from "./pages/redesign/GNHub";
import NotFound from "./pages/redesign/NotFound";

// The router is supplied by the entry point: BrowserRouter in main.tsx,
// StaticRouter in entry-server.tsx (prerendering).
function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Seo {...PAGES.home} />
                <Home />
              </>
            }
          />
          <Route
            path="/products"
            element={
              <>
                <Seo {...PAGES.products} />
                <Products />
              </>
            }
          />
          <Route
            path="/products/gn-model"
            element={
              <>
                <Seo {...PAGES.gnModel} />
                <ProductDetail />
              </>
            }
          />
          <Route
            path="/order"
            element={
              <>
                <Seo {...PAGES.order} />
                <OrderPage />
              </>
            }
          />
          <Route
            path="/gnhub"
            element={
              <>
                <Seo {...PAGES.gnhub} />
                <GNHub />
              </>
            }
          />
          <Route
            path="*"
            element={
              <>
                <Seo {...PAGES.notFound} />
                <NotFound />
              </>
            }
          />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
