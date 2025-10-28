// src/components/StudioEditor.js 
//The reason i decided to make a component for this is because it was getting really messy in the App.js so its better to have components. easy to access, work on and understand.
import React from 'react';
import { useState } from 'react';
export default function SoundEditor({ onClose }) {
    const instruments = ["Bassline", "Main Arp", "Drums", "Drums2"]; 
    const [currentInstrument, setCurrentInstrument] = useState(0); 
    
    const [settings, setSettings] = useState({
        Bassline: { echo: false, room: 0.5, reverse: false, volume: 1, speed: 1 },
        "Main Arp": { echo: false, room: 0.5, reverse: false, volume: 1, speed: 1 },
        Drums: { echo: false, room: 0.5, reverse: false, volume: 1, speed: 1 },
        Drums2: { echo: false, room: 0.5, reverse: false, volume: 1, speed: 1 },
    });// I might change this to app.js later just checking a draft work for now for my understanding
    const [expanded, setExpanded] = useState({
        volume: true,
        echo: false,
        reverse: false,
        room: false,
        speed: false
    });
    const currentName = instruments[currentInstrument];
    const currentSettings = settings[currentName];
    const handleToggleSetting = (key) => {
        setSettings({
            ...settings,
            [currentName]: {
                ...currentSettings,
                [key]: typeof currentSettings[key] === 'boolean' ? !currentSettings[key] : currentSettings[key]
            }
        });
    };

    const handleChangeSetting = (key, value) => {
        setSettings({
            ...settings,
            [currentName]: { ...currentSettings, [key]: value }
        });
    };

    const toggleAccordion = (key) => {
        setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
    };
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
                minHeight: '500px',
                fontSize: '16px',
                width: '100%',
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
            {/*This will display the the current sound that is highlighted */}
            <p style={{ fontWeight: 'bold', fontSize: '18px' }}>Editing: {currentName}</p>

            {/* I decided to implement accordion as one of the bootstrap components of 5 that was a requirement. Referenced from shttps://getbootstrap.com/docs/5.3/components/accordion/  */}
            <div style={{ width: '100%', maxWidth: '400px' }}>
                {["volume", "echo", "reverse", "room", "speed"].map(key => (
                    <div key={key} className="accordion-item" style={{ marginBottom: '8px', backgroundColor: '#666', borderRadius: '8px' }}>
                        <div
                            className="accordion-header"
                            onClick={() => toggleAccordion(key)}
                            style={{
                                padding: '10px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                color: 'black',
                                backgroundColor: expanded[key] ? '#888' : '#ccc',
                                borderRadius: '8px'
                            }}
                        >
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                        </div>
                        {expanded[key] && (
                            <div className="accordion-body" style={{ padding: '10px', color: 'black', backgroundColor: '#ddd', borderRadius: '8px', marginTop: '5px' }}>
                                {key === "volume" || key === "room" || key === "speed" ? (
                                    <input
                                        type="range"
                                        min={key === "volume" ? "0" : key === "room" ? "0" : "0.5"}
                                        max={key === "volume" ? "2" : key === "room" ? "1" : "2"}
                                        step="0.01"
                                        value={currentSettings[key]}
                                        onChange={(e) => handleChangeSetting(key, parseFloat(e.target.value))}
                                        style={{ width: '100%' }}
                                    />
                                ) : (
                                    <input
                                        type="checkbox"
                                        checked={currentSettings[key]}
                                        onChange={() => handleToggleSetting(key)}
                                    />
                                )}
                                <p style={{ marginTop: '5px', fontSize: '12px', color: '#222' }}>
                                    {key === "volume" && "Adjust the loudness of the sound."}
                                    {key === "echo" && "Add an echo effect to the sound."}
                                    {key === "reverse" && "Play the sound backwards."}
                                    {key === "room" && "Adjust the room effect for reverb/space."}
                                    {key === "speed" && "Adjust playback speed of the sound."}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            
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