import React, { useState, useEffect } from "react";
import { useUser } from "./UserContext";

const PropertyPrompter = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showAIResponse, setShowAIResponse] = useState(false);
  const { settings } = useUser();

  const baseRecommendations = [
    "Retail space in downtown area",
    "Modern office building with parking",
    "Industrial warehouse near highway",
    "Medical office space with good visibility",
    "Restaurant location with high foot traffic",
    "Coworking space in tech district"
  ];

  const intelligentSuggestions = {
    "retail": [
      "Ground floor retail with street visibility",
      "Shopping center anchor space",
      "Pop-up retail location",
      "Retail space with drive-through capability"
    ],
    "office": [
      "Class A office building",
      "Medical office building",
      "Flexible office space",
      "Executive suites with shared amenities"
    ],
    "warehouse": [
      "Distribution center with loading docks",
      "Climate-controlled storage facility",
      "Manufacturing space with high ceilings",
      "Flex warehouse with office component"
    ],
    "restaurant": [
      "Full-service restaurant with liquor license",
      "Quick-service restaurant location",
      "Food court space in mall",
      "Drive-through restaurant pad"
    ],
    "medical": [
      "Outpatient medical facility",
      "Dental office space",
      "Urgent care center location",
      "Medical lab space"
    ]
  };

  const aiResponses = [
    "I'm analyzing your requirements...",
    "Based on your preferences, I'm finding properties that match...",
    "Let me search for properties in your preferred price range...",
    "Considering your location and budget preferences...",
    "I found several options that might interest you..."
  ];

  // Generate dynamic suggestions based on input
  useEffect(() => {
    if (searchValue.length > 2) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        const input = searchValue.toLowerCase();
        let newSuggestions = [];

        // Find relevant suggestions based on keywords
        Object.keys(intelligentSuggestions).forEach(category => {
          if (input.includes(category)) {
            newSuggestions = [...newSuggestions, ...intelligentSuggestions[category]];
          }
        });

        // Add location-based suggestions
        if (input.includes("downtown") || input.includes("city")) {
          newSuggestions.push("Urban mixed-use development");
          newSuggestions.push("High-rise office space");
        }

        if (input.includes("suburb") || input.includes("residential")) {
          newSuggestions.push("Neighborhood shopping center");
          newSuggestions.push("Strip mall anchor space");
        }

        // Add budget-based suggestions if we have user preferences
        if (settings?.currency && settings?.priceRange) {
          const currency = settings.currency === 'USD' ? '$' : settings.currency === 'EUR' ? '€' : '£';
          if (settings.priceRange.max < 1000000) {
            newSuggestions.push(`Affordable ${input} under ${currency}${settings.priceRange.max.toLocaleString()}`);
          }
        }

        // Fallback to general suggestions if no specific matches
        if (newSuggestions.length === 0) {
          newSuggestions = baseRecommendations.filter(rec =>
            rec.toLowerCase().includes(input) ||
            input.split(' ').some(word => rec.toLowerCase().includes(word))
          );
        }

        setSuggestions(newSuggestions.slice(0, 6));
        setIsTyping(false);
      }, 800);

      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
      setIsTyping(false);
    }
  }, [searchValue, settings]);

  const handleSearch = () => {
    if (searchValue.trim()) {
      setShowAIResponse(true);
      // Simulate AI processing
      setTimeout(() => {
        setShowAIResponse(false);
        // Here you would typically trigger the actual search
        console.log("Searching for:", searchValue);
      }, 2000);
    }
  };

  const handleRecommendationClick = (recommendation) => {
    setSearchValue(recommendation);
    setSuggestions([]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <section className="w-full bg-gradient-to-br from-blue-50 to-indigo-100 shadow-inner py-24 px-4 rounded-2xl">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold mb-4 text-gray-800">
          What kind of property are you looking for?
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Describe your ideal property in natural language. Our AI will understand and find the perfect match.
        </p>

        <div className="flex justify-center">
          <div className="relative w-full">
            {/* AI Icon */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
              <div className="w-6 h-6 text-blue-500 relative">
                <svg className={`w-6 h-6 ${isTyping ? 'animate-pulse' : ''}`} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                {isTyping && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-ping"></div>
                )}
              </div>
            </div>

            <textarea
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Tell me about your ideal property... (e.g., 'I need a retail space downtown with good foot traffic under $5000/month')"
              rows={1}
              className="w-full pl-14 pr-16 py-5 text-lg border-2 border-gray-300 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all duration-200 resize-none overflow-hidden hover:shadow-xl"
              style={{ minHeight: '64px' }}
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
              }}
            />

            <button
              onClick={handleSearch}
              disabled={!searchValue.trim()}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
                searchValue.trim() 
                  ? 'bg-blue-500 hover:bg-blue-600 hover:scale-110' 
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              {showAIResponse ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* AI Response Indicator */}
        {showAIResponse && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
            <p className="text-blue-700 mt-2">{aiResponses[Math.floor(Math.random() * aiResponses.length)]}</p>
          </div>
        )}

        {/* Smart Suggestions */}
        {isTyping && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
              <span className="text-sm text-gray-600">AI is analyzing your request...</span>
            </div>
          </div>
        )}

        {/* Dynamic Suggestions */}
        {suggestions.length > 0 && !isTyping && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">💡 AI Suggestions based on your input:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleRecommendationClick(suggestion)}
                  className="px-3 py-2 text-sm bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-full hover:from-green-100 hover:to-blue-100 hover:border-green-400 hover:shadow-md transition-all duration-200 text-gray-700 cursor-pointer"
                >
                  <span className="mr-1">🎯</span>
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Default Recommendations */}
        {!searchValue && !isTyping && (
          <div className="mt-6">
            <p className="text-sm text-gray-600 mb-3">Popular searches:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {baseRecommendations.map((recommendation, index) => (
                <button
                  key={index}
                  onClick={() => handleRecommendationClick(recommendation)}
                  className="px-4 py-2 text-sm bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-gray-200 rounded-full hover:from-blue-100 hover:to-indigo-100 hover:border-blue-400 hover:shadow-lg hover:scale-105 transition-all duration-200 text-gray-800 cursor-pointer"
                >
                  {recommendation}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 flex items-center justify-center space-x-4 text-sm text-gray-500">
          <span className="flex items-center">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
            AI-Powered Search
          </span>
          <span className="flex items-center">
            <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
            Natural Language Processing
          </span>
        </div>
      </div>
    </section>
  );
};

export default PropertyPrompter;
