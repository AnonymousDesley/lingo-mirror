/**
 * Lingo.dev SDK Mock
 * 
 * Simulates Lingo.dev API behavior for demo purposes.
 * - Reverses text to simulate translation
 * - Appends Arabic characters to demonstrate length expansion
 */

// Arabic text samples for realistic simulation
const ARABIC_SUFFIXES = [
    ' العربية',
    ' المحتوى',
    ' النص',
    ' الترجمة',
    ' اللغة',
];

const ARABIC_WORDS = [
    'مرحبا',
    'شكرا',
    'نعم',
    'تسجيل',
    'الدخول',
    'القائمة',
    'الرئيسية',
    'اتصل',
    'بنا',
    'معلومات',
];

/**
 * Simulates a Lingo.dev translation API call
 * 
 * @param text - The text to "translate"
 * @param mode - 'reverse' to reverse text, 'arabic' to add Arabic characters
 * @returns Promise resolving to the "translated" text
 */
export async function fetchLingoTranslation(
    text: string,
    mode: 'reverse' | 'arabic' | 'expand' = 'expand'
): Promise<string> {
    // Simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 100 + Math.random() * 200));

    switch (mode) {
        case 'reverse':
            return text.split('').reverse().join('');

        case 'arabic':
            const suffix = ARABIC_SUFFIXES[Math.floor(Math.random() * ARABIC_SUFFIXES.length)];
            return text + suffix;

        case 'expand':
        default:
            // Simulate text expansion (common in translations)
            // Add random Arabic word and expand length by 30-50%
            const arabicWord = ARABIC_WORDS[Math.floor(Math.random() * ARABIC_WORDS.length)];
            const expansion = Math.random() > 0.5 ? ` ${arabicWord}` : '';
            return text + expansion + ' ' + text.split(' ').slice(0, 2).join(' ');
    }
}

/**
 * Transforms content for RTL preview demonstration
 * Replaces English text with Arabic-looking placeholder text
 */
export function transformForRTL(content: string): string {
    // Replace common English words with Arabic equivalents for demo
    const replacements: Record<string, string> = {
        'Home': 'الرئيسية',
        'About': 'حول',
        'Contact': 'اتصل بنا',
        'Login': 'تسجيل الدخول',
        'Sign Up': 'إنشاء حساب',
        'Menu': 'القائمة',
        'Search': 'بحث',
        'Settings': 'الإعدادات',
        'Profile': 'الملف الشخصي',
        'Dashboard': 'لوحة التحكم',
        'Submit': 'إرسال',
        'Cancel': 'إلغاء',
        'Save': 'حفظ',
        'Delete': 'حذف',
        'Edit': 'تعديل',
        'View': 'عرض',
        'Next': 'التالي',
        'Previous': 'السابق',
        'Click here': 'انقر هنا',
        'Learn more': 'اعرف المزيد',
    };

    let transformed = content;
    Object.entries(replacements).forEach(([english, arabic]) => {
        const regex = new RegExp(`\\b${english}\\b`, 'gi');
        transformed = transformed.replace(regex, arabic);
    });

    return transformed;
}

/**
 * Simulates fetching locale configuration from Lingo.dev
 */
export async function fetchLocaleConfig(): Promise<{
    sourceLocale: string;
    targetLocales: string[];
    rtlLocales: string[];
}> {
    await new Promise((resolve) => setTimeout(resolve, 50));

    return {
        sourceLocale: 'en',
        targetLocales: ['ar', 'he', 'fa', 'ur', 'fr', 'es', 'de', 'ja', 'zh'],
        rtlLocales: ['ar', 'he', 'fa', 'ur'],
    };
}
