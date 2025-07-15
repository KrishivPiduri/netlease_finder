// ====================================================================
// FILE: SearchResults.jsx
// LOCATION: /src/pages/SearchResults.jsx
// PURPOSE: Display search results in a 4-column grid layout
// DESCRIPTION: Property search results page with filtering and sorting
// ====================================================================

// React core imports for component functionality and state management
import React, { useState, useEffect } from "react";
// React Router imports for navigation and URL parameters
import { useLocation, useNavigate } from "react-router-dom";
// Custom user context hook for accessing save property functionality
import { useUser } from "../UserContext";

// ====================================================================
// MOCK SEARCH RESULTS DATA SECTION
// LOCATION: Top of SearchResults.jsx file
// PURPOSE: Sample search results for demonstration
// NOTE: In production, this would come from an API based on search query
// ====================================================================

// Sample search results data - would be replaced with API call
const mockSearchResults = [
  {
    id: 1,
    name: "Downtown Retail Space",
    location: "San Francisco, CA",
    address: "123 Market Street",
    price: "$2,500,000",
    priceType: "Starting Bid",
    description: "Prime downtown location with high foot traffic. Perfect for retail operations.",
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=400&q=80",
    ],
    badges: ["Video", "Auction"],
    auctionDate: "August 25th, 2025",
    hasOM: true,
    sqft: "2,500 sq ft",
    type: "Retail"
  },
  {
    id: 2,
    name: "Modern Office Tower",
    location: "Austin, TX",
    address: "456 Congress Avenue",
    price: "$8,900,000",
    priceType: "Starting Bid",
    description: "Class A office building in downtown core with modern amenities.",
    images: [
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80",
    ],
    badges: ["Auction"],
    auctionDate: "September 2nd, 2025",
    hasOM: true,
    sqft: "50,000 sq ft",
    type: "Office"
  },
  {
    id: 3,
    name: "Industrial Warehouse",
    location: "Chicago, IL",
    address: "789 Industrial Drive",
    price: "$4,200,000",
    priceType: "Starting Bid",
    description: "Distribution ready warehouse with rail access available.",
    images: [
      "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&w=400&q=80",
    ],
    badges: ["Video"],
    auctionDate: "August 30th, 2025",
    hasOM: true,
    sqft: "100,000 sq ft",
    type: "Industrial"
  },
  {
    id: 4,
    name: "Medical Office Building",
    location: "Phoenix, AZ",
    address: "321 Health Plaza",
    price: "$3,800,000",
    priceType: "Starting Bid",
    description: "Fully equipped medical office building with parking.",
    images: [
      "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=400&q=80",
    ],
    badges: ["Auction"],
    auctionDate: "September 15th, 2025",
    hasOM: true,
    sqft: "15,000 sq ft",
    type: "Medical"
  },
  {
    id: 5,
    name: "Strip Mall Center",
    location: "Dallas, TX",
    address: "555 Shopping Way",
    price: "$6,500,000",
    priceType: "Starting Bid",
    description: "Established strip mall with multiple tenants and steady income.",
    images: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&q=80",
    ],
    badges: ["Video", "Auction"],
    auctionDate: "September 8th, 2025",
    hasOM: true,
    sqft: "25,000 sq ft",
    type: "Retail"
  },
  {
    id: 6,
    name: "Tech Campus Building",
    location: "Seattle, WA",
    address: "777 Innovation Blvd",
    price: "$12,000,000",
    priceType: "Starting Bid",
    description: "Modern tech campus building with flexible office spaces.",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80",
    ],
    badges: ["Auction"],
    auctionDate: "October 1st, 2025",
    hasOM: true,
    sqft: "75,000 sq ft",
    type: "Office"
  },
  {
    id: 7,
    name: "Distribution Center",
    location: "Atlanta, GA",
    address: "888 Logistics Lane",
    price: "$5,200,000",
    priceType: "Starting Bid",
    description: "Strategic distribution center near major highways.",
    images: [
      "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=400&q=80",
    ],
    badges: ["Video"],
    auctionDate: "September 22nd, 2025",
    hasOM: true,
    sqft: "120,000 sq ft",
    type: "Industrial"
  },
  {
    id: 8,
    name: "Mixed-Use Development",
    location: "Miami, FL",
    address: "999 Urban Plaza",
    price: "$15,500,000",
    priceType: "Starting Bid",
    description: "Mixed-use development with retail and office spaces.",
    images: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=400&q=80",
    ],
    badges: ["Video", "Auction"],
    auctionDate: "October 10th, 2025",
    hasOM: true,
    sqft: "80,000 sq ft",
    type: "Mixed-Use"
  }
];

