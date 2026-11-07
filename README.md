# Typing Lab

Typing Lab is a small, browser-based typing practice app built with React and Vite. Choose a passage, type it as accurately and quickly as you can, and review your speed and accuracy when you finish.

## Features

- Four short English practice passages, with a passage selected at random for each new test.
- Live passage highlighting: correctly typed characters and mistakes are shown in different colors, and the next character is marked with a cursor.
- A timer and live words-per-minute (WPM) and accuracy readings.
- An on-screen keyboard with letter, space, and backspace keys, in addition to physical keyboard input.
- Dark and light themes.
- A completion screen showing WPM, accuracy, elapsed time, correct characters, and mistakes.
- A responsive layout for different screen sizes.

## How to use

1. Start the app using the instructions below and open it in your browser.
2. Click the passage area if needed, then type the displayed passage using your physical keyboard or the on-screen keyboard.
3. The timer starts when you enter the first character. Your progress and statistics update while you type.
4. Correct characters are highlighted in green; incorrect characters are highlighted in red. Use Backspace to remove the last typed character and correct a mistake.
5. The test ends when the number of characters you have entered matches the passage length. The completion screen displays your results.
6. Select **New test** or **Try another passage** to reset the test and load a passage. Use the theme control in the header to switch between dark and light mode.

## Scoring

- **WPM:** The app calculates typing speed as `(characters in the current input / 5) / elapsed minutes`, rounded to the nearest whole number. This uses the common convention of five characters per word. The count includes incorrect characters.
- **Accuracy:** The percentage of entered characters that match the passage at the same position, rounded to the nearest whole number.
- **Correct characters:** The number of entered characters that match the passage.
- **Mistakes:** The number of entered characters that do not match the passage.
- **Time:** The number of elapsed seconds when the test is completed.

Because a test ends after the passage-length number of characters has been entered, incorrect characters count toward completion. You can use Backspace before finishing to revise your input.

## Requirements

- Node.js `^20.19.0` or `>=22.12.0`, as required by the installed Vite version.
- npm, which is included with Node.js.

## Getting started

Install the dependencies from the lockfile:

```bash
npm ci
```

Start the local development server:

```bash
npm run dev
```

Open the local URL printed in the terminal (Vite defaults to `http://localhost:5173`).

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server with hot module replacement. |
| `npm run build` | Create an optimized production build in `dist/`. |
| `npm run preview` | Serve the production build locally for a final check. Run `npm run build` first. |
| `npm run lint` | Run ESLint across the project. |

## Production build

Build the app and optionally preview the generated files locally:

```bash
npm run build
npm run preview
```

The production-ready static files are written to `dist/`. Deploy that directory to a static hosting provider that serves the generated `index.html` and assets.

## Project structure

```text
.
├── public/                 # Static public assets, including icons
├── src/
│   ├── assets/             # Images and bundled assets
│   ├── App.jsx             # Typing test UI, state, and scoring
│   ├── App.css             # Typing test and results screen styles
│   ├── index.css           # Global styles and theme defaults
│   └── main.jsx            # React application entry point
├── index.html              # HTML document served by Vite
├── package.json            # Dependencies and npm scripts
└── vite.config.js           # Vite configuration
```

## Implementation notes

- The application is a client-side React app; the current version does not use a backend or save test results between page loads.
- Practice passages and the on-screen keyboard layout are defined in `src/App.jsx`.
- The project uses JavaScript and JSX, React, Vite, and ESLint.
