import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Footer: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <footer className="bg-[#263236] text-gray-100 pt-12 pb-4 px-4">
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row md:justify-between gap-10 md:gap-0">
        {/* Brand/Description/Socials */}
        <div className="flex-1 min-w-[200px] flex flex-col gap-4">
          <div className="text-2xl font-bold text-green mb-1">DONDA X</div>
          <p className="text-sm max-w-xs">
            Pioneering the future of electric mobility with premium motorcycles that combine cutting-edge technology, sustainable innovation, and uncompromising performance.
          </p>
          <div className="flex gap-4 mt-2">
            
            <a href="https://www.instagram.com/dondaxlimited?igsh=cGRpNXNicGU2aThr" target="_blank" rel="noopener noreferrer" className="hover:text-green transition-colors"><FaInstagram /></a>
            
            
          </div>
        </div>
        {/* Quick Links */}
        <div className="flex-1 min-w-[150px]">
          <div className="font-semibold mb-2">Quick Links</div>
          <ul className="space-y-1 text-sm">
            <li><Link to="/" className="hover:text-green transition-colors">Home</Link></li>
            {/* Gallery is not implemented, so keep as # or remove if not needed */}
            <li><a href="/products/gn-model" className="hover:text-green transition-colors">Products</a></li>
                            <li><Link to="/order" className="hover:text-green transition-colors">Place Order Request</Link></li>
            <li><a href="#contact" className="hover:text-green transition-colors">Contact</a></li>
          </ul>
        </div>
        {/* Contact Info */}
        <div className="flex-1 min-w-[180px]">
          <div className="font-semibold mb-2">Contact</div>
          <div className="text-sm space-y-1">
            <div>Lagos, Nigeria</div>
            <a href="mailto:DondaXlimited@icloud.com" className="block text-green hover:underline mt-2">DondaXlimited@icloud.com</a>
            <a href="mailto:DondaX2025@gmail.com" className="block text-green hover:underline">DondaX2025@gmail.com</a>
            <a href="tel:+8613265355246" className="block text-green hover:underline mt-2">+8613265355246</a>
            <a href="tel:+2348037789733" className="block text-green hover:underline">+2348037789733</a>
          </div>
        </div>
        {/* Newsletter/Subscribe */}
        <div className="flex-1 min-w-[220px]">
          <div className="font-semibold mb-2">Stay Updated</div>
          <p className="text-sm mb-2">Subscribe to get the latest news, updates, and exclusive offers.</p>
          <form className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="rounded-md px-3 py-2 bg-[#3a4747] text-gray-100 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-green placeholder-gray-300 text-sm"
            />
            <button
              type="submit"
              className="bg-green text-black font-semibold rounded-md py-2 text-sm hover:bg-green/90 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <hr className="my-8 border-gray-400" />
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row md:justify-between items-center gap-4 text-xs text-gray-300">
        <div>© 2024 DONDA X. All rights reserved.</div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-green transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-green transition-colors">Terms of Services</a>
          <a href="#" className="hover:text-green transition-colors">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;