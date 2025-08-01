import React, { useRef, useEffect, useState } from 'react';

function ColorPicker() {
    const colorPickerRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedColor, setSelectedColor] = useState('#0000ff');

    useEffect(() => {
        // Check if ColorJoe is available
        const checkColorJoe = () => {
            if (window.colorjoe) {
                console.log('ColorJoe is available!');
                setIsLoaded(true);
                initializeColorPicker();
            } else {
                console.log('ColorJoe not found, retrying...');
                // Retry after a short delay
                setTimeout(checkColorJoe, 100);
            }
        };

        checkColorJoe();
    }, []);

    const initializeColorPicker = () => {
        if (colorPickerRef.current && window.colorjoe) {
            try {
                console.log('Initializing ColorJoe...');
                
                // Clear the container first
                colorPickerRef.current.innerHTML = '';
                
                // Initialize ColorJoe
                const cj = window.colorjoe.rgb(colorPickerRef.current, selectedColor);
                
                // Set up event listener
                cj.on('change', (color) => {
                    const hexColor = color.hex();
                    console.log('Color changed to:', hexColor);
                    setSelectedColor(hexColor);
                });

                console.log('ColorJoe initialized successfully!');
                
            } catch (error) {
                console.error('Error initializing ColorJoe:', error);
            }
        }
    };

    const handleButtonClick = () => {
        if (!isLoaded) {
            alert('ColorJoe is not loaded yet. Make sure to include the ColorJoe script in your HTML.');
            return;
        }
        
        // Try to initialize again
        initializeColorPicker();
    };

    return (
        <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">ColorJoe Test</h2>
            
            {/* Debug info */}
            <div className="mb-4 p-3 bg-gray-100 rounded text-sm">
                <p><strong>ColorJoe Status:</strong> {isLoaded ? '✅ Loaded' : '❌ Not Loaded'}</p>
                <p><strong>Selected Color:</strong> {selectedColor}</p>
                <p><strong>Window.colorjoe:</strong> {window.colorjoe ? '✅ Available' : '❌ Not Available'}</p>
            </div>

            {/* Color preview */}
            <div className="flex items-center gap-3 mb-4">
                <div 
                    className="w-12 h-12 rounded-lg border-2 border-gray-300"
                    style={{ backgroundColor: selectedColor }}
                ></div>
                <span className="font-mono">{selectedColor}</span>
            </div>

            {/* Initialize button */}
            <button
                onClick={handleButtonClick}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Initialize Color Picker
            </button>

            {/* ColorJoe container */}
            <div 
                ref={colorPickerRef}
                className="border-2 border-dashed border-gray-300 min-h-[300px] p-4 rounded"
            >
                <p className="text-gray-500 text-center">ColorJoe will appear here</p>
            </div>

            {/* Setup instructions */}
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
                <h3 className="font-bold text-yellow-800 mb-2">Setup Required:</h3>
                <p className="text-sm text-yellow-700 mb-2">
                    Add this to your <code>public/index.html</code> before the closing &lt;/body&gt; tag:
                </p>
                <code className="block bg-yellow-100 p-2 rounded text-xs overflow-x-auto">
                    &lt;script src="https://cdnjs.cloudflare.com/ajax/libs/colorjoe/4.1.1/colorjoe.min.js"&gt;&lt;/script&gt;
                </code>
                <p className="text-sm text-yellow-700 mt-2">
                    Then refresh the page and click "Initialize Color Picker"
                </p>
            </div>
        </div>
    );
}

export default ColorPicker;