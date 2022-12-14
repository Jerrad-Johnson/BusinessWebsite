# Setup

## Initial, basic set up.

In frontend folder:

`npx create-next-app@latest FolderNameHere --ts --use-npm`

`npm i @reduxjs/toolkit react-redux`

`npm i @types/react-redux` // This is probably unneeded, as react-redux should have a dependency on it. 

`npm i -D tailwindcss postcss autoprefixer`

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

`npm i cypress --save-dev`

`npm i --save-dev @stryker-mutator/core`

Add `.env.development` and `.env.production`.

## Environment variables
### env.development

```
SERVERURL= ...
```

### next.config.js
```
  env: {
    SERVERURL: process.env.SERVERURL,
  }
```

# TODO
## Styling
### Nav-related
The 3D overlay should disappear when the page width is too small, rather than the Nav items merging into it.

Clicking anywhere on the overlay should close the nav bar.


## Overlay
Background image should change when the user's device is portrait-oriented. 

# Problems
## Leaflet map
### Re-fetching
Script re-fetches all thumbnails upon scroll. <Image> tag should fix this.