# Design QA — Drawer de serviços, opção 1

- Source visual truth: `/Users/izinenda/.codex/generated_images/01a0ba5a-0cd1-7010-bb93-84b345b613bc/exec-40f784fb-15e1-4509-b007-e3a1ba64850e.png`
- Browser-rendered implementation: `output/design-qa/service-drawer-option-1.jpg`
- Combined comparison: `output/design-qa/service-drawer-comparison.jpg`
- Local route: `http://127.0.0.1:4001/#servicos`
- Viewport: 1440 × 757 CSS px; reported device pixel ratio 2
- Source pixels: 1487 × 1058
- Implementation capture pixels: 1440 × 757; the Chrome capture API returned CSS-pixel dimensions
- Density normalization: no resampling was applied. The source and implementation have different viewport heights, so the review compares responsive composition and component behavior rather than claiming pixel-for-pixel identity.
- State: Portuguese service 02, “Consultoria Ambiental”, drawer open over the services grid

## Findings

- No actionable P0, P1, or P2 issue remains.
- The Tete panorama and shorter service summary are intentional product changes requested after the visual option was selected. They replace part of the longer editorial copy in the reference without changing the selected drawer structure.
- The 757 px-high implementation viewport places the lower metadata and CTA inside the scrollable content region. The sticky previous/next footer remains visible; this is expected responsive behavior, not hidden content.

## Full-view comparison evidence

The combined comparison in `output/design-qa/service-drawer-comparison.jpg` shows the same dominant composition in both artifacts: dimmed services grid on the left, light editorial drawer on the right, narrow lime dividing edge, large two-line title, restrained dark-green palette, close control in the upper-right corner, and persistent previous/next navigation at the bottom. The implementation drawer is 648 px wide in a 1440 px viewport (45%), matching the reference's intended proportion.

## Focused region comparison evidence

The source was opened at its original 1487 × 1058 resolution and the implementation was captured separately at 1440 × 757. The drawer itself occupies the dominant half of each frame, so the heading, body measure, panorama crop, metadata rules, close control, and footer labels remain legible in the full-view and combined evidence. A separate crop was not needed.

## Required fidelity surfaces

- Fonts and typography: Montserrat remains the established site family. The implementation preserves the source's heavy display heading, uppercase eyebrow and compact navigation labels; body copy uses a lighter optical weight and readable line height.
- Spacing and layout rhythm: the 45% drawer width, generous horizontal padding, vertical title rhythm, full-width panorama, ruled metadata rows, and fixed footer reproduce the option-1 hierarchy without horizontal overflow.
- Colors and visual tokens: off-white panel, near-black text, forest-green context, lime edge/accent, muted secondary copy and translucent backdrop all remain aligned with the reference and the existing site tokens.
- Image quality and asset fidelity: the service image is a sharp 1600 px panoramic JPEG generated to evoke the landscape of Tete Province. It is intentionally additional to the source mock and uses `object-fit: cover` without visible stretching or haloing.
- Copy and content: service titles and descriptions come from the localized site collections. Previous/next labels, CTA and accessible labels are localized in Portuguese and English.

## Interaction and runtime verification

- Service-card and footer links open the matching drawer panel.
- Previous and next controls cycle services and update the counter and adjacent service names.
- Escape closes the drawer, restores body scrolling and returns focus to the originating trigger.
- Focus trapping and close/backdrop controls are active while the dialog is open.
- “Solicitar proposta” closes the drawer and opens the existing contact form modal.
- Portuguese and English service order and image mapping were verified.
- English service 01 uses `service-consulting-tete.jpg`; service 02 uses `service-fauna-tete.jpg`.
- Portuguese service 02 uses `service-consulting-tete.jpg`.
- No horizontal overflow was detected at the tested desktop viewport.
- Browser console after the final comparison: no warnings or errors.
- Local Jekyll preview remains active on port 4001.

## Comparison history

1. Localization QA found a P2 content mismatch: the first two English service images followed Portuguese collection order, so Environmental Consulting displayed the fauna panorama and Fauna displayed the consulting panorama.
2. Fix applied: added language-specific image ordering for the first two collection items.
3. Post-fix browser evidence: English service 01 displays `/assets/img/generated/service-consulting-tete.jpg`; the next control opens Fauna service 02 with `/assets/img/generated/service-fauna-tete.jpg`, counter `02 / 05`, and correct neighboring labels.
4. Final Portuguese browser evidence: service 02 displays Consultoria Ambiental with the consulting panorama, counter `02 / 05`, loaded image, body scroll lock, 648 px drawer width and no horizontal overflow.

## Implementation checklist

- [x] Preserve option-1 editorial drawer proportions and visual hierarchy.
- [x] Add one panoramic Tete image per service.
- [x] Keep previous/next navigation and progress visible.
- [x] Connect the proposal CTA to the contact flow.
- [x] Verify Portuguese and English mappings.
- [x] Verify keyboard close, focus restoration, scroll lock and console output.

## Follow-up polish

- P3 optional: replace the generated Tete panoramas with approved documentary photography while retaining the current 1600 × 640 crop ratio and focal positions.

final result: passed
