// ====================================================================
// FILE: SavedListings.jsx
// LOCATION: /src/SavedListings.jsx
// PURPOSE: Display and manage user's saved/bookmarked properties
// DESCRIPTION: Property carousel component and saved listings page
// ====================================================================

// React core imports for component functionality and state management
import React, { useState } from "react";
// Custom user context hook for accessing saved properties and functions
import { useUser } from "./UserContext";

// ====================================================================
// PROPERTY CAROUSEL COMPONENT: PropertyCarousel
// PURPOSE: Image slideshow component for property photos
// LOCATION: Reusable component within SavedListings
// PROPS: images - Array of image URLs, alt - Alt text for accessibility
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
		// CAROUSEL CONTAINER: Relative positioned container for image and controls
		// PURPOSE: Contains image display and navigation elements
		// ============================================================
		<div className="relative">

			{/* ========================================================
				MAIN IMAGE DISPLAY: Current carousel image
				STYLING: Fixed aspect ratio with object cover
				======================================================== */}
			<img
				src={images[currentImageIndex]} // Show current image from array
				alt={alt} // Accessibility alt text
				className="w-full h-64 object-cover"
				style={{ aspectRatio: '2/1' }} // Maintain consistent aspect ratio
			/>

			{/* ========================================================
				NAVIGATION ARROWS: Previous/next image controls
				CONDITIONAL: Only show if multiple images exist
				======================================================== */}
			{images.length > 1 && (
				<>
					{/* ============================================
						PREVIOUS IMAGE BUTTON: Navigate backwards
						POSITION: Absolute left side of image
						============================================ */}
					<button
						onClick={prevImage} // Navigate to previous image
						className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors cursor-pointer"
					>
						{/* Left arrow icon */}
						<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
						</svg>
					</button>

					{/* ============================================
						NEXT IMAGE BUTTON: Navigate forwards
						POSITION: Absolute right side of image
						============================================ */}
					<button
						onClick={nextImage} // Navigate to next image
						className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors cursor-pointer"
					>
						{/* Right arrow icon */}
						<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
						</svg>
					</button>
				</>
			)}

			{/* ========================================================
				IMAGE INDICATORS: Dots showing current image position
				CONDITIONAL: Only show if multiple images exist
				POSITION: Bottom center of image
				======================================================== */}
			{images.length > 1 && (
				<div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
					{/* Map through images to create indicator dots */}
					{images.map((_, index) => (
						<button
							key={index}
							onClick={() => setCurrentImageIndex(index)} // Jump to specific image
							className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${
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
// MAIN COMPONENT: SavedListings
// PURPOSE: Display user's saved properties in a grid layout
// LOCATION: Rendered at /saved route (protected)
// USAGE: Shows bookmarked properties with management options
// ====================================================================
const SavedListings = () => {
	// ================================================================
	// CONTEXT HOOKS SECTION
	// LOCATION: Top of SavedListings component
	// ================================================================

	// User context: Access saved properties and save/unsave function
	const { savedProperties, saveProperty } = useUser();

	// ================================================================
	// EMPTY STATE RENDER SECTION
	// LOCATION: Early return for no saved properties
	// PURPOSE: Show friendly message when user has no saved properties
	// ================================================================
	if (savedProperties.length === 0) {
		return (
			// ========================================================
			// EMPTY STATE CONTAINER: Full section for empty state message
			// STYLING: Centered content with padding
			// ========================================================
			<section className="max-w-6xl mx-auto py-16 px-4">

				{/* Page title for empty state */}
				<h1 className="text-3xl font-bold mb-8 text-gray-800">Saved Properties</h1>

				{/* ====================================================
					EMPTY STATE CONTENT: Message and illustration
					STYLING: Centered layout with icon and text
					==================================================== */}
				<div className="text-center py-16">

					{/* Empty state icon - heart outline */}
					<svg className="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
					</svg>

					{/* Empty state heading */}
					<h2 className="text-xl font-semibold text-gray-600 mb-2">No saved properties yet</h2>

					{/* Empty state description with call-to-action */}
					<p className="text-gray-500">Start browsing properties and save your favorites to see them here.</p>
				</div>
			</section>
		);
	}

	// ================================================================
	// MAIN RENDER SECTION (WITH SAVED PROPERTIES)
	// LOCATION: Main return statement when properties exist
	// ================================================================
	return (
		// ============================================================
		// SAVED LISTINGS CONTAINER: Main section for saved properties
		// STYLING: Max width container with padding
		// ============================================================
		<section className="max-w-6xl mx-auto py-16 px-4">

			{/* ========================================================
				PAGE HEADER: Title with property count
				PURPOSE: Show page title and number of saved properties
				======================================================== */}
			<h1 className="text-3xl font-bold mb-8 text-gray-800">
				Saved Properties ({savedProperties.length}) {/* Dynamic count */}
			</h1>

			{/* ========================================================
				PROPERTIES GRID: Responsive grid layout for property cards
				STYLING: Single column mobile, two columns desktop
				======================================================== */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

				{/* ====================================================
					PROPERTY CARDS: Map through saved properties
					PURPOSE: Render each saved property as a card
					==================================================== */}
				{savedProperties.map((property) => (
					<div
						key={property.id} // Unique key for React rendering
						className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden cursor-pointer"
					>
						{/* ================================================
							PROPERTY IMAGE SECTION: Carousel with overlays
							LOCATION: Top of property card
							================================================ */}
						<div className="relative">

							{/* Property image carousel component */}
							<PropertyCarousel images={property.images} alt={property.name} />

							{/* ========================================
								TOP RIGHT OVERLAY BUTTONS: Action buttons on image
								POSITION: Absolute top-right corner
								======================================== */}
							<div className="absolute top-3 right-3 flex flex-row gap-2 z-10">

								{/* Register to bid button */}
								<button className="px-3 py-1 bg-white text-blue-600 text-xs font-medium rounded border hover:bg-blue-600 hover:text-white hover:shadow-md transition-all duration-200 cursor-pointer">
									Register To Bid
								</button>

								{/* ====================================
									UNSAVE BUTTON: Remove from saved properties
									FUNCTIONALITY: Calls saveProperty to toggle saved state
									==================================== */}
								<button
									onClick={() => saveProperty(property)} // Toggle saved state (remove)
									className="w-8 h-8 bg-white rounded border border-red-300 flex items-center justify-center hover:bg-red-100 hover:shadow-md transition-all duration-200 group cursor-pointer"
								>
									{/* Filled heart icon (indicates property is saved) */}
									<svg className="w-4 h-4 text-red-500 fill-red-500 transition-colors duration-200" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
									</svg>
								</button>
							</div>

							{/* ========================================
								PROPERTY BADGES: Category/feature tags
								POSITION: Absolute bottom-left of image
								======================================== */}
							<div className="absolute bottom-12 left-3 flex gap-2">
								{property.badges.map((badge, index) => (
									<span key={index} className="px-2 py-1 bg-black/70 text-white text-xs rounded">
										{badge} {/* Property category or feature badge */}
									</span>
								))}
							</div>

							{/* ========================================
								AUCTION INFO OVERLAY: Bidding details
								POSITION: Absolute bottom of image
								======================================== */}
							<div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-3">
								<div className="flex items-center gap-2 text-sm">
									<span>Bidding Starts:</span>
									<span className="font-medium">{property.auctionDate}</span>
								</div>
							</div>
						</div>

						{/* ================================================
							PROPERTY CONTENT SECTION: Details and information
							LOCATION: Below image in property card
							================================================ */}
						<div className="p-4">

							{/* ========================================
								PRICE AND TYPE HEADER: Cost and pricing type
								STYLING: Flexbox with space between
								======================================== */}
							<div className="flex items-center justify-between mb-2">
								{/* Property price display */}
								<span className="text-xl font-bold text-gray-900">{property.price}</span>
								{/* Price type badge (e.g., "Monthly", "Per SF") */}
								<span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded border border-blue-200">
									{property.priceType}
								</span>
							</div>

							{/* Property name/title */}
							<h3 className="font-semibold text-gray-900 mb-1 text-sm">{property.name}</h3>

							{/* Property description */}
							<p className="text-gray-600 text-sm mb-3">{property.description}</p>

							{/* ========================================
								ADDRESS SECTION: Location information
								STRUCTURE: Street address and broader location
								======================================== */}
							<div className="mb-4">
								{/* Street address */}
								<div className="font-medium text-gray-900 text-sm">{property.address}</div>
								{/* City, state, or broader location */}
								<div className="text-gray-500 text-xs">{property.location}</div>
							</div>

							{/* ========================================
								BOTTOM ACTIONS: Additional property actions
								STYLING: Flexbox with space between elements
								======================================== */}
							<div className="flex items-center justify-between">

								{/* ====================================
									OFFERING MEMORANDUM LINK: View property details
									CONDITIONAL: Only show if property has OM available
									==================================== */}
								{property.hasOM && (
									<button className="flex items-center gap-1 text-blue-600 text-sm hover:text-blue-800 cursor-pointer">
										{/* External link icon */}
										<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
										</svg>
										<span>View OM</span> {/* Offering Memorandum link text */}
									</button>
								)}

								{/* Placeholder element for layout balance */}
								<div className="w-12 h-8 bg-gray-200 rounded"></div>
							</div>
						</div> {/* End of property content section */}
					</div> // End of property card
				))} {/* End of property mapping */}
			</div> {/* End of properties grid */}
		</section> // End of saved listings container
	);
}; // End of SavedListings component

// ====================================================================
// COMPONENT EXPORT
// PURPOSE: Make SavedListings component available for import
// USAGE: Imported in App.jsx for /saved route
// ====================================================================
export default SavedListings;
