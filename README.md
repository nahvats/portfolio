# Portfolio UI Kit

A high-fidelity, click-thru recreation of the personal portfolio site this design system is built for. Open `index.html` to interact with it.

## Files

- `index.html` — entry point, layout CSS, React + Babel bootstrapping
- `data.js` — sample profile, projects, experience, writing (swap for your content)
- `Chrome.jsx` — `Nav`, `Footer`, `SectionHead`, `Tag`
- `Sections.jsx` — `Hero`, `Work`, `About`, `Experience`, `Writing`, `Contact`
- `ProjectDetail.jsx` — case-study screen for an individual project
- `app.jsx` — root component, routing, scroll-spy

## What's interactive

- **Nav links** scroll-jump to sections; the active link auto-updates as you scroll.
- **Brand wordmark** in the nav returns home from a project detail page.
- **Project cards** in the Work section open a full case-study screen with metrics, code, and a back link.
- **Hero CTAs** jump to work / contact.
- **Hero cursor** blinks at 1Hz (the only always-on animation; respects `prefers-reduced-motion`).
- All buttons / links carry the hover and press states defined in the design system.

## Not implemented (intentionally)

- Actual blog post content — `Writing` is a list of titles only. Article reading view would be a follow-up.
- Dark/light toggle — system is dark-only by design.
- Forms — `Contact` is mailto-driven, no form needed for a personal site.

## How to use this in your real site

The components here are intentionally cosmetic. To ship a real site:

1. Replace `data.js` with your real content (profile, projects, experience, posts).
2. Drop real screenshots into `/assets/project-thumbs/` and reference them in `data.js`.
3. Replace the placeholder code snippet in `ProjectDetail.jsx` with real code from each project.
4. Move from inline Babel to a real bundler (Vite is a one-command swap).
