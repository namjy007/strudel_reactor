import React from 'react';

export default function InfoPanel({ onClose }) {
    return (
        <div
            className="gray-box"
            style={{
                padding: '20px',
                borderRadius: '15px',
                backgroundColor: '#555',
                color: 'white',
                boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                maxWidth: '400px',
                margin: '0 auto',
                fontSize: '16px',
                height: '100%', // full height for consistent panel size
                overflowY: 'auto',
            }}
        >
            <h4 style={{ marginTop: 0, marginBottom: '15px', fontWeight: '600' }}>Application Overview</h4>
            <p style={{ lineHeight: 1.5, marginBottom: '12px' }}>
                The app seamlessly integrates a powerful text editor for writing Strudel audio code alongside a live Strudel panel where code is evaluated and audio is synthesized in real-time. On the left, you can view and edit music patterns interactively.
            </p>
            <p style={{ lineHeight: 1.5, marginBottom: '12px' }}>
                Beneath the editor, a dynamic D3-powered waveform visualization uses Web Audio API to visually represent the audio output, providing instant feedback on the sound.
            </p>
            <p style={{ lineHeight: 1.5, marginBottom: '12px' }}>
                The right control panel contains essential playback controls — including play, pause, and restore buttons — along with Export and Import functionality to save and load the compositions.
            </p>
            <p style={{ lineHeight: 1.5, marginBottom: '12px' }}>
                User will also find a detailed instruments table to mute/unmute sounds and adjust volumes, plus an advanced editor for tweaking instrument parameters such as echo, room reverb, playback speed, and volume. All controls update instantly and keep the UI consistent with a clean, dark theme.
            </p>
            <p style={{ lineHeight: 1.5 }}>
                This design ensures an intuitive and powerful environment for music synthesis, live coding, and auditory visualization.
            </p>

            <button
                onClick={onClose}
                style={{
                    marginTop: '25px',
                    backgroundColor: '#888',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 20px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                    display: 'block',
                    width: '100%',
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#aaa')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#888')}
            >
                Close
            </button>
        </div>
    );
}
