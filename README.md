# Habit-tracker

A React + TypeScript + Vite app that tracks habits. It uses Zustand for state management and Material UI for the UI.

## Quick start

Prerequisites: Node.js and npm.

```sh
# go to the app folder
cd habit-tracker

# install deps
npm install

# dev server
npm run dev

# build
npm run build

# preview production build
npm run preview

# lint
npm run lint
```

## Project overview

- Entry: [habit-tracker/src/main.tsx](habit-tracker/src/main.tsx)  
- Root component: [habit-tracker/src/App.tsx](habit-tracker/src/App.tsx)  
- Vite config: [habit-tracker/vite.config.ts](habit-tracker/vite.config.ts)  
- Package metadata: [habit-tracker/package.json](habit-tracker/package.json)

State and store:
- Zustand store and types: [`Habit`](habit-tracker/src/store/Store.ts) and [`useHabitStore`](habit-tracker/src/store/Store.ts) implemented in [habit-tracker/src/store/Store.ts](habit-tracker/src/store/Store.ts).

Main UI components:
- Add habit form: [habit-tracker/src/components/add-habit-form.tsx](habit-tracker/src/components/add-habit-form.tsx)  
- Habit list: [habit-tracker/src/components/habit-list.tsx](habit-tracker/src/components/habit-list.tsx)  
- Habit stats: [habit-tracker/src/components/habit-stats.tsx](habit-tracker/src/components/habit-stats.tsx)

## Features

- Add / remove habits
- Mark habit completion for a date
- Local persistence (sessionStorage via Zustand persist)
- Basic stats (total, completed today, longest streak)

## Notes

- The mocked data loader is in the store: [habit-tracker/src/store/Store.ts](habit-tracker/src/store/Store.ts).
- Dates are stored as `YYYY-MM-DD` strings and streak calculations are based on consecutive days.

## Contributing

PRs welcome. Keep changes TypeScript-safe and run `npm run lint` before submitting.
