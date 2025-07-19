import React from "react";
import GNModelBlack from '../../assets/black2.jpg';

const DondaXGNStory: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-white px-2 sm:px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white dark:bg-[#232b2b] rounded-xl shadow-lg p-6 sm:p-10">
        <img
          src={GNModelBlack}
          alt="DondaX GN Model Launch"
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-green">DondaX GN Model: The Future of Urban Electric Mobility</h1>
        <div className="text-gray-500 dark:text-gray-300 text-sm mb-6">Published: June 15, 2024</div>
        <div className="space-y-6 text-lg leading-relaxed">
          <p>
            The DondaX GN Model marks a new era in urban transportation, offering a blend of affordability, durability, and cutting-edge electric technology. Designed with the needs of city commuters and delivery riders in mind, the GN Model is built to withstand the rigors of daily use while providing a smooth, eco-friendly ride.
          </p>
          <p>
            At the heart of the GN Model is a robust 3,000W hub motor (5,000W peak), delivering strong acceleration and a maximum torque of over 170N·m. With a practical range of 70-80KM per charge and a 72V 35Ah battery, riders can confidently navigate city streets and beyond without worrying about frequent recharges.
          </p>
          <p>
            Safety and comfort are top priorities for DondaX. The GN Model features front and rear Φ220 disc brakes, a 3-gear driving system, and a ground clearance of 200mm, making it suitable for both urban and light off-road conditions. The advanced meter display supports Bluetooth mode with a built-in speaker, keeping riders connected and entertained on the go.
          </p>
          <p>
            The launch of the GN Model represents DondaX's commitment to sustainable mobility in Nigeria and across Africa. By providing an affordable, low-maintenance electric motorcycle, DondaX is empowering individuals and businesses to embrace clean transportation and reduce their carbon footprint.
          </p>
          <p>
            Join the electric revolution with the DondaX GN Model—where innovation meets reliability, and the future of mobility is within reach for everyone.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DondaXGNStory;
