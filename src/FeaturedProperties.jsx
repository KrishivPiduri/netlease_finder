// ====================================================================
// FILE: FeaturedProperties.jsx
// LOCATION: /src/FeaturedProperties.jsx
// PURPOSE: Display showcase of featured/sample properties on home page
// DESCRIPTION: Property grid with carousel images and save functionality
// ====================================================================

// React core imports for component functionality and state management
import React, { useState } from "react";
// Custom user context hook for accessing save property functionality
import { useUser } from "./UserContext";

// ====================================================================
// MOCK DATA SECTION: featuredProperties
// LOCATION: Top of FeaturedProperties.jsx file
// PURPOSE: Static sample properties for demonstration and testing
// NOTE: In production, this would be replaced with API data
// ====================================================================

// Static array of featured properties for home page showcase
// STRUCTURE: Each property contains complete information for display
const featuredProperties = [
	// Property 1: Downtown Retail Space in San Francisco
	{
		id: 1, // Unique identifier for React keys and save functionality
		name: "Downtown Retail Space", // Property title/name
		location: "San Francisco, CA", // City and state
		address: "123 Market Street", // Street address
		price: "$2,500,000", // Starting bid or price
		priceType: "Starting Bid", // Type of price (bid, monthly, etc.)
		description: "Prime downtown location • High foot traffic", // Key features
		images: [ // Array of property images for carousel
			"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
			"https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=400&q=80",
			"https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&q=80"
		],
		badges: ["Video", "Auction"], // Property feature badges
		auctionDate: "August 25th, 2025", // Bidding start date
		hasOM: true // Offering Memorandum available flag
	},
	// Property 2: Modern Office Tower in Austin
	{
		id: 2,
		name: "Modern Office Tower",
		location: "Austin, TX",
		address: "456 Congress Avenue",
		price: "$8,900,000",
		priceType: "Starting Bid",
		description: "Class A office building • Downtown core",
		images: [
			"https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
			"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80",
			"https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80",
			"https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=400&q=80"
		],
		badges: ["Auction"],
		auctionDate: "September 2nd, 2025",
		hasOM: true
	},
	// Property 3: Industrial Warehouse in Chicago
	{
		id: 3,
		name: "Industrial Warehouse",
		location: "Chicago, IL",
		address: "789 Industrial Drive",
		price: "$4,200,000",
		priceType: "Starting Bid",
		description: "Distribution ready • Rail access available",
		images: [
			"https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&w=400&q=80",
			"https://images.unsplash.com/photo-1601599561213-832382fd07ba?auto=format&fit=crop&w=400&q=80",
			"https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=400&q=80"
		],
		badges: ["Video"],
		auctionDate: "August 30th, 2025",
		hasOM: true
	},
];

