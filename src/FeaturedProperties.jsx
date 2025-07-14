import React from "react";

const featuredProperties = [
	{
		id: 1,
		name: "Downtown Retail Space",
		location: "San Francisco, CA",
		price: "$2,500,000",
		image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
	},
	{
		id: 2,
		name: "Modern Office Tower",
		location: "Austin, TX",
		price: "$8,900,000",
		image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
	},
	{
		id: 3,
		name: "Industrial Warehouse",
		location: "Chicago, IL",
		price: "$4,200,000",
		image: "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&w=400&q=80",
	},
];

const FeaturedProperties = () => (
	<section className="max-w-4xl mx-auto py-16 px-4 bg-gradient-to-b from-blue-50 to-blue-100 rounded-2xl shadow-inner mt-12">
		<h2 className="text-2xl font-semibold mb-6 text-blue-900">
			Featured Properties
		</h2>
		<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
			{featuredProperties.map((property) => (
				<div
					key={property.id}
					className="border rounded-lg shadow hover:shadow-lg transition overflow-hidden bg-white"
				>
					<img
						src={property.image}
						alt={property.name}
						className="w-full h-40 object-cover"
					/>
					<div className="p-4">
						<h3 className="font-bold text-lg mb-1">{property.name}</h3>
						<p className="text-gray-600 mb-2">{property.location}</p>
						<p className="text-blue-700 font-semibold">{property.price}</p>
					</div>
				</div>
			))}
		</div>
	</section>
);

export default FeaturedProperties;

