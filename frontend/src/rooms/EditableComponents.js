import React from 'react';
import './EditableComponents.css'

export const DivEditors = {
  'wide-text': ({ roomConfig, handlers }) => (
    <div className="component-info-cont">
      <label htmlFor="widetext-input">Wide Text:</label>
      <textarea
        className="widetext-input"
        placeholder='Enter whatever you would like :)'
        value={roomConfig.divData['wide-text']?.text || ''}
        onChange={handlers.handleWideTextChange}
      />
    </div>
  ),

  'banner-wide': ({ roomConfig, handlers }) => (
    <div className="component-info-cont">
      <label htmlFor="banner-input">Banner Image URL:</label>
      <input
        type="text"
        className="banner-input"
        placeholder='Enter image URL'
        value={roomConfig.divData['banner-wide']?.imageUrl || ''}
        onChange={handlers.handleBannerChange}
      />
    </div>
  ),

  'tri-text': ({ roomConfig, handlers }) => (
    <div className="component-info-cont">
      <label>Triple Text:</label>
      <input
        type="text"
        placeholder="Text 1"
        value={roomConfig.divData['tri-text']?.text1 || ''}
        onChange={(e) => handlers.handleTriTextChange('text1', e.target.value)}
      />
      <input
        type="text"
        placeholder="Text 2"
        value={roomConfig.divData['tri-text']?.text2 || ''}
        onChange={(e) => handlers.handleTriTextChange('text2', e.target.value)}
      />
      <input
        type="text"
        placeholder="Text 3"
        value={roomConfig.divData['tri-text']?.text3 || ''}
        onChange={(e) => handlers.handleTriTextChange('text3', e.target.value)}
      />
    </div>
  ),
};
export default DivEditors;