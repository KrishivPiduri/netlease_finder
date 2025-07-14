import React from "react";

const PropertyPrompter = () => (
  <section className="max-w-2xl mx-auto py-20 px-4 text-center bg-gradient-to-b from-gray-50 to-white rounded-3xl shadow-2xl mt-8 relative z-10">
    <h1 className="text-4xl font-extrabold mb-8 text-gray-800">What kind of property are you looking for?</h1>
    <div className="flex justify-center">
      <input
        type="text"
        placeholder="Type anything: 'A modern office in Austin', 'Retail in San Francisco', ..."
        className="w-full md:w-3/4 lg:w-2/3 px-8 py-6 text-lg border-2 border-blue-400 rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 bg-white font-medium transition-all duration-200"
        style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)' }}
      />
    </div>
    <p className="mt-4 text-gray-500 text-base">Describe your ideal property in your own words. We'll help you find it.</p>
  </section>
);

export default PropertyPrompter;
