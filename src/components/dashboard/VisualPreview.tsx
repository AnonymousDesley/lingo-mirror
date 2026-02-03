'use client';

import { useMemo } from 'react';
import { transformForRTL } from '@/lib/lingo-mock';

interface VisualPreviewProps {
    code: string;
    isMirrored: boolean;
}

export default function VisualPreview({ code, isMirrored }: VisualPreviewProps) {
    // Extract renderable content from JSX code
    const previewContent = useMemo(() => {
        // Try to render the JSX as visual HTML
        // For demo purposes, we'll parse basic structure
        let content = code;

        // Transform text for RTL if mirrored
        if (isMirrored) {
            content = transformForRTL(content);
        }

        // Convert JSX className to class for HTML rendering
        content = content.replace(/className=/g, 'class=');

        // Remove React-specific syntax for preview
        content = content.replace(/\{\/\*[\s\S]*?\*\/\}/g, ''); // Remove comments
        content = content.replace(/\{[^}]+\}/g, ''); // Remove JS expressions (simplified)

        return content;
    }, [code, isMirrored]);

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
                        Visual Preview
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    {isMirrored && (
                        <span className="text-xs px-2 py-1 rounded-full bg-[#6366F1]/20 text-[#6366F1] font-medium">
                            RTL Mode
                        </span>
                    )}
                    <span className="text-xs text-white/30">
                        {isMirrored ? 'العربية' : 'English'}
                    </span>
                </div>
            </div>

            {/* Preview Area */}
            <div
                dir={isMirrored ? 'rtl' : 'ltr'}
                className={`
          preview-container flex-1 overflow-auto p-6 relative
          ${isMirrored ? 'mirrored font-arabic' : ''}
          transition-all duration-500 ease-out
        `}
                style={{
                    background: isMirrored
                        ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.05), transparent)'
                        : 'transparent',
                }}
            >
                {/* Render the preview */}
                <div
                    className="preview-content min-h-full"
                    dangerouslySetInnerHTML={{ __html: previewContent }}
                />

                {/* Empty State */}
                {!code.trim() && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white/30">
                            <svg
                                className="w-16 h-16 mx-auto mb-4 opacity-50"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                            </svg>
                            <p className="text-sm">Paste code to see preview</p>
                        </div>
                    </div>
                )}

                {/* Mirror Mode Indicator */}
                {isMirrored && (
                    <div className="absolute top-4 right-4 flex items-center gap-2 text-xs text-[#6366F1]/70">
                        <svg
                            className="w-4 h-4"
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
                        <span>Mirror Active</span>
                    </div>
                )}
            </div>
        </div>
    );
}
