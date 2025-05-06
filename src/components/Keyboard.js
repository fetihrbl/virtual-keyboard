import React, { useState } from 'react';
import './Keyboard.css';

const layout = [
    ['~', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
    ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
    ['Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'],
    ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'],
    ['Ctrl', 'Alt', 'Space', 'Alt', 'Ctrl']
];

const shiftMap = {
    '1': '!', '2': '@', '3': '#', '4': '$', '5': '%',
    '6': '^', '7': '&', '8': '*', '9': '(', '0': ')',
    '-': '_', '=': '+', '[': '{', ']': '}', '\\': '|',
    ';': ':', "'": '"', ',': '<', '.': '>', '/': '?', '`': '~'
};

export default function Keyboard() {
    const [text, setText] = useState('');
    const [capsLock, setCapsLock] = useState(false);
    const [shift, setShift] = useState(false);

    const handleKeyPress = (key) => {
        switch(key){
            case 'Backspace':
                setText(prev => prev.slice(0, -1));
                break;
            case 'Tab':
                setText(prev => prev + '\t');
                break;
            case 'Enter':
                setText(prev => prev + '\n');
                break;
            case 'Space':
                setText(prev => prev + ' ');
                break;
            case 'Caps Lock':
                setCapsLock(prev => !prev);
                break;
            case 'Shift':
                setShift(prev => !prev);
                break;
            case 'Ctrl':
            case 'Alt':
                break;
            default:
                setText(prev => prev + transformCharacter(key));
                if(shift) setShift(false);
                break;
        }
    };

    const transformCharacter = (key) => {
        const isLetter = key.length === 1 && /[a-zA-Z]/.test(key);
        let char = key;

        if (shift && shiftMap[key]) {
            char = shiftMap[key];
        } else if(isLetter) {
            const upper = key.toUpperCase();
            const lower = key.toLowerCase();
            const shouldUpper = capsLock !== shift;
            char = shouldUpper ? upper : lower;
        }
        return char;
    }

    return(
        <div className="keyboard">
            <div  className="display">
                <pre>{text}</pre>
            </div>
            {layout.map((row, i) => (
                <div key={i} className="keyboard-row">
                    {row.map((key) => (
                        <button
                            key={key}
                            className={`key ${key.toLowerCase().replace(' ', '-')}` + 
                              (['Shift', 'Caps Lock'].includes(key) && (
                                  (key === 'Shift' && shift) || 
                                  (key === 'Caps Lock' && capsLock)
                              ) ? ' active' : '')}
                              onClick={() => handleKeyPress(key)}
                        >
                            {key === 'Space' ? ' ' : key}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    )
}