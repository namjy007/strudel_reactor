import React, { useState, useEffect } from 'react';
//I amde some changes to this too since last commit, my button was broken it wouldnt change on if the sound was playing hence now it works more smartly 
export default function PlayPauseButton({ getEditor }) {
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            const editor = getEditor?.();
            if (!editor) return;
            const playing = editor.repl?.state?.started === true;
            if (playing !== isPlaying) {
                setIsPlaying(playing);
            }
        }, 100);
        return () => clearInterval(interval);
    }, [getEditor, isPlaying]);

    const handleToggle = () => {
        const editor = getEditor?.();
        if (!editor) return;

        if (isPlaying) {
            editor.stop(); /*This changes their icon on detecting if music is playing or not */
            setIsPlaying(false);
        } else {
            editor.evaluate();
            setIsPlaying(true);
        }
    };

    return (
        <div
            onClick={handleToggle}
            style={{ cursor: 'pointer', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            title={isPlaying ? "Pause" : "Play"}
        >
            {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-pause-fill" viewBox="0 0 16 16">
                    <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5"/>
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-play-fill" viewBox="0 0 16 16">
                    <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
                </svg>
            )}
        </div>
    );
}
