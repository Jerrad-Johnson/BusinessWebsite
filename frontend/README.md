### Original, basic set up for this new project.

In frontend folder:

`npx create-next-app@latest FolderNameHere --ts --use-npm`

`npm install @reduxjs/toolkit react-redux`

`npm install @types/react-redux` // This is probably uneeded, as react-redux should have a dependency on it. 

`npm install -D tailwindcss postcss autoprefixer`

`npx tailwindcss init -p`


```
// tailwind.config.js becomes:

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

```

```
// added to CSS files
@tailwind base;
@tailwind components;
@tailwind utilities;
```

`npm install cypress --save-dev`