# Design QA — Portfólio opção 1 e Publicações

- Source visual truth: `output/design-qa/portfolio-page-option-1-source.png`
- Implementation route: `http://127.0.0.1:4001/portfolio-pt/`
- Publications route: `http://127.0.0.1:4001/noticias/`
- English publications route: `http://127.0.0.1:4001/publications/`
- Combined comparison evidence: `output/design-qa/compare-portfolio-page-option-1-live.html`
- Browser-rendered implementation evidence: live Chrome render embedded in the combined comparison file; the CUA capture API did not expose a persistent screenshot file path.
- Source pixels: 1487 × 1058.
- Implementation viewport: 1440 × 1024 CSS px, device pixel ratio 1.
- Responsive viewport: 390 × 844 CSS px, device pixel ratio 1.
- State: Portuguese portfolio with `Todos` active; Portuguese and English publications in their default states.

## Findings

- No actionable P0, P1 or P2 issue remains.
- The portfolio reproduces the selected editorial hierarchy, full-width asymmetric mosaic, green/lime palette, photographic emphasis and compact filtering controls.
- The publications experience extends the same design language without copying the portfolio structure: editorial introduction, featured story, archive, technical-document action and conversion CTA.

## Full-view comparison evidence

The live side-by-side comparison normalizes the reference and implementation to a 1440 × 1024 desktop viewport. The final implementation matches the reference's two-line headline, wide content frame, one tall feature, two wide upper cards, three lower cards, restrained gaps and dark-green closing band. Differences in individual photographs are intentional: the implementation uses the available high-resolution AM Fermino/Tete project depictions while preserving subject, crop and environmental fieldwork art direction.

## Focused region comparison evidence

No separate focused crop was required because the combined desktop comparison renders the navigation, headline, filters, captions and complete mosaic at readable scale. The live publication page was additionally inspected at desktop and 390 px mobile widths.

## Required fidelity surfaces

- Fonts and typography: Montserrat is retained throughout. Display headings use the established 900 weight, compact line height and responsive sizing; labels and metadata use uppercase optical hierarchy without truncation. Long-form article paragraphs are limited to 68 characters per line, use a 1.88 desktop line height and carry consistent paragraph, heading and list spacing.
- Spacing and layout rhythm: the portfolio uses a 16-column asymmetric grid at desktop and reflows to two and one columns at tablet/mobile. The content width expands to 1400 px only on the portfolio page. Publications use a featured split layout and a two-column archive, collapsing cleanly to one column.
- Colors and visual tokens: all new surfaces use existing AM Fermino off-white, near-black, forest green, white and lime accent tokens. Contrast is maintained on image overlays and dark panels.
- Image quality and asset fidelity: all six portfolio images and all publication images loaded successfully with non-zero natural dimensions. Broken Git LFS placeholder images were removed from the publication experience and replaced with 1920 px or wider imagery where available. The generated native-seed asset is 1600 × 1066.
- Copy and content: portfolio controls and project captions are localized PT/EN. Publication headings and summaries are localized; English CTAs explicitly state when the full article opens in Portuguese.

## Interaction and runtime verification

- Portfolio filters: `Todos` 6 items, `Fauna` 1, `Floresta` 2, `Recuperação ambiental` 2.
- Lightbox opened the featured wildlife image with caption and `Image 1 of 6`, then closed with Escape.
- Homepage `Ver todas as publicações` CTA navigated to `/noticias/`.
- Featured publication opened the redesigned article page; technical-document links point to valid PDFs.
- Publications contact CTA opened the contact modal and closed successfully.
- Portuguese and English publication pages each render two archive cards, loaded images and no horizontal overflow.
- Portfolio mobile at 390 × 844 renders six loaded images and no horizontal overflow.
- Browser console: no warnings or errors after the final pass.
- Long-form reading was rechecked at 1440 × 1024 and 390 × 844: the text column measures 690 px on desktop and 358 px on mobile, with no horizontal overflow.
- Jekyll production build completed successfully; the local server remains active on port 4001.

## Comparison history

1. First portfolio pass produced a five-line headline and a compressed mosaic (P2). The title scale and grid columns were corrected.
2. Second pass still constrained the page to the site's 1240 px container (P2). A portfolio-only 1400 px maximum width restored the reference proportions.
3. The expanded desktop grid risked overflow between 900 and 1200 px (P2). The tablet breakpoint was moved to 1200 px and filters were assigned their own row.
4. Final side-by-side live comparison shows the intended two-line headline, aligned filters, complete six-card mosaic and no overflow.
5. Long publication paragraphs were tightened from a 760 px measure to 690 px, with clearer vertical pauses between paragraphs, headings and lists; desktop and mobile verification found no clipping or overflow.

## Implementation checklist

- [x] Build the selected portfolio option as a dedicated PT/EN page.
- [x] Replace low-quality/broken portfolio and publication imagery.
- [x] Implement functional portfolio filters and Lightbox.
- [x] Add a dedicated PT/EN publications page.
- [x] Add a homepage CTA to the publications archive.
- [x] Modernize individual publication reading pages.
- [x] Verify desktop, mobile, localization, images, links, modal and browser console.

## Follow-up polish

- P3 optional: replace generated project depictions with approved, rights-cleared AM Fermino documentary photographs when the final photography library is available.

final result: passed
