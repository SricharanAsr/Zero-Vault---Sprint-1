import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { useAutoLock } from '../contexts/AutoLockContext';

export default function StealthOverlay() {
    const { isStealth, exitStealth, enterStealth } = useAutoLock();
    const [display, setDisplay] = useState('0');

    // Global Hotkey for Stealth Mode
    useEffect(() => {
        const handleKeys = (e: KeyboardEvent) => {
            // Alt + Shift + S for Stealth
            if (e.altKey && e.shiftKey && (e.key === 's' || e.key === 'S')) {
                e.preventDefault();
                // Toggle
                if (isStealth) exitStealth();
                else enterStealth();
            }
        };
        window.addEventListener('keydown', handleKeys);
        return () => window.removeEventListener('keydown', handleKeys);
    }, [isStealth, enterStealth, exitStealth]);

    // Handle "Unlock" code (e.g. typing 1337 on calculator)
    useEffect(() => {
        if (display === '1337') {
            setTimeout(() => {
                setDisplay('0');
                exitStealth();
            }, 500);
        }
    }, [display, exitStealth]);

    const handlePress = (val: string) => {
        if (val === 'C') setDisplay('0');
        else if (val === '=') {
            try {
                // Determine if it's safe to eval
                setDisplay(eval(display).toString());
            } catch {
                setDisplay('Error');
            }
        } else {
            setDisplay(prev => prev === '0' ? val : prev + val);
        }
    };

    return (
        <AnimatePresence>
            {isStealth && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0 }}
                    className="fixed inset-0 bg-white z-[9999] flex flex-col font-sans text-gray-900"
                >
                    {/* Fake iOS Calculator Header */}
                    <div className="h-12 bg-black flex items-center justify-between px-4">
                        <div className="text-white text-sm font-medium">9:41</div>
                        <div className="flex gap-1">
                            <div className="w-4 h-4 bg-white rounded-full opacity-20" />
                            <div className="w-4 h-4 bg-white rounded-full opacity-20" />
                        </div>
                    </div>

                    {/* Display */}
                    <div className="flex-1 bg-black flex items-end justify-end p-6 pb-2">
                        <div className="text-white text-7xl font-light">{display}</div>
                    </div>

                    {/* Keypad */}
                    <div className="bg-black grid grid-cols-4 gap-px pb-8">
                        {['C', '±', '%', '÷', '7', '8', '9', '×', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='].map((btn, i) => (
                            <button
                                key={btn}
                                onClick={() => handlePress(btn === '×' ? '*' : btn === '÷' ? '/' : btn)}
                                className={`
                                    h-20 flex items-center justify-center text-3xl font-medium rounded-full m-2 transition-opacity active:opacity-70
                                    ${btn === '0' ? 'col-span-2 items-center justify-start pl-8' : ''}
                                    ${['÷', '×', '-', '+', '='].includes(btn)
                                        ? 'bg-orange-500 text-white'
                                        : ['C', '±', '%'].includes(btn)
                                            ? 'bg-gray-300 text-black'
                                            : 'bg-gray-800 text-white'}
                                `}
                            >
                                {btn}
                            </button>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
