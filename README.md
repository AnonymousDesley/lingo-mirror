🪞 LingoMirror
Because translating the text is only half the battle. fr.

Let’s be real: I spent days making my UI look fire in English. Then I integrated Lingo.dev (which is a total W for translations, btw), switched the language to Arabic, and... the layout was absolutely cooked.

My icons were on the wrong side, my margin-left was still "lefting," and the whole thing felt like a jump scare.

LingoMirror is the tool I wish I had. It bridges the gap between Lingo.dev’s insane AI translations and the actual visual reality of Right-to-Left (RTL) layouts.

🧐 The Struggle (The "Why")
Lingo.dev handles the words. But it doesn't refactor your CSS. If you’re still using ml-4 instead of ms-4 (logical properties), your Arabic and Hebrew users are having a bad time. I built this to stop the "guess and check" cycle of internationalization.

✨ Features
The "Flip" Toggle: Instantly mirror your entire UI to see how it feels in RTL mode.

The Vibe Check (CSS Scanner): We scan your code for "Physical" properties (like padding-left or text-right) that are going to break your layout.

Lingo.dev Deep Sync: It pulls your actual live translations from Lingo.dev so you’re testing with real data, not "Lorem Ipsum."

Rust-Powered Speed: I used a Rust-based engine (WASM) for the scanner because we don't do slow around here. 🏎️

🛠️ Tech Stack
Next.js 15 (App Router, obviously)

Tailwind CSS (for the vibes)

Lingo.dev SDK (the brains)

Rust / WASM (the muscle)

Lucide React (the eye candy)

🚀 Getting Started
Clone the vibes: git clone https://github.com/your-username/lingo-mirror

Install the sauce: npm install

Add your Lingo key: Pop your API key in a .env file (don't leak it, pls).

Run it: npm run dev

💭 Final Thoughts
Internationalization shouldn't be a headache. If we're using AI to translate, we should be using AI to make sure it looks good, too.

Built for the Lingo.dev Hackathon 2026. If this helped you, give the repo a ⭐ and let's stop shipping broken layouts.
