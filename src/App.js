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
import console_monkey_patch, { getD3Data } from './console-monkey-patch';

let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};

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
        document.addEventListener("d3Data", handleD3Data);
        console_monkey_patch();
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
const boxHeight = '250px';
const boxWidth = '100%';
return (
    <div className={darkMode ? 'night' : 'day'} style={{ minHeight: '100vh', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
            <button onClick={() => setDarkMode(!darkMode)} className="dark-mode-toggle">
                {darkMode ? 'Day' : 'Night'}
            </button>
        </div>

        <h2 style={{ marginBottom: '20px', color: darkMode ? '#fff' : '#333' }}>Strudel Demo</h2>
        <main>

            <div className="container-fluid">
                <div className="row mb-3">
                    
                    <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        <label htmlFor="exampleFormControlTextarea1" className="form-label" style={{ fontWeight: 'bold', color: '#fff' }}>Text to preprocess:</label>
                        <textarea className="form-control" rows="15" id="proc" style={{ backgroundColor: '#949491', color: 'white', borderRadius: '15px', padding: '10px', resize: 'none' }} ></textarea>
                    </div>
                    <div className="col-md-4" style={{ backgroundColor: '#666662', borderRadius: '15px', padding: '15px', display: 'flex', flexDirection: 'column', gap: '10px', height: '100%' }}>
                        <button id="process" className="btn btn-outline-light">Preprocess</button>
                        <button id="process_play" className="btn btn-outline-light">Proc & Play</button>
                        <button id="play" className="btn btn-outline-light">Play</button>
                        <button id="stop" className="btn btn-outline-light">Stop</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4" style={{ backgroundColor: '#666662', borderRadius: '15px', padding: '15px', display: 'flex', flexDirection: 'column', gap: '10px', height: '100%' }}>'auto' }}>
                        <div id="editor" style={{ minHeight: '250px' }} />
                        <div id="output" />
                    </div>
                    <div className="col-md-4" style={{ backgroundColor: '#666662', borderRadius: '15px', padding: '15px', display: 'flex', flexDirection: 'column', gap: '10px', height: '100%' }}>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={ProcAndPlay} defaultChecked />
                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                p1: ON
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onChange={ProcAndPlay} />
                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                p1: HUSH
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <canvas id="roll"></canvas>
        </main >
    </div >
);


}