// ====================================================================
// FILE: Home.jsx
// LOCATION: /src/pages/Home.jsx
// PURPOSE: Main landing page component combining search and featured properties
// DESCRIPTION: Home page layout with AI property search and featured listings
// ====================================================================

// React core import for component functionality
import React from 'react';
// Main search interface component for AI-powered property search
import PropertyPrompter from '../PropertyPrompter';
// Featured properties showcase component
import FeaturedProperties from '../FeaturedProperties';

// ====================================================================
// MAIN COMPONENT: Home
// PURPOSE: Landing page that combines search interface with featured properties
// LOCATION: Rendered at / route (public)
// USAGE: Primary entry point for users visiting the application
// ====================================================================
const Home = () => {
    // ================================================================
    // COMPONENT RENDER SECTION
    // LOCATION: Return statement of Home component
    // PURPOSE: Render main page sections in vertical layout
    // ================================================================
    return (
        // ============================================================
        // HOME PAGE CONTAINER: Fragment wrapper for multiple sections
        // PURPOSE: Contains all home page sections without extra markup
        // ============================================================
        <>
            {/* ========================================================
                AI SEARCH SECTION: PropertyPrompter component
                LOCATION: Top section of home page
                PURPOSE: Main call-to-action for property search
                ======================================================== */}
            <PropertyPrompter />

            {/* ========================================================
                FEATURED PROPERTIES SECTION: FeaturedProperties component
                LOCATION: Below search section on home page
                PURPOSE: Showcase available properties and examples
                ======================================================== */}
            <FeaturedProperties />
        </>
    );
}; // End of Home component

// ====================================================================
// COMPONENT EXPORT
// PURPOSE: Make Home component available for import in routing
// USAGE: Imported in App.jsx for / route definition
// ====================================================================
export default Home;
