import React, { useState,useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
// Black images
import black1 from "../../assets/black1.jpg";
import black2 from "../../assets/black2.jpg";
import black3 from "../../assets/black3.jpg";
import black4 from "../../assets/black4.jpg";
import black5 from "../../assets/black5.jpg";
import black6 from "../../assets/black6.jpg";
import black7 from "../../assets/black7.jpg";
import black8 from "../../assets/black8.jpg";
import black9 from "../../assets/black9.jpg";
import black10 from "../../assets/black10.jpg";
// Green images
import green1 from "../../assets/green 1.jpg";
import green2 from "../../assets/green2.jpg";
import green3 from "../../assets/green3.jpg";
import green4 from "../../assets/green4.jpg";
import green5 from "../../assets/green5.jpg";
// Red images
import red1 from "../../assets/red1.jpg";
import red2 from "../../assets/red2.jpg";
import red3 from "../../assets/red3.jpg";
import red4 from "../../assets/red4.jpg";
import red5 from "../../assets/red5.jpg";
import red6 from "../../assets/red6.jpg";

const GNModel: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  // Images for each color
  const colorImages: Record<string, string[]> = {
    "Matte Black": [black1, black2, black3, black4, black5, black6, black7, black8, black9, black10],
    "Forest Green": [green1, green2, green3, green4, green5],
    "Crimson Red": [red1, red2, red3, red4, red5, red6],
  };

  // Default color is black, default image index is 0
  const [selectedColor, setSelectedColor] = useState("Matte Black");
  const [imageIndex, setImageIndex] = useState(0);

  // When color changes, reset image index
  React.useEffect(() => {
    setImageIndex(0);
  }, [selectedColor]);

  const images = colorImages[selectedColor];

  const goToPrevious = () => {
    setImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  const goToNext = () => {
    setImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Debug log
  console.log('Selected color:', selectedColor, 'Image:', colorImages[selectedColor]);

  // Show only the 8 most important specs for users
  const specs = [
    { label: "Range", value: "70-100 KM", icon: "🚗" },
    { label: "Top Speed", value: "70-75 KM/H", icon: "⚡" },
    { label: "Peak Power", value: "5000W", icon: "🔋" },
    { label: "Battery", value: "72V/35Ah", icon: "🔋" },
    { label: "Charge Time", value: "2-4 hours", icon: "🔌" },
    { label: "Driving System", value: "3 gears", icon: "⚙️" },
    { label: "Meter Display", value: "Bluetooth mode with speaker", icon: "📱" },
  ];

  const features = [
    "Hub Motor for smooth power delivery",
    "3,000W rated, 5,000W peak power",
    "≥170N·m maximum torque",
    "0-45KM/H in 5 seconds",
    "72V 35Ah battery",
    "200mm ground clearance",
    "Front:1.6-18/Rear:2.75-16 wheels",
    "Front:2.75-18/Rear:2.75-16TL tyres",
    "Front & Rear Φ220 Disc brakes",
    "3-gear driving system",
    "13° climbing capacity",
    "All-around lighting",
    "Bluetooth meter display with speaker",
    "150KG max load",
    "1300mm wheelbase, 780mm seat height",
    "2000×850×1080mm dimensions",
  ];

  const colors = [
    { name: "Matte Black", hex: "#1a1a1a" },
    { name: "Forest Green", hex: "#228B22" },
    { name: "Crimson Red", hex: "#DC143C" },
  ];

  return (
    <div className="mt-12 min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-black dark:text-white">GN </span>
            <span className="text-green">MODEL</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            DondaX GN is a durable, city-focused electric motorcycle built for affordability and low maintenance, ideal for delivery and daily commuting.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Image, Colors, and About */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            {/* Main Image with left/right buttons */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 mb-8 shadow-lg relative flex items-center justify-center">
              <button
                onClick={goToPrevious}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-200 dark:bg-black rounded-full w-10 h-10 flex items-center justify-center z-10 hover:bg-gray-300 dark:hover:bg-gray-700"
                aria-label="Previous image"
              >
                <svg className="w-5 h-5 text-gray-700 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <img
                src={images[imageIndex]}
                alt={`GN Model Electric Motorcycle - ${selectedColor} - ${imageIndex + 1}`}
                className="w-full h-96 object-cover rounded-xl"
              />
              <button
                onClick={goToNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-200 dark:bg-black rounded-full w-10 h-10 flex items-center justify-center z-10 hover:bg-gray-300 dark:hover:bg-gray-700"
                aria-label="Next image"
              >
                <svg className="w-5 h-5 text-gray-700 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>

            {/* Color Options */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-8">
              <h3 className="text-xl font-bold mb-4">Available Colors</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.keys(colorImages).map((color) => (
                  <button
                    key={color}
                    className={`flex items-center space-x-3 p-3 rounded-lg border-2 transition-colors duration-200 focus:outline-none ${selectedColor === color ? 'border-green' : 'border-gray-200 dark:border-gray-700'}`}
                    style={{ backgroundColor: selectedColor === color ? '#e6ffe6' : 'transparent' }}
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Select ${color}`}
                  >
                    <div
                      className="w-8 h-8 rounded-full border-2 border-gray-300"
                      style={{ backgroundColor: color === 'Matte Black' ? '#1a1a1a' : color === 'Forest Green' ? '#228B22' : '#DC143C' }}
                    ></div>
                    <span className={`font-medium${selectedColor === color ? ' text-black' : ''}`}>{color}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* About the GN Model */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold mb-4">About the GN Model</h3>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                This motorcycle offers an impressive minimum range of 70km on a single charge
                </p>
                
              </div>
            </div>
          </motion.div>

          {/* Right Column - Specs and Features */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            {/* Specifications */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold mb-6">Specifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {specs.map((spec, index) => (
                  <motion.div
                    key={spec.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.05 }}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
                  >
                    <span className="text-2xl">{spec.icon}</span>
                    <div>
                      <div className="font-medium">{spec.label}</div>
                      <div className="text-green font-semibold">{spec.value}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold mb-6">Key Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.05 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-2 h-2 bg-green rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/order"
                className="flex-1 bg-green text-black font-bold py-4 px-8 rounded-lg text-center hover:bg-green/90 transition-colors duration-300 shadow-lg"
              >
                Place Order Request
              </Link>
              <button className="flex-1 border-2 border-green text-green font-bold py-4 px-8 rounded-lg hover:bg-green hover:text-black transition-colors duration-300">
                Schedule Test Ride
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default GNModel; 