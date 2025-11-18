// src/components/StudioEditor.js
//The reason i decided to make a component for this is because it was getting really messy in the App.js so its better to have components. easy to access, work on and understand.


/* My feature for JSON handling starts from line 33 and ends at line 75 */

import React from 'react';
import { useState, useEffect } from 'react';
export default function SoundEditor({ onClose, procFunc }) {
    const instruments = ["Bassline", "Main Arp", "Drums", "Drums2"]; 
    const [currentInstrument, setCurrentInstrument] = useState(0); 
    
    const defaultSettings = {
        Bassline: { echo: false, room: 0.5, reverse: false, volume: 1, speed: 1 },
        "Main Arp": { echo: false, room: 0.5, reverse: false, volume: 1, speed: 1 },
        Drums: { echo: false, room: 0.5, reverse: false, volume: 1, speed: 1 },
        Drums2: { echo: false, room: 0.5, reverse: false, volume: 1, speed: 1 },
    }; // I might change this to app.js later just checking a draft work for now for my understanding

    const [settings, setSettings] = useState(defaultSettings);


    const [expanded, setExpanded] = useState({ /* The volume accordion is set as true to open first everytime the user opens the panel. */
        volume: true,
        echo: false,
        reverse: false,
        room: false,
        speed: false
    });

/* This is my JSON feature implemented as stated in the PDF. 
JSON HANDLING: This is reponsible for the saving and the 
loading of all the sound settings, each instrument from the 
strudel code (tunes.js) The data is stored in the browsers 
local storage ( i thought was a better way to implement this) 
in the JSON format, This enables user to not lose their 
settings even when they refresh the page.  */

    useEffect(() => { 
        const saved = localStorage.getItem('soundSettings'); // This will get the previous settings 
        const instruments = ["Bassline", "Main Arp", "Drums", "Drums2"];
        let initialSettings = {
            Bassline: { echo: false, room: 0.5, reverse: false, volume: 1, speed: 1 },
            "Main Arp": { echo: false, room: 0.5, reverse: false, volume: 1, speed: 1 },
            Drums: { echo: false, room: 0.5, reverse: false, volume: 1, speed: 1 },
            Drums2: { echo: false, room: 0.5, reverse: false, volume: 1, speed: 1 },
        };
        let parsed = null;
        if (saved) {
            parsed = JSON.parse(saved);
            // merge saved settings with dfealts
            instruments.forEach(inst => {
                if (parsed[inst]) {
                    initialSettings[inst] = { ...initialSettings[inst], ...parsed[inst] };
                }
            });
        }

        setSettings(initialSettings);

        // Initialize global objects for Strudle
        if (!window.instrumentVolumes) window.instrumentVolumes = {};
        if (!window.instrumentEchoes) window.instrumentEchoes = {};

        instruments.forEach(inst => {
            window.instrumentVolumes[inst] = initialSettings[inst].volume;
            window.instrumentEchoes[inst] = initialSettings[inst].echo ? 1 : 0;
        });
    }, []);

    const currentName = instruments[currentInstrument];
    const currentSettings = settings[currentName];
    const handleChangeSetting = (key, value) => {
        setSettings(prev => {
            const newSettings = {
                ...prev,
                [currentName]: {
                    ...prev[currentName],
                    [key]: value
                }
            };

            
            localStorage.setItem('soundSettings', JSON.stringify(newSettings));

            
            if (!window.instrumentVolumes) window.instrumentVolumes = {};
            if (!window.instrumentEchoes) window.instrumentEchoes = {};
            if (key === "volume") window.instrumentVolumes[currentName] = value;
            if (key === "echo") window.instrumentEchoes[currentName] = value ? 1 : 0;

            
            if (procFunc) procFunc();

            return newSettings;
        });
    };

    const handleToggleSetting = (key) => {
        handleChangeSetting(key, !currentSettings[key]);
    };


    const toggleAccordion = (key) => {
        setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
    };
    return (
        <div className="curved-box gray-box" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', padding: '20px', borderRadius: '15px', backgroundColor: '#555', color: 'white', minHeight: '500px', fontSize: '16px', width: '100%' }}>
            <h4 style={{ textAlign: 'center', margin: 0 }}>Sound Editor</h4>
            <p style={{ textAlign: 'center', fontSize: '16px' }}>Control per-instrument volume, effects, and playback options.</p>

            {/*This is one of thebootstrap used*/}
            <nav aria-label="Instrument navigation">
                <ul style={{ display: 'flex', gap: '10px', justifyContent: 'center', padding: 0, margin: 0, listStyle: 'none' }}>
                    <li>
                        <button disabled={currentInstrument === 0} onClick={() => setCurrentInstrument(currentInstrument - 1)} style={{ padding: '10px 20px', borderRadius: '8px', cursor: currentInstrument === 0 ? 'not-allowed' : 'pointer', backgroundColor: '#ccc', border: 'none' }}>Previous</button>
                    </li>
                    {instruments.map((inst, idx) => (
                        <li key={idx}>
                            <button onClick={() => setCurrentInstrument(idx)} style={{ padding: '10px 20px', borderRadius: '8px', backgroundColor: currentInstrument === idx ? '#888' : '#ddd', border: 'none' }}>{inst}</button>
                        </li>
                    ))}
                    <li>
                        <button disabled={currentInstrument === instruments.length - 1} onClick={() => setCurrentInstrument(currentInstrument + 1)} style={{ padding: '10px 20px', borderRadius: '8px', cursor: currentInstrument === instruments.length - 1 ? 'not-allowed' : 'pointer', backgroundColor: '#ccc', border: 'none' }}>Next</button>
                    </li>
                </ul>
            </nav>

            <p style={{ fontWeight: 'bold', fontSize: '18px' }}>Editing: {currentName}</p>
            
            <div style={{ width: '100%', maxWidth: '400px' }}>
                {["volume", "echo", "reverse", "room", "speed"].map(key => (
                    <div key={key} style={{ marginBottom: '8px', backgroundColor: '#666', borderRadius: '8px' }}>
                        <div onClick={() => toggleAccordion(key)} style={{ padding: '10px', cursor: 'pointer', fontWeight: 'bold', backgroundColor: expanded[key] ? '#888' : '#ccc', borderRadius: '8px' }}>
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                        </div>
                        {expanded[key] && (
                            <div style={{ padding: '10px', color: 'black', backgroundColor: '#ddd', borderRadius: '8px', marginTop: '5px' }}>
                                {["volume", "room", "speed"].includes(key) ? (
                                    <input type="range" min="0" max="2" step="0.01" value={currentSettings[key]} onChange={e => handleChangeSetting(key, parseFloat(e.target.value))} style={{ width: '100%' }} />
                                ) : (
                                    <input type="checkbox" checked={currentSettings[key]} onChange={() => handleToggleSetting(key)} />
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
                <button style={{ padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }} onClick={onClose}>Cancel</button>
                <button style={{ padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }} onClick={onClose}>Save</button>
            </div>
        </div>
    );
}