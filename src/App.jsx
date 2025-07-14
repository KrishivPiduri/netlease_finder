import React from "react";
import Navbar from "./Navbar";

function App() {
    return (
        <div>
            <Navbar />
            <main className="pt-20 px-4">
                <p>Content goes here...</p>
                {/* Add enough content to see the sticky effect */}
                <div className="h-[2000px]" />
            </main>
        </div>
    );
}

export default App;
