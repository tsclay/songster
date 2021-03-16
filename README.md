# Songster

A lightweight front-end on top of Genius that allows users to look-up their favorite song lyrics without extra hassle.

## Stack

- React with TypeScript
- ESLint using Airbnb, Prettier, TypeScript
- [Cors-Anywhere server](https://github.com/Rob--W/cors-anywhere)
  - Awesome open-source project that handles the CORS headers for fetches to Genius

## What's the point?

- Work with third-party API data and find ways to get required data that API does not provide
  - For legal reasons, Genius cannot provide full song lyrics within API data; however, API data can provide URLs needed to make fetch requests for those pages containing lyrics and other fun things.

- Create a mobile and desktop friendly UI using minimal differences between them

- Implement other React hooks, such as `useRef` and `useReducer`

- Get comfy with TypeScript within React.js
