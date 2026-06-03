# Decode

A Chrome extension that explains highlighted text on any webpage using Google's Gemini API.

Highlight text → click **Explain** → read a short AI explanation in an on-page panel.

## Features

- Text selection on any site with a floating **Explain** button
- In-page explanation panel with loading state
- Dismiss via click outside or **Escape**
- Gemini-powered explanations (background service worker)
- Built with [WXT](https://wxt.dev) and TypeScript

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- Google Chrome (or another Chromium browser)
- A [Gemini API key](https://aistudio.google.com/apikey) from Google AI Studio

## Setup

1. **Clone and install**

   ```bash
   git clone <your-repo-url>
   cd decode
   npm install
   ```

2. **Configure your API key**

   Create a `.env` file in the project root. WXT only exposes variables prefixed with `WXT_`.

   ```env
   WXT_GEMINI_API_KEY=your_gemini_api_key_here
   ```

   Do not commit `.env` — it is listed in `.gitignore`.

3. **Run in development**

   ```bash
   npm run dev
   ```

4. **Load the extension in Chrome**

   - Open `chrome://extensions`
   - Enable **Developer mode**
   - Click **Load unpacked**
   - Select the `.output/chrome-mv3` folder (created by `npm run dev`)

   After code changes, reload the extension on `chrome://extensions` or use WXT's hot reload.

## Usage

1. Open any webpage.
2. Highlight some text.
3. Click the blue **Explain** button.
4. Wait for the panel to show an explanation (or an error message).
5. Click outside the panel or press **Escape** to close.