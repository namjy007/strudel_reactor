// src/components/StudioEditor.js 
//The reason i decided to make a component for this is because it was getting really messy in the App.js so its better to have components. easy to access, work on and understand.
import React from 'react';
import { useState } from 'react';
export default function SoundEditor({ onClose }) {
    const instruments = ["Bassline", "Main Arp", "Drums", "Drums2"]; 
    const [currentInstrument, setCurrentInstrument] = useState(0); 
    

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
                backgroundColor: '#555',
                color: 'white',
                minHeight: '300px',
                fontSize: '16px',
            }}
        >
            {/* The title changes from the control panel to the Sound Panel*/}
            <h4 style={{ textAlign: 'center', margin: 0 }}>Sound Editor</h4>

            {/* This is just for the commit i will remove it later in the next commits or versions*/}
            <p style={{ textAlign: 'center', fontSize: '16px' }}>
                Here you can add your sound controls: volume, effects, distortions, echo, etc.
            </p>

            {/* One of the Bootstrap feature out of 5, Pagination. Referenced from shttps://getbootstrap.com/docs/5.3/components/pagination/ */}
            <nav aria-label="Instrument navigation">
                <ul
                    className="pagination"
                    style={{
                        justifyContent: 'center',
                        display: 'flex',
                        gap: '10px',
                        padding: 0,
                        margin: 0,
                        listStyle: 'none',
                        flexWrap: 'wrap',
                    }}
                >
                    <li>
                        <button
                            style={{
                                padding: '10px 20px',
                                borderRadius: '8px',
                                cursor: currentInstrument === 0 ? 'not-allowed' : 'pointer',
                                backgroundColor: '#ccc',
                                color: 'black',
                                border: 'none',
                            }}
                            disabled={currentInstrument === 0}
                            onClick={() => setCurrentInstrument(currentInstrument - 1)}
                        >
                            Previous
                        </button>
                    </li>

                    {instruments.map((inst, idx) => (
                        <li key={idx}>
                            <button
                                style={{
                                    padding: '10px 20px',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    backgroundColor: currentInstrument === idx ? '#888' : '#ddd',
                                    color: 'black',
                                    border: 'none',
                                }}
                                onClick={() => setCurrentInstrument(idx)}
                            >
                                {inst}
                            </button>
                        </li>
                    ))}

                    <li>
                        <button
                            style={{
                                padding: '10px 20px',
                                borderRadius: '8px',
                                cursor: currentInstrument === instruments.length - 1 ? 'not-allowed' : 'pointer',
                                backgroundColor: '#ccc',
                                color: 'black',
                                border: 'none',
                            }}
                            disabled={currentInstrument === instruments.length - 1}
                            onClick={() => setCurrentInstrument(currentInstrument + 1)}
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>

            
            <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                <button
                    style={{ padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}
                    onClick={onClose}
                >
                    Cancel
                </button>
                <button
                    style={{ padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}
                    onClick={onClose} // For now Save just closes the editor
                >
                    Save
                </button>
            </div>
        </div>
    );
}