// ====================================================================
// PROPERTY CAROUSEL COMPONENT: PropertyCarousel
// PURPOSE: Compact image slideshow for featured property cards
// LOCATION: Reusable component within FeaturedProperties
// PROPS: images - Array of image URLs, alt - Alt text for accessibility
// NOTE: Smaller version of carousel used in SavedListings
// ====================================================================
const PropertyCarousel = ({ images, alt }) => {
	// ================================================================
	// STATE MANAGEMENT SECTION
	// LOCATION: Top of PropertyCarousel component
	// ================================================================

	// State: Current image index for carousel navigation
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	// ================================================================
	// CAROUSEL NAVIGATION FUNCTIONS SECTION
	// LOCATION: After state declarations in PropertyCarousel
	// ================================================================

	// Function: Navigate to next image in carousel
	// PURPOSE: Cycle forward through images with wraparound
	const nextImage = () => {
		setCurrentImageIndex((prev) => (prev + 1) % images.length);
	};

	// Function: Navigate to previous image in carousel
	// PURPOSE: Cycle backward through images with wraparound
	const prevImage = () => {
		setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
	};

	// ================================================================
	// COMPONENT RENDER SECTION
	// LOCATION: Return statement of PropertyCarousel
	// ================================================================
	return (
		// ============================================================
		// CAROUSEL CONTAINER: Relative positioned container for compact image display
		// PURPOSE: Contains image display and navigation elements
		// ============================================================
		<div className="relative">

			{/* ========================================================
				MAIN IMAGE DISPLAY: Current carousel image (compact size)
				STYLING: Smaller height than SavedListings version
				======================================================== */}
			<img
				src={images[currentImageIndex]} // Show current image from array
				alt={alt} // Accessibility alt text
				className="w-full h-40 object-cover" // Compact 40px height
				style={{ aspectRatio: '2/1' }} // Maintain consistent aspect ratio
			/>

			{/* ========================================================
				NAVIGATION ARROWS: Previous/next image controls (compact)
				CONDITIONAL: Only show if multiple images exist
				STYLING: Smaller buttons for compact layout
				======================================================== */}
			{images.length > 1 && (
				<>
					{/* ============================================
						PREVIOUS IMAGE BUTTON: Navigate backwards (compact)
						POSITION: Absolute left side with smaller size
						============================================ */}
					<button
						onClick={prevImage} // Navigate to previous image
						className="absolute left-1 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors cursor-pointer"
					>
						{/* Left arrow icon (smaller) */}
						<svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
						</svg>
					</button>

					{/* ============================================
						NEXT IMAGE BUTTON: Navigate forwards (compact)
						POSITION: Absolute right side with smaller size
						============================================ */}
					<button
						onClick={nextImage} // Navigate to next image
						className="absolute right-1 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors cursor-pointer"
					>
						{/* Right arrow icon (smaller) */}
						<svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
						</svg>
					</button>
				</>
			)}

			{/* ========================================================
				IMAGE INDICATORS: Dots showing current image position (compact)
				CONDITIONAL: Only show if multiple images exist
				POSITION: Bottom center with smaller dots
				======================================================== */}
			{images.length > 1 && (
				<div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
					{/* Map through images to create smaller indicator dots */}
					{images.map((_, index) => (
						<button
							key={index}
							onClick={() => setCurrentImageIndex(index)} // Jump to specific image
							className={`w-1.5 h-1.5 rounded-full transition-colors cursor-pointer ${
								// Conditional styling for active vs inactive indicators
								index === currentImageIndex ? 'bg-white' : 'bg-white/50'
							}`}
						/>
					))}
				</div>
			)}
		</div>
	);
}; // End of PropertyCarousel component

