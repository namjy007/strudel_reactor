// src/components/StudioEditor.js
import React from 'react';

export default function StudioEditor({ onClose }) {
    return (
        <div
            className="curved-box gray-box"
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px',
                padding: '20px',
                borderRadius: '15px',
                backgroundColor: '#555', // same as control panel
                color: 'white',
                minHeight: '300px',
                fontSize: '16px', // slightly larger font for editor
            }}
        >
            {/* Optional small title inside the panel */}
            <h4 style={{ textAlign: 'center', margin: 0 }}>Sound Editor</h4>

            {/* Placeholder for future controls */}
            <p style={{ textAlign: 'center', fontSize: '16px' }}>
                Here you can add your sound controls: volume, effects, distortions, echo, etc.
            </p>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                <button
                    style={{ padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}
                    onClick={onClose}
                >
                    Cancel
                </button>
                <button
                    style={{ padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}
                    onClick={onClose} // For now, Save just closes the editor
                >
                    Save
                </button>
            </div>
        </div>
    );
}
