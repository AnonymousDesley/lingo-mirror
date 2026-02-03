'use client';

import { useRef, useEffect, useState, useCallback } from 'react';

interface CodeEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    highlightLines?: number[];
}

export default function CodeEditor({
    value,
    onChange,
    placeholder = 'Paste your React/Tailwind code here...',
    highlightLines = [],
}: CodeEditorProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const lineNumbersRef = useRef<HTMLDivElement>(null);
    const [lineCount, setLineCount] = useState(1);

    // Sync line count with content
    useEffect(() => {
        const lines = value.split('\n').length;
        setLineCount(Math.max(lines, 20)); // Minimum 20 lines for visual consistency
    }, [value]);

    // Sync scroll between textarea and line numbers
    const handleScroll = useCallback(() => {
        if (textareaRef.current && lineNumbersRef.current) {
            lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
        }
    }, []);

    // Handle tab key for indentation
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const textarea = e.currentTarget;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;

            const newValue = value.substring(0, start) + '  ' + value.substring(end);
            onChange(newValue);

            // Restore cursor position
            requestAnimationFrame(() => {
                textarea.selectionStart = textarea.selectionEnd = start + 2;
            });
        }
    };

    return (
        <div className="glass-panel h-full flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-xs text-white/40 font-medium uppercase tracking-wider">
                        Code Editor
                    </span>
                </div>
                <div className="text-xs text-white/30">
                    {value.split('\n').length} lines
                </div>
            </div>

            {/* Editor Area */}
            <div className="flex-1 flex overflow-hidden">
                {/* Line Numbers */}
                <div
                    ref={lineNumbersRef}
                    className="line-numbers flex-shrink-0 py-4 px-2 overflow-hidden select-none"
                    style={{ minWidth: '48px' }}
                >
                    {Array.from({ length: lineCount }, (_, i) => (
                        <div
                            key={i + 1}
                            className={`${highlightLines.includes(i + 1)
                                    ? 'text-warning-amber font-medium'
                                    : ''
                                }`}
                        >
                            {i + 1}
                        </div>
                    ))}
                </div>

                {/* Textarea */}
                <div className="flex-1 relative">
                    <textarea
                        ref={textareaRef}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        onScroll={handleScroll}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        className="code-editor absolute inset-0 w-full h-full p-4 overflow-auto"
                        spellCheck={false}
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                    />
                </div>
            </div>
        </div>
    );
}
