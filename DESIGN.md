# Design — Innotech Impact

<!-- impeccable:design-schema 1 -->

## Visual thesis

Innotech Impact is expressed as a **living signal path**: a software studio and a STEM learning practice connected by the same movement of building, transmitting and amplifying. The interface avoids a generic SaaS-card aesthetic in favour of an editorial, technical world: deep-ink fields, laboratory-paper surfaces and the green signal drawn directly from the logo.

The first viewport makes the two audiences legible at once. A concise promise, two primary pathways (digital solutions and STEM Academy), and a documentary lab image establish the product story before asking for action.

## Foundations

| Layer | Choice | Purpose |
| --- | --- | --- |
| Display | Playfair Display | Editorial, human titles and statements. |
| Body | Manrope | Clear French-first reading at UI and content sizes. |
| Utility | DM Mono | Eyebrows, indices and the signal vocabulary. |
| Base | `--paper` / `--night` | Warm reading surface and immersive studio field. |
| Signal | `--lime` / `--lime-deep` / `--lime-pale` | Logo-derived actions, focus, active labels and conversion zones. |
| Rhythm | `.shell`, `.section`, 1px dividers | A consistent editorial grid rather than floating, unrelated cards. |

Tokens live in `src/index.css`. Components use semantic classes (`button--lime`, `section--dark`, `page-hero`, `form-shell`) rather than per-page colour values.

## Page and component system

- **Shell:** a skip link, information bar, responsive navigation and a four-column footer are shared by every route.
- **Landing page:** promise + lab image, signal strip, the two offer pathways, a short impact method, concrete service examples and a closing CTA.
- **Information pages:** shared dark `page-hero`, an eyebrow/index system and a single dominant content pattern per page: service map, story grid, work grid or academy cards.
- **Conversion pages:** contact and quote forms use a two-part form shell: context and reassurance at left, labelled fields and live status feedback at right.
- **Evidence posture:** the project index describes visible initiatives without inventing results. Formation makes unconfirmed dates, formats and prerequisites explicit.

## Interaction and motion

Buttons lift slightly on hover and compress on press; text-link arrows travel forward. Feature and pathway cards invert into ink on hover, while work imagery has a restrained zoom/reveal. The hero uses staged rise-in, line-draw and orbit accents to suggest a signal moving through the composition.

Animations share `--ease-out` and are intentionally short. The `prefers-reduced-motion` media query effectively removes animation and transitions, including smooth scrolling.

## Responsive behaviour

The desktop hero pairs copy with imagery; on smaller widths it becomes a clear single-column narrative before the signal strip. Grids collapse from three/two columns to one, action groups become full-width when needed, and the navigation exposes an accessible menu trigger. The layout uses intrinsic `min()`/`clamp()` sizing instead of viewport-specific fixed dimensions.

## Accessibility baseline

- French document language, descriptive page titles and a visible-on-focus skip link.
- Semantic headings, lists, forms, labels and navigation landmarks.
- Keyboard-visible focus outline, real buttons for filters/accordions/menu, and `aria-expanded`/`aria-pressed` states where applicable.
- Form feedback is announced through `aria-live`; required fields use native validation.
- Decorative project images have empty `alt`; the hero image has a meaningful French alternative.
- Motion has a reduced-motion fallback and touch controls retain comfortable sizing.

## Assets and content behaviour

`src/assets/innotech-lab-hero.webp` is a compressed, original lab visual used only in the homepage hero. Existing logo and project imagery remain project assets. There are no invented customer logos, testimonials, success metrics, schedules or pricing.

The newsletter, contact and quote forms submit to `/api/newsletter/`, `/api/contact/` and `/api/quotes/`. In development they use the local Django address; in production they use same-origin `/api` unless `VITE_API_URL` supplies a separate API host.

## Extension rules

1. Preserve the two-part offer (software delivery + STEM education) in primary navigation and first-view messaging.
2. Add proof only when it is verified; turn project cards into case studies with context, role, constraints and outcomes.
3. Prefer one strong page-specific structure over stacking new generic cards.
4. Reuse design tokens and semantic component classes; introduce a new accent only when it has a defined semantic role.
5. Keep any new motion purposeful, brief and fully compatible with reduced-motion preferences.
