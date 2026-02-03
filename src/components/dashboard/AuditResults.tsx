'use client';

import { ScanResult, getScanStats } from '@/lib/scanner';

interface AuditResultsProps {
    results: ScanResult[];
    onFix: (result: ScanResult) => void;
    onFixAll: () => void;
}

export default function AuditResults({
    results,
    onFix,
    onFixAll,
}: AuditResultsProps) {
    const stats = getScanStats(results);

    return (
        <div className="glass-panel h-full flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                <div className="flex items-center gap-3">
                    <span className="text-xs text-white/40 font-medium uppercase tracking-wider">
                        Audit Results
                    </span>
                    {results.length > 0 && (
                        <div className="flex items-center gap-2">
                            {stats.errors > 0 && (
                                <span className="issue-badge error">
                                    {stats.errors} error{stats.errors > 1 ? 's' : ''}
                                </span>
                            )}
                            {stats.warnings > 0 && (
                                <span className="issue-badge warning">
                                    {stats.warnings} warning{stats.warnings > 1 ? 's' : ''}
                                </span>
                            )}
                        </div>
                    )}
                </div>
                {results.length > 0 && (
                    <button
                        onClick={onFixAll}
                        className="fix-button flex items-center gap-2"
                    >
                        <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                        Fix All
                    </button>
                )}
            </div>

            {/* Results List */}
            <div className="flex-1 overflow-auto">
                {results.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-white/30">
                        <div className="text-center py-8">
                            <svg
                                className="w-12 h-12 mx-auto mb-3 text-green-500/50"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <p className="text-sm font-medium text-green-500/70">All Clear!</p>
                            <p className="text-xs mt-1">No physical CSS properties detected</p>
                        </div>
                    </div>
                ) : (
                    <div className="p-3 space-y-2">
                        {results.map((result, index) => (
                            <div
                                key={`${result.line}-${result.original}-${index}`}
                                className={`
                  group p-3 rounded-lg border transition-all duration-200
                  hover:bg-white/5
                  ${result.type === 'error'
                                        ? 'border-red-500/20 bg-red-500/5'
                                        : 'border-amber-500/20 bg-amber-500/5'
                                    }
                `}
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1 min-w-0">
                                        {/* Line number */}
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-xs text-white/40">
                                                Line {result.line}
                                            </span>
                                            <span
                                                className={`
                          text-[10px] px-1.5 py-0.5 rounded uppercase font-semibold
                          ${result.type === 'error'
                                                        ? 'bg-red-500/20 text-red-400'
                                                        : 'bg-amber-500/20 text-amber-400'
                                                    }
                        `}
                                            >
                                                {result.type}
                                            </span>
                                        </div>

                                        {/* Code diff */}
                                        <div className="font-mono text-sm space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-red-400 select-none">−</span>
                                                <code className="text-red-300 bg-red-500/10 px-1.5 py-0.5 rounded">
                                                    {result.original}
                                                </code>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-green-400 select-none">+</span>
                                                <code className="text-green-300 bg-green-500/10 px-1.5 py-0.5 rounded">
                                                    {result.suggestion}
                                                </code>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Fix button */}
                                    <button
                                        onClick={() => onFix(result)}
                                        className="
                      opacity-0 group-hover:opacity-100 transition-opacity
                      px-3 py-1.5 text-xs font-medium
                      bg-[#6366F1]/20 text-[#6366F1] rounded-md
                      hover:bg-[#6366F1]/30
                      flex items-center gap-1.5
                    "
                                    >
                                        <svg
                                            className="w-3 h-3"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13 10V3L4 14h7v7l9-11h-7z"
                                            />
                                        </svg>
                                        Fix
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer Stats */}
            {results.length > 0 && (
                <div className="px-4 py-2 border-t border-white/10 text-xs text-white/40">
                    <div className="flex items-center justify-between">
                        <span>Total issues: {stats.total}</span>
                        <span className="text-[#6366F1]">
                            Click &quot;Fix All&quot; to convert to logical properties
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
