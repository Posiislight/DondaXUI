import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import ClipLoader from 'react-spinners/ClipLoader';
import { ToastContainer, toast } from "react-toastify";
import black2 from "../assets/black2.jpg";
// Motorcycle data
const motorcycles = [
  {
    id: 1,
    name: "GN MODEL",
    description: "Experience the future of electrical mobility with cutting edge technology",
    image: black2,
    specs: {
      range: "70-80 KM",
      topSpeed: "70-75 KM/H",
      power: "3000W",
      battery: "72V 35Ah"
    },
    colors: ["Matte Black", "Forest Green", "Crimson Red"],
    features: ["Hub Motor for smooth power delivery", "3,000W rated, 5,000W peak power", "≥170N·m maximum torque", "0-45KM/H in 5 seconds"]
  }
];

// Additional features (only Battery Upgrade)
const additionalFeatures = [
  { name: "Battery Upgrade" }
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const Order: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const [selectedMotorcycle, setSelectedMotorcycle] = useState(motorcycles[0]);
  const [selectedColor, setSelectedColor] = useState(motorcycles[0].colors[0]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: ""
  });

  // Remove price calculations
  const handleFeatureToggle = (featureName: string) => {
    setSelectedFeatures(prev => 
      prev.includes(featureName) 
        ? prev.filter(f => f !== featureName)
        : [...prev, featureName]
    );
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  const validateForm = () => {
    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      zipCode
    } = customerInfo;
  
    if (!firstName.trim()) return "First name is required.";
    if (!lastName.trim()) return "Last name is required.";
    if (!email.trim()) return "Email is required.";
    if (!phone.trim()) return "Phone number is required.";
    if (!address.trim()) return "Address is required.";
    if (!city.trim()) return "City is required.";
    if (!zipCode.trim()) return "ZIP Code is required.";
  
    return null; // No errors
  };
  
  const handleSubmitOrder = async () => {
    const error = validateForm();
  if (error) {
    toast(`${error}`);
    return;
  }
    setLoading(true)
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const bookingData = {
      first_name: customerInfo.firstName,
      last_name: customerInfo.lastName,
      email: customerInfo.email,
      phone: customerInfo.phone,
      address: customerInfo.address,
      city: customerInfo.city,
      zip_code: customerInfo.zipCode,
      motorcycle_model: selectedMotorcycle.name,
      color: selectedColor,
      quantity: 1, // Assuming a default quantity for now
      frequency: "One-time", // Assuming a default frequency for now
      additional_features: selectedFeatures,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/bookings/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });
      if (!response.ok) throw new Error('Failed to submit booking');
      // Optionally handle success (show message, redirect, etc)
      alert('Order submitted successfully!');
      navigate('/');
    } catch (error) {
      // alert('There was an error submitting your order.');
      toast(`There was an error submitting your order`)
      console.error(error);
    }
    finally{
      setLoading(false)
    }
  };

  return (
    
    <div className="mt-12 min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-white">
      <ToastContainer/>
      { loading && (
         <div className="fixed inset-0 z-[9999] bg-black bg-opacity-50 flex items-center justify-center">
         <ClipLoader loading={true} size={60} color="#ffffff" />
       </div>
      )
      }
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="text-center mb-8"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-black dark:text-white">Order Your </span>
            <span className="text-green">DondaX</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Customize and order your perfect electric motorcycle
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="flex justify-center mb-8"
        >
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  currentStep >= step 
                    ? "bg-green text-black" 
                    : "bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    currentStep > step ? "bg-green" : "bg-gray-300 dark:bg-gray-700"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold mb-6">Choose Your Model</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {motorcycles.map((motorcycle) => (
                    <motion.div
                      key={motorcycle.id}
                      whileHover={{ scale: 1.02 }}
                      className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                        selectedMotorcycle.id === motorcycle.id
                          ? "border-green bg-green/10"
                          : "border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                      }`}
                      onClick={() => setSelectedMotorcycle(motorcycle)}
                    >
                      <img
                        src={motorcycle.image}
                        alt={motorcycle.name}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                      <h3 className="text-xl font-bold mb-2">{motorcycle.name}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {motorcycle.description}
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Range:</span>
                          <span className="font-semibold">{motorcycle.specs.range}</span>
                        </div>
                        <div className="flex justify-between">1
                          <span>Top Speed:</span>
                          <span className="font-semibold">{motorcycle.specs.topSpeed}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Power:</span>
                          <span className="font-semibold">{motorcycle.specs.power}</span>
                        </div>
                      </div>
                      <div className="mt-4 text-2xl font-bold text-green">
                        {/* Price intentionally left blank */}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold mb-6">Customize Your Motorcycle</h2>
                
                {/* Color Selection */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Choose Color</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {selectedMotorcycle.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                          selectedColor === color
                            ? "border-green bg-green/10"
                            : "border-gray-300 dark:border-gray-600 hover:border-green/50"
                        }`}
                      >
                        <div className="text-center">
                          <div
                            className="w-8 h-8 rounded-full mx-auto mb-2 border-2 border-gray-300"
                            style={{
                              backgroundColor:
                                color === "Matte Black"
                                  ? "#1a1a1a"
                                  : color === "Forest Green"
                                  ? "#228B22"
                                  : color === "Crimson Red"
                                  ? "#DC143C"
                                  : "#ccc"
                            }}
                          ></div>
                          <span className="text-sm font-medium">{color}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Additional Features */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Additional Features</h3>
                  <div className="space-y-3">
                    {additionalFeatures.map((feature) => (
                      <label key={feature.name} className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedFeatures.includes(feature.name)}
                            onChange={() => handleFeatureToggle(feature.name)}
                            className="w-4 h-4 text-green border-gray-300 rounded focus:ring-green"
                          />
                          <span className="ml-3 font-medium">{feature.name}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold mb-6">Customer Information</h2>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">First Name</label>
                      <input
                        type="text"
                        value={customerInfo.firstName}
                        onChange={(e) => setCustomerInfo({...customerInfo, firstName: e.target.value})}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-green focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name</label>
                      <input
                        type="text"
                        value={customerInfo.lastName}
                        onChange={(e) => setCustomerInfo({...customerInfo, lastName: e.target.value})}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-green focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-green focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone</label>
                      <PhoneInput
                        defaultCountry="NG"
                        value={customerInfo.phone}
                        onChange={phone => setCustomerInfo(prev => ({ ...prev, phone: phone || "" }))}
                        international
                        countryCallingCodeEditable={false}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white focus:ring-2 focus:ring-green focus:border-transparent"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Address</label>
                      <input
                        type="text"
                        value={customerInfo.address}
                        onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-green focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">City</label>
                      <input
                        type="text"
                        value={customerInfo.city}
                        onChange={(e) => setCustomerInfo({...customerInfo, city: e.target.value})}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-green focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">ZIP Code</label>
                      <input
                        type="text"
                        value={customerInfo.zipCode}
                        onChange={(e) => setCustomerInfo({...customerInfo, zipCode: e.target.value})}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-green focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <button
                  onClick={handlePrevStep}
                  className="px-6 py-3 border-2 border-green text-green font-semibold rounded-lg hover:bg-green hover:text-black transition-colors duration-300"
                >
                  Previous
                </button>
              )}
              {currentStep < 3 ? (
                <button
                  onClick={handleNextStep}
                  className="px-6 py-3 bg-green text-black font-semibold rounded-lg hover:bg-green/90 transition-colors duration-300 ml-auto"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmitOrder}
                  className="px-8 py-3 bg-green text-black font-semibold rounded-lg hover:bg-green/90 transition-colors duration-300 ml-auto"
                >
                  Place Order
                </button>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="lg:col-span-1"
          >
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg sticky top-8">
              <h3 className="text-xl font-bold mb-4">Order Summary</h3>
              
              <div className="space-y-4">
                <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                  <h4 className="font-semibold text-lg">{selectedMotorcycle.name}</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                    Color: {selectedColor}
                  </p>
                  <div className="text-2xl font-bold text-green">
                    {/* Price intentionally left blank */}
                  </div>
                </div>

                {selectedFeatures.length > 0 && (
                  <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                    <h4 className="font-semibold mb-2">Additional Features</h4>
                    <div className="space-y-1">
                      {selectedFeatures.map((featureName) => (
                        <div key={featureName} className="flex justify-between text-sm">
                          <span>{featureName}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4">
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Order;
