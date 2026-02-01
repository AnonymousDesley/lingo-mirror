# 🪞 LingoMirror 

**Because translating the text is only half the battle. fr.**

Let’s be real: I spent days making my UI look fire in English. Then I integrated **Lingo.dev** (which is a total W for translations, btw), switched the language to Arabic, and... the layout was absolutely cooked. 

My icons were on the wrong side, my `margin-left` was still "lefting," and the whole thing felt like a jump scare. 

**LingoMirror** is the tool I wish I had. It bridges the gap between **Lingo.dev’s** insane AI translations and the actual visual reality of Right-to-Left (RTL) layouts.

---

## 🧐 The Struggle (The "Why")
Lingo.dev handles the words. But it doesn't refactor your CSS. 
If you’re still using `ml-4` instead of `ms-4` (logical properties), your Arabic and Hebrew users are having a bad time. I built this to stop the "guess and check" cycle of internationalization.



---

## ✨ Features
* **The "Flip" Toggle:** Instantly mirror your entire UI to see how it feels in RTL mode. No more manual browser inspector hacks.
* **The Vibe Check (CSS Scanner):** We scan your code for "Physical" properties (like `padding-left` or `text-right`) that are going to break your layout.
* **Lingo.dev Deep Sync:** It pulls your actual live translations from Lingo.dev so you’re testing with real data, not "Lorem Ipsum."
* **High Performance:** Built with Next.js and optimized for sub-millisecond layout auditing. 🏎️

---

## 🛠️ Tech Stack
* **Next.js 15** (App Router, obviously)
* **Tailwind CSS** (for the vibes)
* **Lingo.dev SDK** (the brains)
* **TypeScript** 

---

## 🚀 Getting Started
1. **Clone the vibes:** ```bash
   git clone [https://github.com/your-username/lingo-mirror](https://github.com/your-username/lingo-mirror)
