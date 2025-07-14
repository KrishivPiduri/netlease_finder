import React, { useState } from "react";

const featuredProperties = [
	{
		id: 1,
		name: "Downtown Retail Space",
		location: "San Francisco, CA",
		address: "123 Market Street",
		price: "$2,500,000",
		priceType: "Starting Bid",
		description: "Prime downtown location • High foot traffic",
		images: [
			"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
			"https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=400&q=80",
			"https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&q=80"
		],
		badges: ["Video", "Auction"],
		auctionDate: "August 25th, 2025",
		hasOM: true
	},
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

const PropertyCarousel = ({ images, alt }) => {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	const nextImage = () => {
		setCurrentImageIndex((prev) => (prev + 1) % images.length);
	};

	const prevImage = () => {
		setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
	};

	return (
		<div className="relative">
			<img
				src={images[currentImageIndex]}
				alt={alt}
				className="w-full h-64 object-cover"
				style={{ aspectRatio: '2/1' }}
			/>

			{/* Navigation Arrows */}
			{images.length > 1 && (
				<>
					<button
						onClick={prevImage}
						className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors cursor-pointer"
					>
						<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
						</svg>
					</button>
					<button
						onClick={nextImage}
						className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors cursor-pointer"
					>
						<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
						</svg>
					</button>
				</>
			)}

			{/* Image Indicators */}
			{images.length > 1 && (
				<div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
					{images.map((_, index) => (
						<button
							key={index}
							onClick={() => setCurrentImageIndex(index)}
							className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${
								index === currentImageIndex ? 'bg-white' : 'bg-white/50'
							}`}
						/>
					))}
				</div>
			)}
		</div>
	);
};

const FeaturedProperties = () => (
	<section className="max-w-6xl mx-auto py-16 px-4">
		<h2 className="text-2xl font-semibold mb-6 text-gray-800">
			Featured Properties
		</h2>
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
			{featuredProperties.map((property) => (
				<div
					key={property.id}
					className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden cursor-pointer"
				>
					{/* Image Section with Overlays */}
					<div className="relative">
						<PropertyCarousel images={property.images} alt={property.name} />

						{/* Top Right Buttons */}
						<div className="absolute top-3 right-3 flex flex-row gap-2 z-10">
							<button className="px-3 py-1 bg-white text-blue-600 text-xs font-medium rounded border hover:bg-blue-600 hover:text-white hover:shadow-md transition-all duration-200 cursor-pointer">
								Register To Bid
							</button>
							<button className="w-8 h-8 bg-white rounded border flex items-center justify-center hover:bg-red-50 hover:shadow-md transition-all duration-200 group cursor-pointer">
								<svg className="w-4 h-4 text-gray-600 group-hover:text-red-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
								</svg>
							</button>
						</div>

						{/* Bottom Left Badges */}
						<div className="absolute bottom-12 left-3 flex gap-2">
							{property.badges.map((badge, index) => (
								<span key={index} className="px-2 py-1 bg-black/70 text-white text-xs rounded">
									{badge}
								</span>
							))}
						</div>

						{/* Bottom Auction Info */}
						<div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-3">
							<div className="flex items-center gap-2 text-sm">
								<span>Bidding Starts:</span>
								<span className="font-medium">{property.auctionDate}</span>
							</div>
						</div>
					</div>

					{/* Content Section */}
					<div className="p-4">
						{/* Price and Badge */}
						<div className="flex items-center justify-between mb-2">
							<span className="text-xl font-bold text-gray-900">{property.price}</span>
							<span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded border">
								{property.priceType}
							</span>
						</div>

						{/* Property Name */}
						<h3 className="font-semibold text-gray-900 mb-1 text-sm">{property.name}</h3>

						{/* Description */}
						<p className="text-gray-600 text-sm mb-3">{property.description}</p>

						{/* Address */}
						<div className="mb-4">
							<div className="font-medium text-gray-900 text-sm">{property.address}</div>
							<div className="text-gray-500 text-xs">{property.location}</div>
						</div>

						{/* Bottom Actions */}
						<div className="flex items-center justify-between">
							{property.hasOM && (
								<button className="flex items-center gap-1 text-blue-600 text-sm hover:text-blue-800 cursor-pointer">
									<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
									</svg>
									<span>View OM</span>
								</button>
							)}
							<div className="w-12 h-8 bg-gray-200 rounded"></div>
						</div>
					</div>
				</div>
			))}
		</div>
	</section>
);

export default FeaturedProperties;
