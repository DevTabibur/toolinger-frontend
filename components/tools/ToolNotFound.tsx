"use client"
import React from "react";

const ToolNotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center py-12 text-gray-800 dark:text-gray-200">
            <svg
                className="w-24 h-24 mb-4 text-gray-400 dark:text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 9.75l-1.5 1.5m0 0l-1.5 1.5m1.5-1.5l1.5 1.5m-1.5-1.5l1.5-1.5m6 6l1.5-1.5m0 0l1.5-1.5m-1.5 1.5l-1.5-1.5m1.5 1.5l-1.5 1.5M12 6v6m0 0v6m0-6H6m6 0h6"
                />
            </svg>
            <h1 className="text-3xl font-bold mb-2">Tool Not Found</h1>
            <p className="text-center max-w-md">
                Oops! The tool you are looking for does not exist or has been moved. Please check the URL or explore other tools available.
            </p>
            <button 
                onClick={() => window.history.back()} 
                className="mt-6 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded hover:from-blue-600 hover:to-blue-800 transition-colors"
            >
                Go Back
            </button>
        </div>
    );
};

export default ToolNotFound;
