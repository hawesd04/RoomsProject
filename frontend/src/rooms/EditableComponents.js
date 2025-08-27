import React from 'react';
import './EditableComponents.css'

export const DivEditors = {
  'wide-text': ({ roomConfig, handlers }) => (
    <div className="component-info-cont">
      <label className="prof-label" htmlFor="widetext-input">Wide Text:</label>
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
      <label className="prof-label" htmlFor="banner-input">Banner Image URL:</label>
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
      <label className="prof-label" >Three Column Text:</label>
      <textarea
        className="widetext-input"
        type="text"
        placeholder="Text 1"
        value={roomConfig.divData['tri-text']?.text1 || ''}
        onChange={(e) => handlers.handleTriTextChange('text1', e.target.value)}
      />
      <textarea
        className="widetext-input"
        type="text"
        placeholder="Text 2"
        value={roomConfig.divData['tri-text']?.text2 || ''}
        onChange={(e) => handlers.handleTriTextChange('text2', e.target.value)}
      />
      <textarea
        className="widetext-input"
        type="text"
        placeholder="Text 3"
        value={roomConfig.divData['tri-text']?.text3 || ''}
        onChange={(e) => handlers.handleTriTextChange('text3', e.target.value)}
      />
    </div>
  ),

    'tri-text-labeled': ({ roomConfig, handlers }) => (
    <div className="component-info-cont">
      <label className="prof-label">Labeled Three Column Text</label>
      <input
        type="label"
        placeholder="Label 1"
        value={roomConfig.divData['tri-text-labeled']?.label1 || ''}
        onChange={(e) => handlers.handleLabelTriTextChange('label1', e.target.value)}
      />
      <textarea
        className="tri-textarea"
        type="text"
        placeholder="Text 1"
        value={roomConfig.divData['tri-text-labeled']?.text1 || ''}
        onChange={(e) => handlers.handleLabelTriTextChange('text1', e.target.value)}
      />
      <input
        type="label"
        placeholder="Label 2"
        value={roomConfig.divData['tri-text-labeled']?.label2 || ''}
        onChange={(e) => handlers.handleLabelTriTextChange('label2', e.target.value)}
      />
      <textarea
        className="tri-textarea"
        type="text"
        placeholder="Text 2"
        value={roomConfig.divData['tri-text-labeled']?.text2 || ''}
        onChange={(e) => handlers.handleLabelTriTextChange('text2', e.target.value)}
      />
      <input
        type="label"
        placeholder="Label 3"
        value={roomConfig.divData['tri-text-labeled']?.label3 || ''}
        onChange={(e) => handlers.handleLabelTriTextChange('label3', e.target.value)}
      />
      <textarea
        className="tri-textarea"
        type="text"
        placeholder="Text 3"
        value={roomConfig.divData['tri-text-labeled']?.text3 || ''}
        onChange={(e) => handlers.handleLabelTriTextChange('text3', e.target.value)}
      />
    </div>
  ),

  'image-text-text': ({ roomConfig, handlers }) => (
    <div className="component-info-cont">
      <label className="prof-label">Image + Text + Text:</label>
      <input
        type="text"
        className="banner-input"
        placeholder='Enter image URL'
        value={roomConfig.divData['image-text-text']?.imageUrl || ''}
        onChange={(e) => handlers.handleITTChange('imageUrl', e.target.value)}
      />
      <textarea
        className="widetext-input"
        type="text"
        placeholder="Text 1"
        value={roomConfig.divData['image-text-text']?.text1 || ''}
        onChange={(e) => handlers.handleITTChange('text1', e.target.value)}
      />
      <textarea
        className="widetext-input"
        type="text"
        placeholder="Text 2"
        value={roomConfig.divData['image-text-text']?.text2 || ''}
        onChange={(e) => handlers.handleITTChange('text2', e.target.value)}
      />
    </div>
  ),

    'text-image-text': ({ roomConfig, handlers }) => (
    <div className="component-info-cont">
      <label className="prof-label">Text + Image + Text:</label>
      <textarea
        className="widetext-input"
        type="text"
        placeholder="Text 1"
        value={roomConfig.divData['text-image-text']?.text1 || ''}
        onChange={(e) => handlers.handleTITChange('text1', e.target.value)}
      />
      <input
        type="text"
        className="banner-input"
        placeholder='Enter image URL'
        value={roomConfig.divData['text-image-text']?.imageUrl || ''}
        onChange={(e) => handlers.handleTITChange('imageUrl', e.target.value)}
      />
      <textarea
        className="widetext-input"
        type="text"
        placeholder="Text 2"
        value={roomConfig.divData['text-image-text']?.text2 || ''}
        onChange={(e) => handlers.handleTITChange('text2', e.target.value)}
      />
    </div>
  ),

  'text-text-image': ({ roomConfig, handlers }) => (
    <div className="component-info-cont">
      <label className="prof-label">Text + Text + Image:</label>
      <textarea
        className="widetext-input"
        type="text"
        placeholder="Text 1"
        value={roomConfig.divData['text-text-image']?.text1 || ''}
        onChange={(e) => handlers.handleTTIChange('text1', e.target.value)}
      />
      <textarea
        className="widetext-input"
        type="text"
        placeholder="Text 2"
        value={roomConfig.divData['text-text-image']?.text2 || ''}
        onChange={(e) => handlers.handleTTIChange('text2', e.target.value)}
      />
      <input
        type="text"
        className="banner-input"
        placeholder='Enter image URL'
        value={roomConfig.divData['text-text-image']?.imageUrl || ''}
        onChange={(e) => handlers.handleTTIChange('imageUrl', e.target.value)}
      />
    </div>
  ),

};
export default DivEditors;