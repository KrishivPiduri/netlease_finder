import React from "react";

const PropertyPrompter = () => (
  <section className="w-full bg-blue-100 shadow-inner py-24 px-4 rounded-2xl">
    <div className="max-w-2xl mx-auto text-center">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800">What kind of property are you looking for?</h1>
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Type anything: 'A modern office in Austin', 'Retail in San Francisco', ..."
          className="w-full md:w-3/4 lg:w-2/3 px-8 py-6 text-lg border-2 border-blue-400 rounded-2xl shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 bg-white font-medium transition-all duration-200 relative z-10"
          style={{ boxShadow: '0 12px 40px 0 rgba(59, 130, 246, 0.25)' }}
        />
      </div>
      <p className="mt-6 text-gray-600 text-base">Describe your ideal property in your own words. We'll help you find it.</p>
    </div>
  </section>
);

export default PropertyPrompter;
