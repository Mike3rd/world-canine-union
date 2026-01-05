Complete Font Setup Guide for Next.js Projects
Project: World Canine Union Website
Tech Stack: Next.js (App Router), Tailwind CSS, next/font/local
Purpose: This document provides a standardized procedure for adding new self-hosted fonts to the project. Following this guide ensures optimal website performance by eliminating render-blocking resources and fixing Lighthouse warnings.

Table of Contents
Overview & Benefits

File Structure Summary

Step-by-Step Implementation Guide

Essential Configuration Files (Current State)

Troubleshooting Common Issues

Final Checklist

1. Overview & Benefits
   This methodology centralizes font management using Next.js's built-in next/font/local module. The key benefits are:

Eliminates Render-Blocking Requests: Critical font CSS is automatically inlined into the HTML.

Fixes "Critical Request Chain" Warnings: Implements display: 'swap' for immediate text visibility.

Optimizes Performance: Uses modern .woff2 font formats for faster loading.

Simplifies Management: All fonts are configured in one place and integrated with Tailwind CSS.

2. File Structure Summary
   After setup, the relevant parts of your project will look like this:

text
world-canine-union/
├── app/
│ ├── layout.tsx # (File to edit) Font configuration & HTML setup
│ ├── fonts/ # (Folder) Store all font files here
│ │ ├── Inter/
│ │ │ └── Inter-VariableFont_opsz,wght.woff2
│ │ ├── IBM-Plex-Sans/
│ │ │ └── IBMPlexSans-VariableFont_wdth,wght.woff2
│ │ ├── Oxanium/
│ │ │ └── Oxanium-VariableFont_wght.woff2
│ │ └── Merriweather/ # (Example) Folder for a new font
│ │ └── Merriweather-Regular.woff2
│ └── globals.css # (File to edit) Contains the @theme block
├── tailwind.config.js # (File to edit) Tailwind fontFamily definitions
└── next.config.js # (File to edit) Contains the inlineCss option 3. Step-by-Step Implementation Guide
Follow these steps in order when adding a new font.

Step 1: Prepare the Font File
Obtain the font file (e.g., .ttf, .otf).

Convert it to .woff2 format (Recommended):

Go to Transfonter.org.

Upload your font file and download the .zip kit.

Extract the .woff2 file from the kit.

Place the file in your project:

Create a new folder inside app/fonts/ for the font (e.g., app/fonts/YourNewFont/).

Place the .woff2 file inside that folder.

Step 2: Configure the Font in app/layout.tsx
Import (only needed once at the top of the file):

typescript
import localFont from 'next/font/local';
Add a new configuration object for your font. Add this with the other const font declarations:

typescript
const yourNewFont = localFont({
src: './fonts/YourNewFont/YourFontFileName.woff2', // Path to your file
variable: '--font-your-new-font', // CSS variable name (use kebab-case)
weight: '100 900', // For variable fonts. Use '400' or '700' for static fonts.
display: 'swap', // CRITICAL for performance
});
Configuration Rules:

variable: Must start with --font- (e.g., --font-roboto, --font-heading-bold).

weight: For variable fonts, specify the range (e.g., '100 900'). For static fonts, use specific weights like '400' (normal) or '700' (bold).

display: Always use 'swap'.

Step 3: Add the Font Variable to the <html> Tag
Inside the RootLayout function, add your new font's variable to the className of the <html> tag.

typescript
export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="en" className={`${inter.variable} ${ibmPlexSans.variable} ${yourNewFont.variable}`}>
<body className="min-h-screen bg-background text-text font-body">
{children}
</body>
</html>
);
}
Step 4: Update the @theme Block in app/globals.css
Map your new CSS variable to a design token in the @theme block.

css
@theme {
/_ ... existing fonts ... _/
--font-your-design-token: var(--font-your-new-font), sans-serif;
}
Note on Fallback: Use sans-serif for sans-serif fonts (like Inter). Use serif for serif fonts (like Merriweather).

Step 5: Update tailwind.config.js
Add your new design token to the fontFamily section to create a Tailwind utility class (e.g., font-yourdesign).