// ====================================================================
// PROPERTY CARD COMPONENT: PropertyCard
// PURPOSE: Individual property display card for search results
// LOCATION: Used within SearchResults grid
// PROPS: property - Property object, onSave - Save function
// ====================================================================
const PropertyCard = ({ property, onSave, isSaved }) => {
  return (
    // ============================================================
    // PROPERTY CARD CONTAINER: Individual property result card
    // STYLING: White background with hover effects and rounded corners
    // ============================================================
    <div className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition-all duration-200 overflow-hidden cursor-pointer">

      {/* ========================================================
          PROPERTY IMAGE SECTION: Main property image with overlays
          LOCATION: Top of property card
          ======================================================== */}
      <div className="relative">

        {/* Main property image */}
        <img
          src={property.images[0]} // Use first image as main display
          alt={property.name}
          className="w-full h-48 object-cover"
        />

        {/* ====================================================
            TOP RIGHT OVERLAY BUTTONS: Action buttons on image
            POSITION: Absolute top-right corner
            ==================================================== */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">

          {/* Register to bid button */}
          <button className="px-3 py-1 bg-white text-blue-600 text-xs font-medium rounded border hover:bg-blue-600 hover:text-white hover:shadow-md transition-all duration-200 cursor-pointer">
            Register To Bid
          </button>

          {/* Save/unsave property button */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click
              onSave(property);
            }}
            className={`w-8 h-8 bg-white rounded border flex items-center justify-center hover:shadow-md transition-all duration-200 cursor-pointer ${
              isSaved 
                ? 'hover:bg-red-100 border-red-300' 
                : 'hover:bg-red-50 hover:border-red-300'
            }`}
          >
            <svg className={`w-4 h-4 transition-colors duration-200 ${
              isSaved 
                ? 'text-red-500 fill-red-500' 
                : 'text-gray-600 hover:text-red-500'
            }`} fill={isSaved ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        {/* ====================================================
            PROPERTY BADGES: Category/feature tags
            POSITION: Absolute bottom-left of image
            ==================================================== */}
        <div className="absolute bottom-12 left-3 flex gap-2">
          {property.badges.map((badge, index) => (
            <span key={index} className="px-2 py-1 bg-black/70 text-white text-xs rounded">
              {badge}
            </span>
          ))}
        </div>

        {/* ====================================================
            AUCTION INFO OVERLAY: Bidding details
            POSITION: Absolute bottom of image
            ==================================================== */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-3">
          <div className="flex items-center gap-2 text-sm">
            <span>Bidding Starts:</span>
            <span className="font-medium">{property.auctionDate}</span>
          </div>
        </div>
      </div>

      {/* ========================================================
          PROPERTY CONTENT SECTION: Details and information
          LOCATION: Below image in property card
          ======================================================== */}
      <div className="p-4">

        {/* Price and type header */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xl font-bold text-gray-900">{property.price}</span>
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded border border-blue-200">
            {property.priceType}
          </span>
        </div>

        {/* Property name and type */}
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-gray-900 text-sm">{property.name}</h3>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{property.type}</span>
        </div>

        {/* Property description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{property.description}</p>

        {/* Property details */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <span>{property.sqft}</span>
          <span>{property.location}</span>
        </div>

        {/* Address */}
        <div className="mb-4">
          <div className="font-medium text-gray-900 text-sm">{property.address}</div>
        </div>

        {/* Bottom actions */}
        <div className="flex items-center justify-between">
          {property.hasOM && (
            <button className="flex items-center gap-1 text-blue-600 text-sm hover:text-blue-800 cursor-pointer">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span>View OM</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ====================================================================
// MAIN COMPONENT: SearchResults
// PURPOSE: Display search results in 4-column grid with filters
// LOCATION: Rendered at /search route
// USAGE: Shows property search results based on query parameters
// ====================================================================
const SearchResults = () => {
  // ================================================================
  // HOOKS AND CONTEXT SECTION
  // LOCATION: Top of SearchResults component
  // ================================================================

  // Router hooks for navigation and URL parameters
  const location = useLocation();
  const navigate = useNavigate();

  // User context for save functionality
  const { saveProperty, isPropertySaved } = useUser();

  // ================================================================
  // STATE MANAGEMENT SECTION
  // LOCATION: After hooks in SearchResults component
  // ================================================================

  // State: Search results data
  const [properties, setProperties] = useState(mockSearchResults);

  // State: Loading state for search
  const [isLoading, setIsLoading] = useState(true);

  // State: Loading more properties state
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // State: Track if there are more properties to load
  const [hasMoreProperties, setHasMoreProperties] = useState(true);

  // State: Current page for pagination
  const [currentPage, setCurrentPage] = useState(1);

  // State: Current sort option
  const [sortBy, setSortBy] = useState('relevance');

  // State: Filter options
  const [filters, setFilters] = useState({
    propertyType: 'all',
    priceRange: 'all',
    sqftRange: 'all'
  });

  // ================================================================
  // URL PARAMETER EXTRACTION
  // LOCATION: After state declarations
  // PURPOSE: Extract search query from URL parameters
  // ================================================================

  // Get search query from URL parameters
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';

  // ================================================================
  // SEARCH EFFECT
  // LOCATION: After URL parameter extraction
  // PURPOSE: Simulate API call when component mounts or query changes
  // ================================================================

  useEffect(() => {
    // Simulate API call delay
    setIsLoading(true);

    // Simulate search API call
    setTimeout(() => {
      // In production, this would be an actual API call
      console.log('Searching for:', query);
      setIsLoading(false);
    }, 1000);
  }, [query]);

  // ================================================================
  // FILTER AND SORT FUNCTIONS
  // LOCATION: After effects
  // PURPOSE: Handle filtering and sorting of search results
  // ================================================================

  // Function: Apply filters to properties
  const getFilteredProperties = () => {
    let filtered = [...properties];

    // Filter by property type
    if (filters.propertyType !== 'all') {
      filtered = filtered.filter(prop =>
        prop.type.toLowerCase() === filters.propertyType.toLowerCase()
      );
    }

    // Sort properties
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) =>
          parseInt(a.price.replace(/[^0-9]/g, '')) - parseInt(b.price.replace(/[^0-9]/g, ''))
        );
        break;
      case 'price-high':
        filtered.sort((a, b) =>
          parseInt(b.price.replace(/[^0-9]/g, '')) - parseInt(a.price.replace(/[^0-9]/g, ''))
        );
        break;
      case 'sqft':
        filtered.sort((a, b) =>
          parseInt(b.sqft.replace(/[^0-9]/g, '')) - parseInt(a.sqft.replace(/[^0-9]/g, ''))
        );
        break;
      default:
        // Keep default order for relevance
        break;
    }

    return filtered;
  };

  const filteredProperties = getFilteredProperties();

  // ================================================================
  // LOAD MORE FUNCTION
  // LOCATION: After getFilteredProperties function
  // PURPOSE: Handle loading additional properties
  // ================================================================

  // Function: Load more properties (simulate API call)
  const loadMoreProperties = async () => {
    setIsLoadingMore(true);

    // Simulate API delay
    setTimeout(() => {
      // Generate additional mock properties
      const additionalProperties = generateMoreProperties(currentPage + 1);

      // Add new properties to existing list
      setProperties(prev => [...prev, ...additionalProperties]);

      // Update page counter
      setCurrentPage(prev => prev + 1);

      // Simulate reaching end of results after 3 pages
      if (currentPage >= 2) {
        setHasMoreProperties(false);
      }

      setIsLoadingMore(false);
    }, 1500); // 1.5 second delay to simulate API call
  };

  // Function: Generate additional mock properties for pagination
  const generateMoreProperties = (page) => {
    const baseId = page * 8; // 8 properties per page

    return [
      {
        id: baseId + 1,
        name: `Commercial Plaza ${page}`,
        location: "Denver, CO",
        address: `${100 + baseId} Commerce Street`,
        price: `$${(Math.random() * 10 + 2).toFixed(1)}M`,
        priceType: "Starting Bid",
        description: "Prime commercial location with excellent visibility and parking.",
        images: [
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80",
        ],
        badges: ["Auction"],
        auctionDate: "October 15th, 2025",
        hasOM: true,
        sqft: `${Math.floor(Math.random() * 50 + 10)}K sq ft`,
        type: "Retail"
      },
      {
        id: baseId + 2,
        name: `Business Park ${page}`,
        location: "Portland, OR",
        address: `${200 + baseId} Business Way`,
        price: `$${(Math.random() * 15 + 5).toFixed(1)}M`,
        priceType: "Starting Bid",
        description: "Modern business park with flexible office and warehouse space.",
        images: [
          "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=400&q=80",
        ],
        badges: ["Video", "Auction"],
        auctionDate: "October 20th, 2025",
        hasOM: true,
        sqft: `${Math.floor(Math.random() * 80 + 20)}K sq ft`,
        type: "Office"
      },
      {
        id: baseId + 3,
        name: `Manufacturing Facility ${page}`,
        location: "Memphis, TN",
        address: `${300 + baseId} Industrial Blvd`,
        price: `$${(Math.random() * 8 + 3).toFixed(1)}M`,
        priceType: "Starting Bid",
        description: "Large manufacturing facility with loading docks and rail access.",
        images: [
          "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=400&q=80",
        ],
        badges: ["Video"],
        auctionDate: "November 1st, 2025",
        hasOM: true,
        sqft: `${Math.floor(Math.random() * 150 + 50)}K sq ft`,
        type: "Industrial"
      },
      {
        id: baseId + 4,
        name: `Shopping Center ${page}`,
        location: "Nashville, TN",
        address: `${400 + baseId} Retail Row`,
        price: `$${(Math.random() * 12 + 4).toFixed(1)}M`,
        priceType: "Starting Bid",
        description: "Anchored shopping center with national tenants and strong foot traffic.",
        images: [
          "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&q=80",
        ],
        badges: ["Auction"],
        auctionDate: "November 5th, 2025",
        hasOM: true,
        sqft: `${Math.floor(Math.random() * 60 + 15)}K sq ft`,
        type: "Retail"
      }
    ];
  };

  // ================================================================
  // COMPONENT RENDER SECTION
  // LOCATION: Main return statement of SearchResults
  // ================================================================
  return (
    // ============================================================
    // SEARCH RESULTS CONTAINER: Main container for search results page
    // STYLING: Full width with padding
    // ============================================================
    <div className="min-h-screen bg-gray-50">

      {/* ========================================================
          SEARCH HEADER SECTION: Search query and results count
          LOCATION: Top of search results page
          ======================================================== */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4">

          {/* Search query display */}
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Search Results for "{query}"
            </h1>
            <p className="text-gray-600 mt-1">
              {isLoading ? 'Searching...' : `${filteredProperties.length} properties found`}
            </p>
          </div>

          {/* ====================================================
              FILTERS AND SORTING SECTION: Controls for refining results
              LAYOUT: Horizontal layout with filters and sort options
              ==================================================== */}
          <div className="flex flex-wrap items-center gap-4">

            {/* Property type filter */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Property Type:</label>
              <select
                value={filters.propertyType}
                onChange={(e) => setFilters(prev => ({ ...prev, propertyType: e.target.value }))}
                className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="retail">Retail</option>
                <option value="office">Office</option>
                <option value="industrial">Industrial</option>
                <option value="medical">Medical</option>
                <option value="mixed-use">Mixed-Use</option>
              </select>
            </div>

            {/* Sort options */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="sqft">Square Footage</option>
              </select>
            </div>

            {/* Back to search button */}
            <button
              onClick={() => navigate('/')}
              className="ml-auto px-4 py-2 text-sm text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
            >
              ← New Search
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================
          SEARCH RESULTS GRID SECTION: 4-column property grid
          LOCATION: Main content area of search results page
          ======================================================== */}
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Loading state */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600">Searching properties...</p>
          </div>
        ) : (
          <>
            {/* Results grid */}
            {filteredProperties.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      onSave={saveProperty}
                      isSaved={isPropertySaved(property.id)}
                    />
                  ))}
                </div>

                {/* ====================================================
                    LOAD MORE SECTION: Button to load additional properties
                    LOCATION: Below results grid
                    PURPOSE: Allow users to load more search results
                    ==================================================== */}
                <div className="mt-12 text-center">
                  {hasMoreProperties ? (
                    <button
                      onClick={loadMoreProperties}
                      disabled={isLoadingMore}
                      className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
                        isLoadingMore
                          ? 'bg-gray-400 text-white cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5'
                      }`}
                    >
                      {isLoadingMore ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Loading More Properties...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span>Load More Properties</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      )}
                    </button>
                  ) : (
                    // End of results message
                    <div className="py-8 text-center">
                      <div className="text-gray-400 mb-2">
                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-gray-600 font-medium">You've seen all available properties</p>
                      <p className="text-gray-500 text-sm mt-1">Try adjusting your search criteria for different results</p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              // No results state
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m4 0v-4a2 2 0 012-2h2a2 2 0 012 2v4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No properties found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters.</p>
                <button
                  onClick={() => navigate('/')}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
                >
                  Start New Search
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// ====================================================================
// COMPONENT EXPORT
// PURPOSE: Make SearchResults component available for import in routing
// USAGE: Imported in App.jsx for /search route definition
// ====================================================================
export default SearchResults;

