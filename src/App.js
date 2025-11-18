// src/App.js
import './App.css';
import { useEffect, useState } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick, getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from './tunes';
import PlayPauseButton from './components/PlayPause';
import DarkModeToggle from './components/DayNight';
import SoundEditor from './components/SoundEditor';
import ExportButton from './components/ExportButton';
import ImportButton from './components/ImportButton';
let globalEditor = null;


export function ProcAndPlay() {
    if (globalEditor && globalEditor.repl.state.started) {
        Proc();
        globalEditor.evaluate();
    }
}


export function Proc() {
    const proc_text = document.getElementById('proc').value;

    /* Here the volumes are set before hand, i did work on echoes too but havent completely implemented it so far.  */
    if (!window.instrumentVolumes) window.instrumentVolumes = { Bassline: 1, "Main Arp": 1, Drums: 1, Drums2: 1 };
    if (!window.instrumentEchoes)
        window.instrumentEchoes = { Bassline: 0, "Main Arp": 0, Drums: 0, Drums2: 0 };

    let proc_text_replaced = proc_text // This replaces all the current volume of the instruments and fills in with the slider data 
        .replaceAll('<basslineVolume>', window.instrumentVolumes.Bassline)
        .replaceAll('<mainArpVolume>', window.instrumentVolumes["Main Arp"])
        .replaceAll('<drumsVolume>', window.instrumentVolumes.Drums)
        .replaceAll('<drums2Volume>', window.instrumentVolumes.Drums2)
        .replaceAll('<basslineEcho>', window.instrumentEchoes.Bassline)
        .replaceAll('<mainArpEcho>', window.instrumentEchoes["Main Arp"])
        .replaceAll('<drumsEcho>', window.instrumentEchoes.Drums)
        .replaceAll('<drums2Echo>', window.instrumentEchoes.Drums2);

    if (globalEditor) {
        globalEditor.setCode(proc_text_replaced);
        globalEditor.evaluate();
    }
}
window.Proc = Proc;


export default function StrudelDemo() {
    const [darkMode, setDarkMode] = useState(false);
    const [editorReady, setEditorReady] = useState(false);
    const [showSoundEditor, setShowSoundEditor] = useState(false); // This were from previous commits 

    useEffect(() => {
        const canvas = document.getElementById('roll');
        canvas.width *= 2;
        canvas.height *= 2;
        const drawContext = canvas.getContext('2d');
        const drawTime = [-2, 2];

        globalEditor = new StrudelMirror({
            defaultOutput: webaudioOutput,
            getTime: () => getAudioContext().currentTime,
            transpiler,
            root: document.getElementById('editor'),
            drawTime: [-2, 2],
            onDraw: (haps, time) => drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
            prebake: async () => {
                initAudioOnFirstClick();
                const loadModules = evalScope(
                    import('@strudel/core'),
                    import('@strudel/draw'),
                    import('@strudel/mini'),
                    import('@strudel/tonal'),
                    import('@strudel/webaudio'),
                );
                await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);
            },
        });

        if (globalEditor?.root) {
            globalEditor.root.style.fontSize = '16px';
            globalEditor.root.style.overflowY = 'auto'; // scrollable Strudel editor
        }
        document.getElementById('proc').value = stranger_tune;

        
        const savedSettings = localStorage.getItem('soundSettings');
        if (savedSettings) {
            const parsed = JSON.parse(savedSettings);
            window.instrumentVolumes = {
                Bassline: parsed.Bassline?.volume ?? 1,
                "Main Arp": parsed["Main Arp"]?.volume ?? 1,
                Drums: parsed.Drums?.volume ?? 1,
                Drums2: parsed.Drums2?.volume ?? 1, // This reads the saved settings or values of volume so that the sound editor doesnt reset itself every time 
            };
            window.instrumentEchoes = {
                Bassline: parsed.Bassline?.echo ? 1 : 0,
                "Main Arp": parsed["Main Arp"]?.echo ? 1 : 0,
                Drums: parsed.Drums?.echo ? 1 : 0,
                Drums2: parsed.Drums2?.echo ? 1 : 0,
            };
        } else {
            window.instrumentVolumes = { Bassline: 1, "Main Arp": 1, Drums: 1, Drums2: 1 }; /* this checks if the volume were altered before if not it will alter  */
            window.instrumentEchoes = { Bassline: 0, "Main Arp": 0, Drums: 0, Drums2: 0 }; 
        }

        Proc(); 
        setEditorReady(true);
    }, []);

    const handleEditClick = () => setShowSoundEditor(true);
    const handleCancelSound = () => setShowSoundEditor(false);

    return ( /* This UI, i have imposed gray, black and white tone. */
        <div className={darkMode ? 'night' : 'day'} >
            <div className="header-bar" >
                <h2>Strudel Demo</h2>
                <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
            </div>

            <div className="split-screen">
                <div className="left-side">
                    <div className="curved-box">
                        <label htmlFor="proc">Text to preprocess:</label>
                        <textarea id="proc" className="scrollable-box"></textarea>
                    </div>

                    <div id="editor" className="curved-box"></div>

                    <canvas id="roll" style={{ height: '150px', borderRadius: '10px', backgroundColor: '#222' }}></canvas>
                </div>

                <div className="right-side">
                    {showSoundEditor ? (
                        <SoundEditor onClose={handleCancelSound} procFunc={Proc} />
                    ) : (
                        <div className="gray-box">
                            <h4 style={{ textAlign: 'center' }}>Control Panel</h4>

                            <div className="d-flex gap-3 justify-content-center align-items-center" style={{ flexWrap: 'wrap', marginBottom: '20px' }}>
                                {editorReady && <div className="btn btn-success"><PlayPauseButton getEditor={() => globalEditor} /></div>}
                                <div className="btn btn-danger" title="Restore">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white"
                                        className="bi bi-dash-circle-fill" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1z" />
                                    </svg>
                                </div>
                                <div className="btn btn-warning" onClick={handleEditClick} title="Edit">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white"
                                        className="bi bi-pencil" viewBox="0 0 16 16">
                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                                    </svg>
                                </div>
                            </div>
                                /* here these buttons are imported from their respectvie components */
                            <div className="export-container">
                                    <ExportButton />
                                    
                                <ImportButton /> 
                                </div> 
                        </div>
                    )}
                </div>
            </div>
        </div>
           
    );
}
