# Design QA — Portfólio, opção 1

- Source visual truth: `output/design-qa/portfolio-option-1-source.png`
- Browser-rendered implementation: `output/design-qa/portfolio-option-1-desktop.jpg`
- Responsive evidence: `output/design-qa/portfolio-option-1-mobile-full.jpg`
- Combined comparison: `output/design-qa/portfolio-option-1-comparison.jpg`
- Local route: `http://127.0.0.1:4001/#portfolio`
- Source pixels: 1586 × 992
- Desktop viewport/capture: 1440 × 1024 CSS px; device pixel ratio 1
- Mobile viewport/full-page capture: 390 × 844 CSS px; capture 390 × 7416 px
- State: Portuguese portfolio section, default state, four featured projects

## Findings

- No actionable P0, P1 or P2 issue remains.
- The implemented 12-column mosaic closely reproduces the selected option: one large two-row feature, two compact top cards and one wide bottom card.
- The heading, introduction and project CTA retain the selected editorial balance while using the site's existing AM Fermino header and tokens.

## Full-view comparison evidence

The side-by-side comparison shows consistent information hierarchy, card proportions, photography-led composition, off-white surface, forest-green CTA and lime details. The implementation uses a slightly taller vertical rhythm to preserve the live site's header and readable Portuguese copy. All four cards remain visible within the 1440 × 1024 focused desktop capture and there is no horizontal overflow.

## Focused region comparison evidence

The desktop capture confirms the exact mosaic relationships and caption placement at native browser size. The mobile full-page capture confirms a single-column sequence, a 340 px featured card followed by three 220 px cards, readable labels, visible CTA and no horizontal overflow.

## Required fidelity surfaces

- Fonts and typography: the existing Montserrat family is retained, with a heavy display heading, compact uppercase eyebrow and high-contrast image captions.
- Spacing and layout rhythm: the desktop grid uses twelve equal columns, a 12 px gap, 280/220 px rows and a six-column featured image spanning both rows. Tablet and mobile layouts reflow without changing content order.
- Colors and visual tokens: the implementation uses the existing surface, graphite, brand green, white and lime accent tokens.
- Image quality and asset fidelity: four high-resolution, purpose-generated environmental images are used with deliberate crops and responsive `object-fit: cover`; all loaded successfully at their native dimensions. They are visual depictions for the design and should be replaced later if approved documentary AM Fermino project photography becomes available.
- Copy and content: project labels, headings, alternative text and CTA are localized in Portuguese and English. Numbering 01–04 mirrors the selected direction.

## Interaction and runtime verification

- Clicking the featured project opened Lightbox with the correct image and caption; the overlay then closed successfully.
- The direct `#portfolio` route aligns below the fixed navigation on desktop and mobile.
- Portuguese and English versions both render four localized cards with all images loaded.
- Mobile card order and widths were verified at 390 × 844; no horizontal overflow was detected.
- The desktop fixed header was normalized to 82 px and the mobile header to 72 px.
- Browser console after the final pass: no warnings or errors.
- The compiled local preview remains active on port 4001.

## Comparison history

1. Initial desktop pass exposed a P2 anchor issue: the fixed Materialize header obscured the eyebrow and first line of introductory content.
2. Fix applied: override the higher-specificity `nav.nav-extended` sizing and align hash sections using the actual header height.
3. The first offset implementation created excessive blank space because `scroll-padding` and `scroll-margin` were both applied; the redundant margin was removed.
4. Mobile direct-link testing exposed the same anchor timing problem after responsive reflow. A scoped hash-alignment routine now rechecks scroll position after layout settles.
5. Final desktop and mobile evidence shows the full heading visible, stable card geometry, loaded images and no horizontal overflow.

## Implementation checklist

- [x] Reproduce option 1's asymmetric editorial mosaic.
- [x] Use project-relevant panoramic and field photography.
- [x] Add localized project titles, numbering and accessible alt text.
- [x] Preserve the existing Lightbox interaction.
- [x] Correct fixed-header anchor alignment.
- [x] Verify desktop, mobile, English, image loading and console output.

## Follow-up polish

- P3 optional: replace generated visual depictions with approved, rights-cleared AM Fermino photographs from the documented projects when available.

final result: passed
