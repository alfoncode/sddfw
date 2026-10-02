# SDDFW v0.1 landing

Status: implemented landing; framework in development.

## Intent

Introduce the first SDDFW product direction in English: connect a requested
behavior to checks and reviewable evidence, using a developer's existing tools.
Let visitors experience an acceptance report before the framework is available.

## Scope

- Responsive, accessible, static landing with a distinct visual identity.
- Working in-page navigation, interactive sample report and FAQs.
- Clear distinction between the working landing demo and planned framework capabilities.
- A small roadmap that can be updated as the project develops.

## Acceptance criteria

- LAND-001: All visitor-facing content is in English.
- LAND-002: The page describes the initial framework scope as in development.
  It has no invented install command, repository, customer logos, testimonials,
  waitlist submission, or live framework results.
- LAND-003: Selecting a sample criterion reveals its sample evidence and result.
  Controls support keyboard navigation and expose their state to assistive technology.
- LAND-004: The correction preview changes the failing sample criterion to passed,
  while the unverified boundary scenario remains unverified.
- LAND-005: Resetting the preview restores the original sample report.
- LAND-006: The example summary can be downloaded as an explicitly labeled Markdown sample.
- LAND-007: Navigation reaches existing page sections; mobile navigation opens,
  closes, and supports Escape. FAQs expose their content through native disclosure controls.
- LAND-008: The page has no horizontal overflow at 360, 390, 768, and 1440 pixels.
- LAND-009: The page respects reduced motion and remains readable with JavaScript disabled.
- LAND-010: Build output is self-contained, with local CSS, JavaScript and SVG assets.
- LAND-011: A keyboard-accessible header button switches the entire page between
  light and dark red palettes. The initial theme follows the system preference
  unless a valid saved choice exists. A chosen theme survives reloading; blocked
  browser storage does not prevent switching themes.
- LAND-012: Project content and file or directory names consistently use SDDFW.

## Verification scope

Check the rendered page, report interaction, download, navigation and representative
desktop/mobile sizes in a real browser. Record the actual checks in README.md.
The sample report is illustrative and does not validate an application or the framework.
