import React, { useState } from "react";
import { useUser as useClerkUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const PropertyPrompter = () => {
  const [searchValue, setSearchValue] = useState("");
  const [showAIResponse, setShowAIResponse] = useState(false);
  const [showSignInPrompt, setShowSignInPrompt] = useState(false);
  const { isSignedIn } = useClerkUser();
  const navigate = useNavigate();

  const aiResponses = [
    "I'm analyzing your requirements...",
    "Based on your preferences, I'm finding properties that match...",
    "Let me search for properties in your preferred price range...",
    "Considering your location and budget preferences...",
    "I found several options that might interest you..."
  ];

  const handleSearch = () => {
    if (searchValue.trim()) {
      if (!isSignedIn) {
        setShowSignInPrompt(true);
        return;
      }

      setShowAIResponse(true);
      // Simulate AI processing
      setTimeout(() => {
        setShowAIResponse(false);
        // Here you would typically trigger the actual search
        console.log("Searching for:", searchValue);
      }, 2000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleSignIn = () => {
    navigate('/sign-in');
  };

  const closeSignInPrompt = () => {
    setShowSignInPrompt(false);
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
                <img
                  src="https://static.thenounproject.com/png/6056246-200.png"
                  alt="AI Logo"
                  className="w-6 h-6 rounded-sm object-cover"
                />
              </div>
            </div>

            <textarea
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Describe your ideal property... (e.g., 'retail space downtown under $5000/month')"
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

        {/* Sign In Prompt Modal */}
        {showSignInPrompt && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
                  <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Sign in to search properties
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  Please sign in to use our AI-powered property search and save your preferences.
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={closeSignInPrompt}
                    className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSignIn}
                    className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Try: "Office space in downtown under $3000/month" or "Retail storefront with parking"
          </p>
        </div>
      </div>
    </section>
  );
};

export default PropertyPrompter;
