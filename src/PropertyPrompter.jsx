// ====================================================================
// FILE: PropertyPrompter.jsx
// LOCATION: /src/PropertyPrompter.jsx
// PURPOSE: Main AI-powered property search interface component
// DESCRIPTION: Natural language property search with authentication flow
// ====================================================================

// React core imports for component functionality
import React, { useState, useEffect } from "react";
// Clerk authentication hook for user state management
import { useUser as useClerkUser } from "@clerk/clerk-react";
// React Router navigation for page redirects
import { useNavigate } from "react-router-dom";

// ====================================================================
// MAIN COMPONENT: PropertyPrompter
// PURPOSE: Renders the AI property search interface
// LOCATION: Primary search component on home page
// ====================================================================
const PropertyPrompter = () => {
  // ================================================================
  // STATE MANAGEMENT SECTION
  // LOCATION: Top of PropertyPrompter component
  // ================================================================

  // Main search input state - stores user's natural language query
  const [searchValue, setSearchValue] = useState("");

  // AI response loading state - shows/hides loading animation
  const [showAIResponse, setShowAIResponse] = useState(false);

  // Clerk authentication state destructuring
  const { isSignedIn, isLoaded } = useClerkUser();

  // React Router navigation hook for programmatic routing
  const navigate = useNavigate();

  // ================================================================
  // EFFECT HOOKS SECTION
  // LOCATION: After state declarations in PropertyPrompter
  // ================================================================

  // Effect: Restore saved search query after successful authentication
  // PURPOSE: Maintains user's search intent across sign-in flow
  useEffect(() => {
    // Only run when Clerk has loaded and user is signed in
    if (isLoaded && isSignedIn) {
      // Check for saved search query from pre-auth state
      const savedQuery = localStorage.getItem('pendingSearchQuery');
      if (savedQuery) {
        // Restore the search input with saved query
        setSearchValue(savedQuery);
        // Clean up localStorage to prevent duplicate restoration
        localStorage.removeItem('pendingSearchQuery');
      }
    }
  }, [isSignedIn, isLoaded]); // Dependencies: authentication state changes

  // ================================================================
  // STATIC DATA SECTION
  // LOCATION: After useEffect hooks in PropertyPrompter
  // PURPOSE: Predefined AI response messages for user feedback
  // ================================================================

  // Array of simulated AI processing messages
  // USAGE: Randomly selected during search to show AI is "thinking"
  const aiResponses = [
    "I'm analyzing your requirements...",
    "Based on your preferences, I'm finding properties that match...",
    "Let me search for properties in your preferred price range...",
    "Considering your location and budget preferences...",
    "I found several options that might interest you..."
  ];

  // ================================================================
  // EVENT HANDLERS SECTION
  // LOCATION: After static data in PropertyPrompter
  // ================================================================

  // Handler: Main search initiation function
  // PURPOSE: Process user search or redirect to authentication
  const handleSearch = () => {
    // Only proceed if user has entered a search query
    if (searchValue.trim()) {
      // Authentication gate: redirect unauthenticated users
      if (!isSignedIn) {
        // Persist search query across authentication flow
        localStorage.setItem('pendingSearchQuery', searchValue);
        // Redirect to sign-in page
        navigate('/sign-in');
        return; // Exit early for unauthenticated users
      }

      // For authenticated users: show AI processing state
      setShowAIResponse(true);

      // Simulate AI processing with timeout
      setTimeout(() => {
        // Hide loading state after simulation
        setShowAIResponse(false);
        // Navigate to search results page with query parameter
        navigate(`/search?q=${encodeURIComponent(searchValue)}`);
      }, 2000); // 2 second simulation delay
    }
  };

  // Handler: Keyboard event processing for search input
  // PURPOSE: Enable Enter key to trigger search (exclude Shift+Enter)
  const handleKeyPress = (e) => {
    // Enter key without Shift modifier triggers search
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent default textarea behavior
      handleSearch(); // Trigger search function
    }
    // Note: Shift+Enter allows for multi-line input
  };

  // ================================================================
  // COMPONENT RENDER SECTION
  // LOCATION: Main return statement of PropertyPrompter
  // ================================================================
  return (
    // ============================================================
    // MAIN CONTAINER: PropertyPrompter Section
    // STYLING: Gradient background with rounded corners and shadow
    // ============================================================
    <section className="w-full bg-gradient-to-br from-blue-50 to-indigo-100 shadow-inner py-24 px-4 rounded-2xl">

      {/* ========================================================
          CONTENT WRAPPER: Centered container for all content
          STYLING: Max width constraint with center alignment
          ======================================================== */}
      <div className="max-w-2xl mx-auto text-center">

        {/* ====================================================
            HEADER SECTION: Page title and description
            LOCATION: Top of PropertyPrompter content area
            ==================================================== */}

        {/* Main heading: Primary call-to-action text */}
        <h1 className="text-4xl font-extrabold mb-4 text-gray-800">
          What kind of property are you looking for?
        </h1>

        {/* Subheading: Explanatory text about AI functionality */}
        <p className="text-lg text-gray-600 mb-8">
          Describe your ideal property in natural language. Our AI will understand and find the perfect match.
        </p>

        {/* ====================================================
            SEARCH INPUT SECTION: Main interaction area
            LOCATION: Center of PropertyPrompter component
            ==================================================== */}
        <div className="flex justify-center">

          {/* ==================================================
              SEARCH INPUT CONTAINER: Relative positioned wrapper
              PURPOSE: Contains search input with absolute positioned elements
              ================================================== */}
          <div className="relative w-full">

            {/* ==============================================
                AI ICON: Visual indicator for AI functionality
                POSITION: Absolute left side of search input
                ============================================== */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
              <div className="w-6 h-6 text-blue-500 relative">
                {/* AI icon image from external source */}
                <img
                  src="https://static.thenounproject.com/png/6056246-200.png"
                  alt="AI Logo"
                  className="w-6 h-6 rounded-sm object-cover"
                />
              </div>
            </div>

            {/* ==============================================
                MAIN SEARCH INPUT: Natural language text area
                FEATURES: Auto-resize, enter key handling, styling
                ============================================== */}
            <textarea
              value={searchValue} // Controlled input value
              onChange={(e) => setSearchValue(e.target.value)} // Update state on input
              onKeyPress={handleKeyPress} // Handle Enter key for search
              placeholder="Describe your ideal property... (e.g., 'retail space downtown under $5000/month')"
              rows={1} // Start with single row
              className="w-full pl-14 pr-16 py-5 text-lg border-2 border-gray-300 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all duration-200 resize-none overflow-hidden hover:shadow-xl"
              style={{ minHeight: '64px' }} // Minimum height constraint

              // Auto-resize functionality for multi-line input
              onInput={(e) => {
                e.target.style.height = 'auto'; // Reset height
                // Set height to content size (max 120px)
                e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
              }}
            />

            {/* ==============================================
                SEARCH BUTTON: Submit button with loading state
                POSITION: Absolute right side of search input
                STATES: Enabled/disabled, normal/loading
                ============================================== */}
            <button
              onClick={handleSearch} // Trigger search on click
              disabled={!searchValue.trim()} // Disable if no input
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
                // Conditional styling based on input state
                searchValue.trim() 
                  ? 'bg-blue-500 hover:bg-blue-600 hover:scale-110' // Active state
                  : 'bg-gray-300 cursor-not-allowed' // Disabled state
              }`}
            >
              {/* Conditional button content: loading spinner or search icon */}
              {showAIResponse ? (
                // Loading spinner during AI processing
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                // Search/submit arrow icon
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* ====================================================
            AI RESPONSE INDICATOR: Loading state feedback
            LOCATION: Below search input, conditionally rendered
            PURPOSE: Shows AI processing with animated feedback
            ==================================================== */}
        {showAIResponse && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">

            {/* Animated loading dots container */}
            <div className="flex items-center justify-center space-x-2">
              {/* Three bouncing dots with staggered animation delays */}
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>

            {/* Random AI response message for user feedback */}
            <p className="text-blue-700 mt-2">
              {aiResponses[Math.floor(Math.random() * aiResponses.length)]}
            </p>
          </div>
        )}

        {/* ====================================================
            EXAMPLE QUERIES SECTION: User guidance and suggestions
            LOCATION: Bottom of PropertyPrompter component
            PURPOSE: Help users understand how to format queries
            ==================================================== */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Try: "Office space in downtown under $3000/month" or "Retail storefront with parking"
          </p>
        </div>

      </div> {/* End of content wrapper */}
    </section> // End of main PropertyPrompter section
  );
}; // End of PropertyPrompter component function

// ====================================================================
// COMPONENT EXPORT
// PURPOSE: Make PropertyPrompter available for import in other files
// USAGE: Imported in App.jsx or page components
// ====================================================================
export default PropertyPrompter;
