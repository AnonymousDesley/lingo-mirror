/**
 * LingoMirror Scanner - Detects physical Tailwind classes that break RTL layouts
 * 
 * Maps physical CSS properties to their logical equivalents:
 * - ml- → ms- (margin-left → margin-inline-start)
 * - mr- → me- (margin-right → margin-inline-end)
 * - pl- → ps- (padding-left → padding-inline-start)
 * - pr- → pe- (padding-right → padding-inline-end)
 * - text-left → text-start
 * - text-right → text-end
 * - rounded-l- → rounded-s-
 * - rounded-r- → rounded-e-
 */

export interface ScanResult {
    line: number;
    original: string;
    suggestion: string;
    type: 'error' | 'warning';
}

// Physical to logical class mappings
const CLASS_MAPPINGS: Array<{
    pattern: RegExp;
    replacement: (match: string) => string;
    severity: 'error' | 'warning';
}> = [
        // Margin mappings
        {
            pattern: /\bml-(\d+|auto|px|0\.5|1\.5|2\.5|3\.5|\[\w+\])/g,
            replacement: (match) => match.replace('ml-', 'ms-'),
            severity: 'error',
        },
        {
            pattern: /\bmr-(\d+|auto|px|0\.5|1\.5|2\.5|3\.5|\[\w+\])/g,
            replacement: (match) => match.replace('mr-', 'me-'),
            severity: 'error',
        },
        // Padding mappings
        {
            pattern: /\bpl-(\d+|auto|px|0\.5|1\.5|2\.5|3\.5|\[\w+\])/g,
            replacement: (match) => match.replace('pl-', 'ps-'),
            severity: 'error',
        },
        {
            pattern: /\bpr-(\d+|auto|px|0\.5|1\.5|2\.5|3\.5|\[\w+\])/g,
            replacement: (match) => match.replace('pr-', 'pe-'),
            severity: 'error',
        },
        // Text alignment mappings
        {
            pattern: /\btext-left\b/g,
            replacement: () => 'text-start',
            severity: 'warning',
        },
        {
            pattern: /\btext-right\b/g,
            replacement: () => 'text-end',
            severity: 'warning',
        },
        // Border radius mappings
        {
            pattern: /\brounded-l(-\w+)?\b/g,
            replacement: (match) => match.replace('rounded-l', 'rounded-s'),
            severity: 'warning',
        },
        {
            pattern: /\brounded-r(-\w+)?\b/g,
            replacement: (match) => match.replace('rounded-r', 'rounded-e'),
            severity: 'warning',
        },
        // Left/Right positioning (less common but important)
        {
            pattern: /\bleft-(\d+|auto|px|0\.5|1\.5|2\.5|3\.5|full|1\/2|1\/3|2\/3|1\/4|3\/4|\[\w+\])/g,
            replacement: (match) => match.replace('left-', 'start-'),
            severity: 'warning',
        },
        {
            pattern: /\bright-(\d+|auto|px|0\.5|1\.5|2\.5|3\.5|full|1\/2|1\/3|2\/3|1\/4|3\/4|\[\w+\])/g,
            replacement: (match) => match.replace('right-', 'end-'),
            severity: 'warning',
        },
        // Border width mappings
        {
            pattern: /\bborder-l(-\d+)?\b/g,
            replacement: (match) => match.replace('border-l', 'border-s'),
            severity: 'warning',
        },
        {
            pattern: /\bborder-r(-\d+)?\b/g,
            replacement: (match) => match.replace('border-r', 'border-e'),
            severity: 'warning',
        },
        // Scroll margin/padding
        {
            pattern: /\bscroll-ml-(\d+|\[\w+\])/g,
            replacement: (match) => match.replace('scroll-ml-', 'scroll-ms-'),
            severity: 'warning',
        },
        {
            pattern: /\bscroll-mr-(\d+|\[\w+\])/g,
            replacement: (match) => match.replace('scroll-mr-', 'scroll-me-'),
            severity: 'warning',
        },
        {
            pattern: /\bscroll-pl-(\d+|\[\w+\])/g,
            replacement: (match) => match.replace('scroll-pl-', 'scroll-ps-'),
            severity: 'warning',
        },
        {
            pattern: /\bscroll-pr-(\d+|\[\w+\])/g,
            replacement: (match) => match.replace('scroll-pr-', 'scroll-pe-'),
            severity: 'warning',
        },
    ];

/**
 * Scans code for physical Tailwind classes and returns audit results
 */
export function scanCode(code: string): ScanResult[] {
    const results: ScanResult[] = [];
    const lines = code.split('\n');

    lines.forEach((line, index) => {
        const lineNumber = index + 1;

        CLASS_MAPPINGS.forEach(({ pattern, replacement, severity }) => {
            // Reset regex lastIndex for global patterns
            pattern.lastIndex = 0;

            let match;
            while ((match = pattern.exec(line)) !== null) {
                const original = match[0];
                const suggestion = replacement(original);

                // Avoid duplicates
                const isDuplicate = results.some(
                    (r) => r.line === lineNumber && r.original === original
                );

                if (!isDuplicate) {
                    results.push({
                        line: lineNumber,
                        original,
                        suggestion,
                        type: severity,
                    });
                }
            }
        });
    });

    return results.sort((a, b) => a.line - b.line);
}

/**
 * Applies a single fix to the code
 */
export function applyFix(code: string, result: ScanResult): string {
    const lines = code.split('\n');
    const lineIndex = result.line - 1;

    if (lineIndex >= 0 && lineIndex < lines.length) {
        lines[lineIndex] = lines[lineIndex].replace(result.original, result.suggestion);
    }

    return lines.join('\n');
}

/**
 * Applies all fixes to the code
 */
export function applyAllFixes(code: string): string {
    let fixedCode = code;
    const results = scanCode(code);

    // Apply fixes in reverse order to maintain line positions
    const sortedResults = [...results].sort((a, b) => b.line - a.line);

    for (const result of sortedResults) {
        fixedCode = applyFix(fixedCode, result);
    }

    return fixedCode;
}

/**
 * Gets statistics about the scan results
 */
export function getScanStats(results: ScanResult[]): {
    total: number;
    errors: number;
    warnings: number;
} {
    return {
        total: results.length,
        errors: results.filter((r) => r.type === 'error').length,
        warnings: results.filter((r) => r.type === 'warning').length,
    };
}
