# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Lyncs Countdown Timer

A beautiful, responsive countdown timer app built with React and Tailwind CSS.

## What I Built

A single-page web app that lets you create, manage, and visually track multiple countdown timers for important events — birthdays, deadlines, product launches, holidays, anniversaries, and more.

### Features

- **Create timers** with a name, date/time, optional description, and category
- **Live countdowns** showing days, hours, minutes, and seconds — updating every second
- **Urgency indicators** that visually distinguish events:
  - **Upcoming** — more than 7 days away (terracotta brown badge)
  - **This Week** — within 7 days (gray badge)
  - **Very Soon!** — within 24 hours (pulsing rose badge)
  - **Passed** — event has occurred (dimmed card)
- **Edit and delete** timers with confirmation dialogs
- **Sort** by date, name, or recently added
- **Persistent storage** via `localStorage` — data survives page refreshes
- **Responsive grid** layout (1 → 2 → 3 columns)

## Design Choices

### UI Approach

I went for a linen beige aesthetic and grid background patterns. Each timer card has a mild gradients, a decorative top bar, and hover-reveal action buttons to keep the interface clean.

### Why `localStorage`?

No backend needed for this use case. `localStorage` is instant, works offline, and requires zero setup.

### Why `date-fns`?

Lightweight, tree-shakeable, and excellent for date formatting without the overhead of moment.js.

### Why `lucide-react`?

Consistent, clean icon set that integrates perfectly with React and Tailwind.

## What I'd Improve With More Time

1. **Notifications** — Browser push notifications when a timer hits zero
2. **Timer sharing** — Generate a shareable URL for a specific countdown
3. **Search/filter** — Filter by category or urgency level
4. **Animations** — Flip-clock style digit transitions
5. **Export/import** — JSON backup of all timers

## Challenges

- **Tailwind v4 dynamic classes**: Tailwind v4 uses CSS-first configuration, so dynamically constructed class names (like `bg-violet-500`) need to be in the source or mapped statically. Solved by using a static `COLOR_MAP` object with pre-written class strings.
- **datetime-local styling**: The native input is notoriously hard to style cross-browser. Used `[color-scheme:dark]` to get a dark calendar picker.
- **Design**: No design was provided, so I researched online for inspiration and adjusted it to meet the requirements.

## Time Spent

Approximately **2 days plus**:

- Planning architecture, design idea and component breakdown
- Building components and hooks
- Styling, polish, and responsive layout
- Testing, type-checking, and README

## Getting Started

```bash
npm install
npm dev
```

Open [http://localhost:5173/](http://localhost:5173/) to view the app.
