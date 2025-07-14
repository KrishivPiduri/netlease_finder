import React, { useState } from "react";

const PropertyPrompter = () => {
  const [searchValue, setSearchValue] = useState("");

  const recommendations = [
    "Retail space in downtown",
    "Modern office building",
    "Industrial warehouse",
    "Medical office space",
    "Restaurant location",
    "Coworking space"
  ];

  const handleRecommendationClick = (recommendation) => {
    setSearchValue(recommendation);
  };

  return (
    <section className="w-full bg-blue-100 shadow-inner py-24 px-4 rounded-2xl">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold mb-8 text-gray-800">What kind of property are you looking for?</h1>
        <div className="flex justify-center">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search for properties..."
            className="w-full md:w-3/4 lg:w-2/3 px-4 py-3 text-base border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all duration-200"
          />
        </div>

        {!searchValue && (
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {recommendations.map((recommendation, index) => (
              <button
                key={index}
                onClick={() => handleRecommendationClick(recommendation)}
                className="px-4 py-2 text-sm bg-gradient-to-r from-blue-50 to-indigo-50 border border-gray-200 rounded-full hover:from-blue-100 hover:to-indigo-100 hover:border-blue-500 hover:border-2 hover:shadow-lg hover:scale-105 hover:font-bold transition-all duration-200 text-gray-800 font-normal"
              >
                {recommendation}
              </button>
            ))}
          </div>
        )}

        <p className="mt-6 text-gray-600 text-base">Describe your ideal property in your own words. We'll help you find it.</p>
      </div>
    </section>
  );
};

export default PropertyPrompter;