javascript
module.exports = {
theme: {
extend: {
fontFamily: {
// ... your other font families ...
'yourdesign': ['var(--font-your-design-token)'],
},
},
},
};
Step 6: Rebuild and Test
Rebuild the project: Run npm run build in your terminal.

Use the font: In your components, use the new Tailwind class (e.g., className="font-yourdesign").

Verify Performance: Run a new Lighthouse audit to confirm the "Avoid chaining critical requests" warning is resolved.

4. Essential Configuration Files (Current State)
   next.config.js - Enables Critical CSS Inlining
   javascript
   const nextConfig = {
   experimental: {
   inlineCss: true, // This line is essential for performance
   },
   // ... your other config options
   };
   export default nextConfig;
   app/globals.css - Current @theme Block
   css
   @theme {
   /_ ===== SOPHISTICATED WORLD CANINE UNION THEME ===== _/
   /_ Fonts _/
   --font-logo: var(--font-merriweather), serif;
   --font-heading: var(--font-oxanium), sans-serif;
   --font-body: var(--font-ibm-plex-sans), sans-serif;
   --font-body2: var(--font-inter), sans-serif;
   /_ Add new fonts here following the same pattern _/
   }
   tailwind.config.js - Current fontFamily Extension
   javascript
   module.exports = {
   content: [
   "./src/**/*.{js,ts,jsx,tsx,mdx}",
   "./app/**/*.{js,ts,jsx,tsx,mdx}",
   "./components/**/*.{js,ts,jsx,tsx,mdx}",
   ],
   theme: {
   extend: {
   fontFamily: {
   'logo': ['var(--font-merriweather)', 'serif'],
   'heading': ['var(--font-oxanium)', 'sans-serif'],
   'body': ['var(--font-ibm-plex-sans)', 'sans-serif'],
   'body2': ['var(--font-inter)', 'sans-serif'],
   // Add new fonts here
   },
   },
   },
   };
5. Troubleshooting Common Issues
   Issue/Symptom Likely Cause Solution
   "404 - Font not found" in browser console. Incorrect file path in the src property of layout.tsx. Double-check the filename and folder path in app/fonts/. Ensure the src string matches exactly.
   "Object literal may only specify known properties, and 'subsets' does not exist..." Using the subsets option with localFont. Remove the subsets line from your localFont configuration. This option is not needed for self-hosted fonts.
   Font doesn't apply on the website. The CSS variable is not available in the component tree. 1. Ensure the font variable (e.g., ${yourNewFont.variable}) is added to the <html> tag's className in layout.tsx.
6. Ensure you are using the correct Tailwind class (e.g., font-yourdesign).
   Preload warnings in browser console. The resource ... was preloaded but not used within a few seconds... This is normal and expected. It is a side effect of using display: 'swap' with next/font and indicates the font is loading optimally. You can ignore these warnings.
   Lighthouse score doesn't improve. Old .ttf files are still being used, or inlineCss is not working. 1. Ensure you are using .woff2 files.
7. Confirm inlineCss: true is in your next.config.js.
8. Delete any old @font-face rules for the font from globals.css.
9. Final Checklist for New Fonts
   Copy this list and check each item when adding a font:

Preparation: Font file has been converted to .woff2 format.

File Placement: The .woff2 file is placed in app/fonts/YourFontName/.

Configuration (layout.tsx): A localFont configuration object has been added with the correct src, variable, weight, and display: 'swap'.

Variable Injection (layout.tsx): The new font variable (e.g., ${yourNewFont.variable}) is added to the className of the <html> tag.

Theme Mapping (globals.css): A new line has been added to the @theme block (e.g., --font-token: var(--font-your-new-font), sans-serif;).

Tailwind Utility (tailwind.config.js): A new entry has been added to theme.extend.fontFamily (e.g., 'token': ['var(--font-token)']).

Cleanup: Any old @font-face rules for this font have been removed from globals.css.

Build & Test: The project has been rebuilt with npm run build and the font is working correctly on the site.
