import './App.css';
import { useEffect, useRef, useState } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from './tunes';
//import console_monkey_patch, { getD3Data } from './console-monkey-patch';

let globalEditor = null;

//const handleD3Data = (event) => {
  //  console.log(event.detail);
//};

export function SetupButtons() {

    document.getElementById('play').addEventListener('click', () => globalEditor.evaluate());
    document.getElementById('stop').addEventListener('click', () => globalEditor.stop());
    document.getElementById('process').addEventListener('click', () => {
        Proc()
    }
    )
    document.getElementById('process_play').addEventListener('click', () => {
        if (globalEditor != null) {
            Proc()
            globalEditor.evaluate()
        }
    }
    )
}



export function ProcAndPlay() {
    if (globalEditor != null && globalEditor.repl.state.started == true) {
        console.log(globalEditor)
        Proc()
        globalEditor.evaluate();
    }
}

export function Proc() {

    let proc_text = document.getElementById('proc').value
    let proc_text_replaced = proc_text.replaceAll('<p1_Radio>', ProcessText);
    ProcessText(proc_text);
    globalEditor.setCode(proc_text_replaced)
}

export function ProcessText(match, ...args) {

    let replace = ""
    if (document.getElementById('flexRadioDefault2').checked) {
        replace = "_"
    }

    return replace
}

export default function StrudelDemo() {

const [darkMode, setDarkMode] = useState(false);
   
const hasRun = useRef(false);

useEffect(() => {

    if (!hasRun.current) {
       // document.addEventListener("d3Data", handleD3Data);
        //console_monkey_patch();
        hasRun.current = true;
        //Code copied from example: https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl
            //init canvas
            const canvas = document.getElementById('roll');
            canvas.width = canvas.width * 2;
            canvas.height = canvas.height * 2;
            const drawContext = canvas.getContext('2d');
            const drawTime = [-2, 2]; // time window of drawn haps
            globalEditor = new StrudelMirror({
                defaultOutput: webaudioOutput,
                getTime: () => getAudioContext().currentTime,
                transpiler,
                root: document.getElementById('editor'),
                drawTime,
                onDraw: (haps, time) => drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
                prebake: async () => {
                    initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
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
            
        document.getElementById('proc').value = stranger_tune
        SetupButtons()
        Proc()
    }

}, []);

return (
    <div className={darkMode ? 'night' : 'day'}>
    
        <div className="header-bar">
            <h2>Strudel Demo</h2>
            <button onClick={() => setDarkMode(!darkMode)} className="dark-mode-toggle">
                {darkMode ? 'Day' : 'Night'}
            </button>
        </div>

            <div className="split-screen">
                {/* LImagining it as a split screen for the Ui to look better*/}
                <div className="left-side">
                    {/* The text box will be here where we are inputting the code that turens into music  */}
                    <div className="curved-box">
                        <label htmlFor="proc" className="box-label">Text to preprocess:</label>
                        <textarea
                            id="proc"
                            className="scrollable-box"
                            style={{ backgroundColor: darkMode ? '#4a4a4a' : '#777', color: 'white' }}
                        ></textarea>
                    </div>

                    {/* The editor strudel display  */}
                    <div
                        id="editor"
                        style={{
                            height: '350px',      // editor height
                            width: '100%',
                            borderRadius: '15px',
                            backgroundColor: darkMode ? '#1e1e1e' : '#fdfdfd',
                            overflow: 'auto',
                        }}
                    ></div>

                    <canvas id="roll" style={{ display: 'none' }}></canvas>
                </div>

                {/* The right side of the screen where the actual buttons and futur work will be */}
                <div className="right-side">
                    <div className="curved-box gray-box">
                        <h4>Control Panel</h4>
                        <button id="process" className="btn btn-outline-light">Preprocess</button>
                        <button id="process_play" className="btn btn-outline-light">Proc & Play</button>
                        <button id="play" className="btn btn-outline-light">Play</button>
                        <button id="stop" className="btn btn-outline-light">Stop</button>

                        <div style={{ marginTop: '15px' }}>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={ProcAndPlay} defaultChecked />
                                <label className="form-check-label">p1: ON</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onChange={ProcAndPlay} />
                                <label className="form-check-label">p1: HUSH</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
