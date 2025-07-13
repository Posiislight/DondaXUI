import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100 dark:bg-black">
      <Navbar />
      <Hero />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;