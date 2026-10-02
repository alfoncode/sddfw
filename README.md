# SDDFW

Spec Driven Development Framework. Build with intent. Ship with evidence.

This repository starts with the English landing page for the SDDFW v0.1 direction.
The framework is in development; the acceptance report on the landing is an
interactive, explicitly labeled sample.

## Local development

Requires Node.js 22 or later. There are no package dependencies to install.

```sh
pnpm dev
```

Open http://localhost:4173. Set `PORT` to use a different port.

## Build and preview

```sh
pnpm check
pnpm build
pnpm preview
```

Stop the development server before previewing the build on the same port.
`dist/` contains a self-contained static page ready for a static host.

## Structure

- `index.html`: English content, page sections and baseline sample report.
- `assets/styles.css`: responsive design and reduced-motion support.
- `assets/main.js`: sample criteria, correction preview, Markdown download and mobile navigation.
- `assets/theme.js`: early theme selection, system preference and the persistent light/dark switch.
- `assets/favicon.svg`: local vector brand asset.
- `specs/landing.md`: intent and acceptance criteria for this landing.
- `scripts/`: small local server and static build, using Node.js built-ins.

The page works without remote fonts, CDN assets, analytics or external services.
Core content and the baseline report remain readable without JavaScript.

## Product boundaries

The sample does not run application tests or certify a change. The v0.1 and later
roadmap items describe planned work. There is no waitlist backend, installable
framework package or public repository link wired into the landing yet.

## Verified locally — 2026-10-01

Verification used an isolated headless Chrome browser through `agent-browser`.

- `pnpm check` and `pnpm build` passed. The built page was served and its
  interactive correction preview worked from `dist/`.
- All four sample criteria revealed the matching evidence. Keyboard activation
  was checked. The correction changed the count from 2 to 3, kept the boundary
  unverified, and reset restored the failed criterion.
- The Markdown download completed. Its contents retained all four criteria,
  the unverified boundary, and the explicit illustrative-sample notice.
- In-page anchors resolved to existing sections. The roadmap link and return
  to top worked. The FAQ opened with a click and closed with the keyboard.
- Mobile navigation opened, closed with Escape, restored focus, and closed
  after following a section link.
- At 360, 390, 768 and 1440 pixels, document width matched viewport width.
  Desktop, tablet and mobile screenshots were visually inspected.
- Reduced-motion emulation produced automatic scrolling and zero transition
  duration. With the landing's JavaScript request blocked, content and navigation
  remained visible while interactive sample actions were hidden. This checked
  script-unavailable fallback; browser-wide JavaScript disabling was not used.
- The axe-core scan reported zero automated violations at mobile and desktop
  sizes. It flagged decorative overlaps in the closing section for manual contrast
  review; the text/background pairs were checked manually.
- The final normal page load produced no captured browser console or page errors.

Local screenshots and the downloaded sample are in `.artifacts/` (gitignored).
These checks cover the landing, not the planned framework or a hosted deployment.

## Red light and dark themes

Use the sun/moon button in the header to switch themes. The first visit follows
the system appearance. A manual choice is saved under `sddfw-theme` and applied
before the stylesheet paints on later visits. Switching also works when browser
storage is blocked. Theme colors are centralized in `assets/styles.css`.
The current identity uses vivid red (`#E60000`) with neutral white, gray and
charcoal surfaces.
Both themes share the same red buttons and principles section. Red text is
lighter in dark mode to preserve contrast against charcoal surfaces.
The dark FAQ uses neutral gray surfaces for closed, hovered and expanded states.

Verified in isolated Chrome: system preference changes, mouse and keyboard
switching, persistence after reload, blocked storage reads/writes, the existing
correction demo, and both themes at 360, 390, 768 and 1440 pixels. Both palettes
reported zero automated axe violations; decorative-overlap contrast flags in
the closing section were reviewed manually. Blocking both scripts left the page
content and navigation readable, with unavailable interactive controls hidden.

The branding audit includes hidden/generated files and file/directory names.
Package metadata and saved sample reports use SDDFW, and previous screenshots
were regenerated with the corrected brand. Current theme previews use the red palette.
