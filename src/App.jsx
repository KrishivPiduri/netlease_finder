import React, { useState } from "react";
import Navbar from "./Navbar";
import PropertyPrompter from "./PropertyPrompter";
import FeaturedProperties from "./FeaturedProperties";
import SavedListings from "./SavedListings";

function App() {
    const [currentPage, setCurrentPage] = useState('home');

    const renderPage = () => {
        switch(currentPage) {
            case 'saved':
                return <SavedListings />;
            case 'home':
            default:
                return (
                    <>
                        <PropertyPrompter />
                        <FeaturedProperties />
                    </>
                );
        }
    };

    return (
        <div>
            <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <main className="pt-20 px-4">
                {renderPage()}
            </main>
        </div>
    );
}

export default App;
