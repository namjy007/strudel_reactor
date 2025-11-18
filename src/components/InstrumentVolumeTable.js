// src/components/InstrumentVolumeTable.js
import React, { useState, useEffect } from 'react';

const instruments = ["Bassline", "Main Arp", "Drums", "Drums2"];

export default function InstrumentVolumeTable({ procFunc }) {
    // Local mute states: true means muted (volume set to 0)
    const [muted, setMuted] = useState({});

    // Initialize mute states from global volumes on mount
    useEffect(() => {
        const initialMute = {};
        instruments.forEach(inst => {
            const vol = window.instrumentVolumes?.[inst] ?? 1;
            initialMute[inst] = (vol === 0);
        });
        setMuted(initialMute);
    }, []);

    // Toggle mute for specific instrument
    const toggleMute = (inst) => {
        setMuted(prev => {
            const newMute = { ...prev, [inst]: !prev[inst] };

            // Set global volume to 0 or 1 depending on mute state
            window.instrumentVolumes = window.instrumentVolumes || {};
            window.instrumentVolumes[inst] = newMute[inst] ? 0 : 1;

            if (procFunc) procFunc();

            return newMute;
        });
    };

    return (
        <div className="instrument-volume-table" style={{ overflowX: "auto" }}>
            <table className="table table-bordered table-hover table-sm" style={{ marginTop: '10px' }}>
                <thead className="table-dark">
                    <tr>
                        <th>Instrument</th>
                        <th>Mute</th>
                    </tr>
                </thead>
                <tbody>
                    {instruments.map(inst => (
                        <tr key={inst}>
                            <td>{inst}</td>
                            <td>
                                <button
                                    type="button"
                                    className={`btn btn-sm ${muted[inst] ? 'btn-danger' : 'btn-success'}`}
                                    onClick={() => toggleMute(inst)}
                                >
                                    {muted[inst] ? 'Unmute' : 'Mute'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
