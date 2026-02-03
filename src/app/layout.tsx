import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "LingoMirror | RTL Layout Auditor",
    description: "Detect physical CSS properties and preview RTL layout breaks in your Tailwind code",
    keywords: ["RTL", "Tailwind", "CSS", "i18n", "internationalization", "Lingo.dev"],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    );
}
