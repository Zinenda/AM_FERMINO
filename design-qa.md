# Design QA — About inline principles

- Source visual truth: `/private/tmp/amf-about-option-3.png`
- Implementation evidence: `cua://chrome/tab/831231072` at `http://127.0.0.1:4001/#sobre`
- Viewport: 1487 × 1058 CSS px, device scale 1
- Source pixels: 1487 × 1058
- Implementation pixels: 1487 × 1058
- State: Portuguese About section; Mission default plus Vision and Values interaction states

## Full-view comparison evidence

The source and browser render retain the selected asymmetric editorial composition: copy and oversized `01` on the left; portrait fieldwork image, overlapping detail image, lime accent, and dark-green principle strip on the right. The requested interaction intentionally removes the source's `Saiba Mais` modal trigger and turns the existing Mission/Vision/Values strip into the primary control.

## Focused region comparison evidence

The About region was inspected at matching desktop dimensions. Heading hierarchy, copy measure, image crops, overlap depth, strip contrast, active underline, and transition into the next section remain consistent with the source. Separate captures were not needed because the component and all relevant text were legible in the full-width evidence.

## Findings

- No actionable P0, P1, or P2 issue remains.
- The missing `Saiba Mais` button is an intentional product change, not design drift: its informational modal has been replaced by the visible inline tabs requested by the user.
- P3: the generated reference's handwritten slogan and synthetic uniform logo remain intentionally omitted to avoid unsupported branding.

## Required fidelity surfaces

- Fonts and typography: existing Montserrat family, display weight, uppercase eyebrow, body line height, and tab weight remain consistent with the selected direction.
- Spacing and layout rhythm: desktop grid proportions, image overlap, visual offset, copy measure, and tab-strip alignment match the reference hierarchy without horizontal overflow.
- Colors and visual tokens: existing off-white, forest green, dark green, lime, white, and muted-text tokens are preserved.
- Image quality and asset fidelity: the primary and detail photographs remain sharp, consistently art-directed, and correctly cropped.
- Copy and content: Mission, Vision, and Values come directly from the localized Portuguese and English collections.

## Interaction and runtime verification

- Clicking each tab updates the inline heading and content; no About modal remains in the DOM.
- Arrow Left/Right and Home/End keyboard navigation update focus and selection.
- `aria-selected`, `aria-controls`, focus order, and localized accessible labels update correctly.
- Portuguese and English variants were tested.
- Browser console: no warnings or errors.
- Desktop render has no horizontal overflow; existing responsive stacking rules are preserved for the three compact controls.
- Local Jekyll build and auto-regeneration remain active on port 4001.

## Comparison history

1. First interaction pass exposed duplicated Mission content because the collection's first Portuguese item was already Mission.
2. Fix applied: removed the redundant static content and made a single heading/body panel the tab-controlled surface.
3. Post-fix evidence: one Mission block is visible by default; Vision and Values replace it in place without moving or obscuring the imagery.
4. Accessibility pass found pseudo-element separators contributing to computed tab names; explicit localized `aria-label` values now preserve clean names.

## Follow-up polish

- Optional P3: replace the generated field photography with approved AM Fermino photography using the same aspect ratios and focal positions.

final result: passed
