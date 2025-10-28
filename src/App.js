import './App.css';
import { useEffect, useState } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from './tunes';
import PlayPauseButton from './components/PlayPause';
import DarkModeToggle from './components/DayNight';
import SoundEditor from './components/SoundEditor';
let globalEditor = null;

export function ProcAndPlay() {
    if (globalEditor && globalEditor.repl.state.started) {
        Proc();
        globalEditor.evaluate();
    }
}

export function Proc() {
    const proc_text = document.getElementById('proc').value;
    const proc_text_replaced = proc_text.replaceAll('<p1_Radio>', ProcessText);
    ProcessText(proc_text);
    if (globalEditor) globalEditor.setCode(proc_text_replaced);
}

export function ProcessText(match, ...args) {
    return ""; // taking it off for now will implement it later, i will do some new design
}

export default function StrudelDemo() {
    const [darkMode, setDarkMode] = useState(false);
    const [editorReady, setEditorReady] = useState(false);
    const [showSoundEditor, setShowSoundEditor] = useState(false);
    useEffect(() => {
        const canvas = document.getElementById('roll');
        canvas.width = canvas.width * 2;
        canvas.height = canvas.height * 2;
        const drawContext = canvas.getContext('2d');
        const drawTime = [-2, 2];

        globalEditor = new StrudelMirror({
            defaultOutput: webaudioOutput,
            getTime: () => getAudioContext().currentTime,
            transpiler,
            root: document.getElementById('editor'),
            drawTime,
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
        if (globalEditor && globalEditor.root) {
            globalEditor.root.style.fontSize = '16px';
        }
        document.getElementById('proc').value = stranger_tune;
        Proc();
        setEditorReady(true); // editor is now ready for PlayPauseButton
    }, []);
    const handleEditClick = () => {
        setShowSoundEditor(true);
    };

    const handleSaveSound = (editedSound) => {
        console.log("Sound updated:", editedSound);
        setShowSoundEditor(false);
    };

    const handleCancelSound = () => {
        setShowSoundEditor(false);
    };
    return (
        <div className={darkMode ? 'night' : 'day'} style={{ minHeight: '100vh', padding: '20px' }}>
            <div className="header-bar" style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h2>Strudel Demo</h2>
                <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
            </div>
            {/*I was going through the pdf and just saw that Mark was using cells, but i did not like the design of cells because the left two cells took over a wider area hence i thought of changin it over and also have 3 cells instead of 4 */ }
            <div className="split-screen"> 
                <div className="left-side">
                    <div className="curved-box">
                        <label htmlFor="proc" className="box-label">Text to preprocess:</label>
                        <textarea
                            id="proc"
                            className="scrollable-box"
                            style={{ backgroundColor: darkMode ? '#4a4a4a' : '#777', color: 'white' }}
                        ></textarea>
                    </div>

                    <div
                        id="editor"
                        style={{
                            height: '350px',
                            width: '100%',
                            borderRadius: '15px',
                            backgroundColor: darkMode ? '#1e1e1e' : '#fdfdfd',
                            overflow: 'auto',
                            fontSize: '16px'
                        }}
                    ></div>

                    <canvas id="roll" style={{ display: 'none' }}></canvas>
                </div>

                <div className="right-side">
                    { /*Shwoing the Sound Editor instead of The control panhel it checks if its true or false and renders accordingly */ }
                    {showSoundEditor ? ( 
                        <SoundEditor onClose={handleCancelSound} />
                    ) : (
                        <div
                            className="curved-box gray-box"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '20px',
                                padding: '20px',
                                borderRadius: '15px',
                                backgroundColor: '#555'
                            }}
                        >
                            <h4 style={{ textAlign: 'center' }}>Control Panel</h4>

                            <div style={{ display: 'flex', gap: '30px', alignItems: 'center', justifyContent: 'center' }}>
                                {editorReady && <PlayPauseButton getEditor={() => globalEditor} />}

                                <div style={{ cursor: 'pointer', color: 'white' }} title="Delete">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-dash-circle-fill" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1z" />
                                    </svg>
                                </div>

                                <div
                                    onClick={handleEditClick}
                                    style={{ cursor: 'pointer', color: 'white' }}
                                    title="Edit"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
