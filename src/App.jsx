import React from "react";
import Navbar from "./Navbar";
import PropertyPrompter from "./PropertyPrompter";
import FeaturedProperties from "./FeaturedProperties";

function App() {
    return (
        <div>
            <Navbar />
            <main className="pt-20 px-4">
                <PropertyPrompter />
                <FeaturedProperties />
            </main>
        </div>
    );
}

export default App;
