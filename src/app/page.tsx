'use client';

import { useState, useCallback, useEffect } from 'react';
import { CodeEditor, VisualPreview, AuditResults } from '@/components/dashboard';
import { scanCode, applyFix, applyAllFixes, ScanResult } from '@/lib/scanner';

// Mock data: A "broken" Tailwind component with physical properties
const MOCK_CODE = `{/* Navbar with RTL issues */}
<nav className="flex items-center justify-between px-6 py-4 bg-gray-900">
  <div className="text-xl font-bold text-white">
    LingoMirror
  </div>
  
  {/* This ml-auto breaks in RTL! */}
  <div className="ml-auto flex items-center gap-4">
    <a href="#" className="text-gray-300 hover:text-white">Home</a>
    <a href="#" className="text-gray-300 hover:text-white">About</a>
    <a href="#" className="text-gray-300 hover:text-white">Contact</a>
  </div>
  
  {/* Button with physical padding */}
  <button className="ml-6 pl-4 pr-4 py-2 bg-indigo-600 text-white rounded-l-lg hover:bg-indigo-700">
    Login
  </button>
</nav>

{/* Card with text alignment issues */}
<div className="p-6 bg-gray-800 rounded-lg mt-4">
  <h2 className="text-left text-2xl font-bold text-white mb-4">
    Welcome to LingoMirror
  </h2>
  <p className="text-left text-gray-400 pl-4 border-l-2 border-indigo-500">
    Detect physical CSS properties that break RTL layouts.
    Toggle Mirror Mode to see the issues in action.
  </p>
</div>`;

export default function Dashboard() {
    const [code, setCode] = useState(MOCK_CODE);
    const [isMirrored, setIsMirrored] = useState(false);
    const [results, setResults] = useState<ScanResult[]>([]);
    const [showAudit, setShowAudit] = useState(true);

    // Scan code whenever it changes
    useEffect(() => {
        const scanResults = scanCode(code);
        setResults(scanResults);
    }, [code]);

    // Get lines with issues for highlighting
    const issueLines = results.map((r) => r.line);

    // Handle single fix
    const handleFix = useCallback((result: ScanResult) => {
        setCode((prev) => applyFix(prev, result));
    }, []);

    // Handle fix all
    const handleFixAll = useCallback(() => {
        setCode((prev) => applyAllFixes(prev));
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#050505] via-[#0A0A0A] to-[#111111]">
            {/* Header */}
            <header className="border-b border-white/10 backdrop-blur-xl bg-black/20 sticky top-0 z-50">
                <div className="max-w-[1800px] mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center shadow-lg shadow-[#6366F1]/25">
                                    <svg
                                        className="w-6 h-6 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-white tracking-tight">
                                    LingoMirror
                                </h1>
                                <p className="text-xs text-white/40">RTL Layout Auditor</p>
                            </div>
                        </div>

                        {/* Center: Mirror Mode Toggle */}
                        <div className="flex items-center gap-4">
                            <span className={`text-sm transition-colors ${!isMirrored ? 'text-white' : 'text-white/40'}`}>
                                LTR
                            </span>
                            <button
                                onClick={() => setIsMirrored(!isMirrored)}
                                className={`toggle-switch ${isMirrored ? 'active' : ''}`}
                                aria-label="Toggle Mirror Mode"
                            >
                                <div className="toggle-knob" />
                            </button>
                            <span className={`text-sm transition-colors ${isMirrored ? 'text-white' : 'text-white/40'}`}>
                                RTL
                            </span>
                            <div className="ml-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                                <span className="text-xs text-white/60">Mirror Mode</span>
                            </div>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 mr-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-[10px] text-green-400 font-bold uppercase tracking-widest">
                                    Lingo API Connected
                                </span>
                            </div>
                            <button
                                onClick={() => setShowAudit(!showAudit)}
                                className={`
                  px-4 py-2 text-sm font-medium rounded-lg transition-all
                  ${showAudit
                                        ? 'bg-[#6366F1]/20 text-[#6366F1] border border-[#6366F1]/30'
                                        : 'bg-white/5 text-white/60 border border-white/10 hover:border-white/20'
                                    }
                `}
                            >
                                {results.length > 0 && (
                                    <span className="inline-flex items-center justify-center w-5 h-5 mr-2 text-xs rounded-full bg-[#F59E0B] text-black font-bold">
                                        {results.length}
                                    </span>
                                )}
                                Audit Panel
                            </button>
                            <a
                                href="https://lingo.dev"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 text-sm font-medium text-white/60 bg-white/5 border border-white/10 rounded-lg hover:border-white/20 hover:text-white/80 transition-all"
                            >
                                Powered by Lingo.dev
                            </a>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-[1800px] mx-auto p-6">
                <div className="flex gap-6 h-[calc(100vh-140px)]">
                    {/* Left Panel: Code Editor */}
                    <div className={`flex-1 min-w-0 transition-all duration-300 ${showAudit ? '' : 'flex-[2]'}`}>
                        <CodeEditor
                            value={code}
                            onChange={setCode}
                            highlightLines={issueLines}
                            placeholder="Paste your React/Tailwind code here to scan for RTL issues..."
                        />
                    </div>

                    {/* Right Panel: Preview */}
                    <div className={`flex-1 min-w-0 transition-all duration-300 ${showAudit ? '' : 'flex-[2]'}`}>
                        <VisualPreview
                            code={code}
                            isMirrored={isMirrored}
                        />
                    </div>

                    {/* Audit Panel (Collapsible) */}
                    {showAudit && (
                        <div className="w-[380px] flex-shrink-0 transition-all duration-300">
                            <AuditResults
                                results={results}
                                onFix={handleFix}
                                onFixAll={handleFixAll}
                            />
                        </div>
                    )}
                </div>
            </main>

            {/* Footer Accent Line */}
            <div className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#6366F1] to-transparent opacity-40" />
        </div>
    );
}
