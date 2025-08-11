import React, { useState } from 'react';

const DivManager = (availableDivs) => {

  const [enabledDivs, setEnabledDivs] = useState(['wide-text', 'banner-wide']);
  const [selectedDiv, setSelectedDiv] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  // Handle drag start from available divs
  const handleDragStart = (e, divId, source) => {
    setDraggedItem({ divId, source });
    e.dataTransfer.effectAllowed = 'move';
  };

  // Handle drag over enabled divs area
  const handleDragOver = (e, index = null) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };

  // Handle drop into enabled divs
  const handleDrop = (e, dropIndex = null) => {
    e.preventDefault();
    
    if (!draggedItem) return;

    const { divId, source } = draggedItem;
    
    if (source === 'available') {
      // Adding new div from available list
      if (enabledDivs.includes(divId)) return; // Already enabled
      
      const newEnabledDivs = [...enabledDivs];
      
      if (dropIndex !== null) {
        // Insert at specific position
        newEnabledDivs.splice(dropIndex, 0, divId);
      } else {
        // Add to end
        newEnabledDivs.push(divId);
      }
      
      setEnabledDivs(newEnabledDivs);
    } else if (source === 'enabled') {
      // Reordering existing enabled div
      const newEnabledDivs = [...enabledDivs];
      const currentIndex = newEnabledDivs.indexOf(divId);
      
      // Remove from current position
      newEnabledDivs.splice(currentIndex, 1);
      
      // Calculate new position
      let newIndex = dropIndex !== null ? dropIndex : newEnabledDivs.length;
      if (currentIndex < newIndex) newIndex--; // Adjust for removal
      
      // Insert at new position
      newEnabledDivs.splice(newIndex, 0, divId);
      
      setEnabledDivs(newEnabledDivs);
    }
    
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  // Remove div from enabled list
  const removeDiv = (divId) => {
    setEnabledDivs(enabledDivs.filter(id => id !== divId));
    if (selectedDiv === divId) setSelectedDiv(null);
  };

  // Clear drag state on drag end
  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  return (
    <div className="w-full h-screen bg-gray-900 text-white p-4">
      <h1 className="text-2xl mb-4">Div Manager</h1>
      
      <div className="flex gap-4 h-3/4">
        {/* Available Divs - Left Panel */}
        <div className="w-1/3 bg-gray-800 rounded-lg p-4">
          <h2 className="text-lg mb-4 text-center">Available Divs</h2>
          <div className="space-y-2">
            {Object.entries(availableDivs).map(([divId, info]) => (
              <div
                key={divId}
                draggable
                onDragStart={(e) => handleDragStart(e, divId, 'available')}
                onDragEnd={handleDragEnd}
                className={`p-3 bg-gray-700 rounded cursor-move hover:bg-gray-600 transition-colors ${
                  enabledDivs.includes(divId) ? 'opacity-50' : ''
                }`}
              >
                <div className="font-medium">{info.name}</div>
                <div className="text-sm text-gray-300">{info.description}</div>
                {enabledDivs.includes(divId) && (
                  <div className="text-xs text-green-400 mt-1">✓ Enabled</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Enabled Divs - Right Panel */}
        <div className="w-1/3 bg-gray-800 rounded-lg p-4">
          <h2 className="text-lg mb-4 text-center">Enabled Divs (Order)</h2>
          <div
            className="min-h-full space-y-2"
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e)}
          >
            {enabledDivs.map((divId, index) => (
              <div key={`enabled-${divId}-${index}`}>
                {/* Drop zone above each item */}
                <div
                  className={`h-2 transition-colors ${
                    dragOverIndex === index ? 'bg-blue-500 bg-opacity-50' : ''
                  }`}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDrop={(e) => handleDrop(e, index)}
                />
                
                {/* Enabled div item */}
                <div
                  draggable
                  onDragStart={(e) => handleDragStart(e, divId, 'enabled')}
                  onDragEnd={handleDragEnd}
                  onClick={() => setSelectedDiv(divId)}
                  className={`p-3 rounded cursor-move transition-colors ${
                    selectedDiv === divId 
                      ? 'bg-blue-600 ring-2 ring-blue-400' 
                      : 'bg-gray-700 hover:bg-gray-600'
                  } ${
                    draggedItem?.divId === divId ? 'opacity-50' : ''
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">{availableDivs[divId]?.name}</div>
                      <div className="text-xs text-gray-400">Position: {index + 1}</div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeDiv(divId);
                      }}
                      className="text-red-400 hover:text-red-300 text-xl"
                    >
                      ×
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Drop zone at the end */}
            <div
              className={`h-8 border-2 border-dashed border-gray-600 rounded transition-colors ${
                dragOverIndex === enabledDivs.length ? 'border-blue-500 bg-blue-500 bg-opacity-20' : ''
              }`}
              onDragOver={(e) => handleDragOver(e, enabledDivs.length)}
              onDrop={(e) => handleDrop(e, enabledDivs.length)}
            >
              <div className="text-center text-gray-500 text-sm pt-1">
                Drop here to add to end
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Debug Info */}
      <div className="mt-4 p-4 bg-gray-800 rounded">
        <h3 className="text-sm mb-2">Current Order:</h3>
        <code className="text-xs text-green-400">
          {JSON.stringify(enabledDivs, null, 2)}
        </code>
        {selectedDiv && (
          <div className="mt-2">
            <span className="text-sm">Selected: </span>
            <code className="text-xs text-blue-400">{selectedDiv}</code>
          </div>
        )}
      </div>
    </div>
  );
};

export default DivManager;