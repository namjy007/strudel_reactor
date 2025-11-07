import React from 'react';
// This is the button that toggles day and night on and off.
export default function DarkModeToggle({ darkMode, setDarkMode }) {

    const handleClick = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div
            onClick={handleClick}
            style={{
                cursor: 'pointer',
                border: '1px solid currentColor',
                borderRadius: '10px',
                padding: '10px 15px',
                display: 'inline-block'
            }}
            title={darkMode ? "Switch to Day" : "Switch to Night"}
        >
            {darkMode ? 'Night' : 'Day'}
        </div>
    );
}