// ====================================================================
// MAIN COMPONENT: FeaturedProperties
// PURPOSE: Display grid of featured properties on home page
// LOCATION: Rendered below PropertyPrompter on home page
// USAGE: Showcase available properties to inspire user searches
// ====================================================================
const FeaturedProperties = () => {
	// ================================================================
	// CONTEXT HOOKS SECTION
	// LOCATION: Top of FeaturedProperties component
	// ================================================================

	// User context: Access save property function and saved status checker
	const { saveProperty, isPropertySaved } = useUser();

	// ================================================================
	// COMPONENT RENDER SECTION
	// LOCATION: Main return statement of FeaturedProperties
	// ================================================================
	return (
		// ============================================================
		// FEATURED PROPERTIES CONTAINER: Main section for property showcase
		// STYLING: Max width container with padding
		// ============================================================
		<section className="max-w-7xl mx-auto py-16 px-4">

			{/* ========================================================
				SECTION HEADER: Title for featured properties section
				PURPOSE: Introduce the property showcase
				======================================================== */}
			<h2 className="text-2xl font-semibold mb-6 text-gray-800">
				Featured Properties
			</h2>

			{/* ========================================================
				PROPERTIES GRID: Responsive grid layout for property cards
				STYLING: 1 col mobile, 2 tablet, 3 desktop, 4 xl screens
				======================================================== */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

				{/* ====================================================
					PROPERTY CARDS: Map through featured properties
					PURPOSE: Render each featured property as a compact card
					==================================================== */}
				{featuredProperties.map((property) => {
					// Check if current property is saved by user
					const isSaved = isPropertySaved(property.id);

					return (
						<div
							key={property.id} // Unique key for React rendering
							className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden cursor-pointer"
						>
							{/* ================================================
								PROPERTY IMAGE SECTION: Compact carousel with overlays
								LOCATION: Top of property card
								================================================ */}
							<div className="relative">

								{/* Property image carousel component (compact version) */}
								<PropertyCarousel images={property.images} alt={property.name} />

								{/* ========================================
									TOP RIGHT OVERLAY BUTTONS: Compact action buttons
									POSITION: Absolute top-right corner
									STYLING: Vertical layout for space efficiency
									======================================== */}
								<div className="absolute top-2 right-2 flex flex-col gap-1 z-10">

									{/* Register button (compact) */}
									<button className="px-2 py-1 bg-white text-blue-600 text-xs font-medium rounded border hover:bg-blue-600 hover:text-white hover:shadow-md transition-all duration-200 cursor-pointer">
										Register
									</button>

									{/* ====================================
										SAVE/UNSAVE BUTTON: Toggle saved status (compact)
										FUNCTIONALITY: Calls saveProperty to toggle saved state
										STYLING: Dynamic based on saved status
										==================================== */}
									<button
										onClick={() => saveProperty(property)} // Toggle saved state
										className={`w-6 h-6 bg-white rounded border flex items-center justify-center hover:shadow-md transition-all duration-200 group cursor-pointer ${
											// Conditional styling based on saved status
											isSaved 
												? 'hover:bg-red-100 border-red-300' // Saved state styling
												: 'hover:bg-red-50 hover:border-red-300' // Unsaved state styling
										}`}
									>
										{/* Heart icon with dynamic fill based on saved status */}
										<svg className={`w-3 h-3 transition-colors duration-200 ${
											isSaved 
												? 'text-red-500 fill-red-500' // Filled heart when saved
												: 'text-gray-600 group-hover:text-red-500' // Outline heart when not saved
										}`} fill={isSaved ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
										</svg>
									</button>
								</div>

								{/* ========================================
									PROPERTY BADGES: Category/feature tags (compact)
									POSITION: Absolute bottom-left of image
									======================================== */}
								<div className="absolute bottom-8 left-2 flex gap-1">
									{property.badges.map((badge, index) => (
										<span key={index} className="px-1.5 py-0.5 bg-black/70 text-white text-xs rounded">
											{badge} {/* Property category or feature badge */}
										</span>
									))}
								</div>

								{/* ========================================
									AUCTION INFO OVERLAY: Bidding details (compact)
									POSITION: Absolute bottom of image
									======================================== */}
								<div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2">
									<div className="flex items-center gap-1 text-xs">
										<span>Bidding:</span>
										<span className="font-medium">{property.auctionDate}</span>
									</div>
								</div>
							</div>

							{/* ================================================
								PROPERTY CONTENT SECTION: Compact details and information
								LOCATION: Below image in property card
								================================================ */}
							<div className="p-3">

								{/* ========================================
									PRICE AND TYPE HEADER: Cost and pricing type (compact)
									STYLING: Flexbox with space between
									======================================== */}
								<div className="flex items-center justify-between mb-2">
									{/* Property price display */}
									<span className="text-lg font-bold text-gray-900">{property.price}</span>
									{/* Price type badge (compact) */}
									<span className="px-1.5 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded border">
										{property.priceType}
									</span>
								</div>

								{/* Property name/title (compact) */}
								<h3 className="font-semibold text-gray-900 mb-1 text-sm leading-tight">{property.name}</h3>

								{/* Property description (compact) */}
								<p className="text-gray-600 text-xs mb-2 leading-tight">{property.description}</p>

								{/* ========================================
									ADDRESS SECTION: Location information (compact)
									STRUCTURE: Street address and broader location
									======================================== */}
								<div className="mb-3">
									{/* Street address (compact) */}
									<div className="font-medium text-gray-900 text-xs">{property.address}</div>
									{/* City, state, or broader location (compact) */}
									<div className="text-gray-500 text-xs">{property.location}</div>
								</div>

								{/* ========================================
									BOTTOM ACTIONS: Additional property actions (compact)
									STYLING: Flexbox with space between elements
									======================================== */}
								<div className="flex items-center justify-between">

									{/* ====================================
										OFFERING MEMORANDUM LINK: View property details (compact)
										CONDITIONAL: Only show if property has OM available
										==================================== */}
									{property.hasOM && (
										<button className="flex items-center gap-1 text-blue-600 text-xs hover:text-blue-800 cursor-pointer">
											{/* External link icon (compact) */}
											<svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
											</svg>
											<span>View OM</span> {/* Offering Memorandum link text */}
										</button>
									)}

									{/* Placeholder element for layout balance (compact) */}
									<div className="w-8 h-6 bg-gray-200 rounded"></div>
								</div>
							</div> {/* End of property content section */}
						</div> // End of property card
					);
				})} {/* End of property mapping */}
			</div> {/* End of properties grid */}
		</section> // End of featured properties container
	);
}; // End of FeaturedProperties component

// ====================================================================
// COMPONENT EXPORT
// PURPOSE: Make FeaturedProperties component available for import
// USAGE: Imported in Home.jsx for home page property showcase
// ====================================================================
export default FeaturedProperties;
