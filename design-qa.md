# Design QA — Modal de contacto

- Source visual truth: `/Users/izinenda/.codex/generated_images/01a0ba5a-0cd1-7010-bb93-84b345b613bc/exec-40f784fb-15e1-4509-b007-e3a1ba64850e.png` (direção editorial “opção 1” já selecionada pelo utilizador)
- Baseline diagnostic: screenshot supplied with this request; original 2880 × 1800 px, displayed to the model at 1996 × 1248 px
- Browser-rendered implementation: `output/design-qa/contact-modal-redesign.jpg`
- Responsive evidence: `output/design-qa/contact-modal-mobile.jpg`
- Combined comparison: `output/design-qa/contact-modal-comparison.jpg`
- Local route: `http://127.0.0.1:4001/#servicos`
- Desktop viewport: 1440 × 757 CSS px; device pixel ratio 2
- Mobile viewport: 390 × 844 CSS px
- Source pixels: 1487 × 1058
- Implementation capture pixels: 1440 × 757; Chrome capture returned CSS-pixel dimensions
- Density normalization: no resampling. The comparison evaluates the selected editorial language and responsive modal composition rather than pixel identity across different components.
- State: Portuguese contact modal open over the services section; empty form, default state

## Findings

- No actionable P0, P1 or P2 issue remains.
- The new split layout is an intentional redesign of the wide, low-hierarchy baseline modal: project context and direct contacts occupy the dark panel; the task-focused form occupies the light panel.
- The source is a service drawer rather than a contact form, so the lime accent moves from a vertical separator to the modal's top edge. The palette, typography, backdrop treatment, close control and strong light/dark division remain faithful to the selected direction.

## Full-view comparison evidence

The combined comparison in `output/design-qa/contact-modal-comparison.jpg` shows a consistent design system across the source direction and the modal: darkened page context, off-white work surface, forest-green structural area, lime accent, oversized Montserrat heading, uppercase eyebrow, compact secondary copy and a dark primary CTA. The redesigned modal fits between y=24 and y=733 in the 757 px desktop viewport and does not create horizontal page overflow.

## Focused region comparison evidence

The standalone desktop capture keeps labels, placeholders, focus treatment, privacy note, direct contact links and CTA legible at native size. A separate focus-state browser view confirmed a green border plus lime focus halo on the name field. The mobile capture confirms the one-column reading order, persistent close control and vertically scrollable form at 390 × 844.

## Required fidelity surfaces

- Fonts and typography: the existing Montserrat family is retained. Display text uses the established heavy weight and tight line-height; field labels use compact uppercase styling; body and helper text use lighter weights with readable measures.
- Spacing and layout rhythm: the 1120 px desktop frame uses a balanced two-column split, consistent field gaps, grouped labels and inputs, full-width message field and aligned privacy/CTA row. At 390 px the layout stacks without horizontal overflow.
- Colors and visual tokens: all surfaces use existing AM Fermino tokens: `--color-brand-dark`, `--color-brand`, `--color-accent`, `--color-surface`, `--color-white`, `--color-graphite`, `--color-muted` and `--color-border`.
- Image quality and asset fidelity: the modal requires no raster imagery. Existing Font Awesome icons are used consistently; no placeholder, custom SVG, emoji or CSS illustration replaces a source asset.
- Copy and content: Portuguese and English headings, guidance, field labels, placeholders, privacy note and CTA are localized. Phone and email remain actionable links.

## Interaction and runtime verification

- Header and conversion-band triggers open the contact modal.
- The close button is visible and keyboard `Escape` closes the modal.
- All five fields retain their original Netlify names and are required.
- Focus treatment was verified on the name input.
- Portuguese and English modal content was rendered and checked.
- Desktop dimensions: 1120 × 709 px at x-centered placement, top 24 px, bottom 733 px.
- Mobile dimensions: 374 × 828 px at 390 × 844, top 8 px, bottom 836 px.
- No horizontal overflow at either tested viewport.
- Browser console after final pass: no warnings or errors.
- Form submission was not executed, to avoid creating a real contact request; the existing Netlify form contract remains unchanged.
- Local Jekyll preview remains active on port 4001.

## Comparison history

1. Initial redesign pass exposed a P2 viewport-fit issue: Materialize's default 10% top position pushed the modal below the 757 px desktop viewport and partially clipped the lower contact area.
2. Fix applied: set the desktop modal to `top: 24px` while retaining `max-height: calc(100vh - 48px)` and internal scrolling.
3. Post-fix evidence: the complete desktop frame sits between y=24 and y=733, all controls are visible, the contact links remain readable, and there is no horizontal overflow.
4. Responsive pass confirmed the stacked 390 px layout, visible close control and scrollable form without page overflow.

## Implementation checklist

- [x] Align the modal with the selected option-1 editorial language.
- [x] Improve form hierarchy, contrast and field grouping.
- [x] Preserve Netlify field names and required validation.
- [x] Add direct contact details and response expectations.
- [x] Localize Portuguese and English content.
- [x] Verify desktop, mobile, keyboard close, focus and console output.

## Follow-up polish

- P3 optional: add a dedicated post-submission success state once the desired Netlify success/redirect behaviour is defined.

final result: passed
