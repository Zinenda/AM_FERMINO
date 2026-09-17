# AM Fermino 2026 redesign

## Audit

- **Stack:** Jekyll 4.2.2, Liquid templates, Sass, Materialize CSS, jQuery, Slick Carousel, AOS and Lightbox.
- **Build:** Netlify runs `bundle exec jekyll build`; the repository uses `Gemfile.lock` and Git LFS for large media.
- **Architecture:** `index.html` and `index-en.html` are language entry points. Shared layout, navigation, footer and contact form live in `_includes`; services, portfolio, about content and publications live in Jekyll collections under `collections/`.
- **Content:** Portuguese and English service/about entries coexist in the same collections. Portfolio images and public consultation documents are retained under `assets/img/uploads/`.
- **Reusable surfaces:** Existing collection loops, contact modal, article layout, Lightbox and language-aware navigation remain the basis for this iteration.

## Phase 1 changes

The redesign establishes a graphite, off-white and AM Fermino green visual system; a responsive global container; a cinematic hero using the existing `header.jpg`; credibility statements; refreshed about, services, portfolio, clients, publications and footer sections; mobile navigation affordances; accessible labels and reduced-motion CSS. No new runtime dependency was added.

## Risks and technical debt

- The local machine currently has system Ruby 2.6 but the lockfile requires Ruby 3.4.5 and Bundler 2.7.2, so the build needs a matching Ruby/Bundler environment.
- Large images and documents are Git LFS pointers locally and should be checked in CI/deployment.
- Materialize, jQuery, Slick, AOS and Lightbox are still global dependencies; a later pass can remove unused legacy JavaScript after route-by-route testing.
- Client logos are referenced through a `site.clientes` collection that is not declared in `_config.yml`; the existing behavior is preserved for validation.

## Content requiring client validation

- Verify the `2007` credibility statement before publication; it should match approved company history.
- Confirm the Portuguese/English naming and translation of services, especially fauna and degraded-area recovery terminology.
- Add verified project locations, dates and categories where available; no new project statistics were invented.
- Confirm current phone numbers, office address, publication metadata and any missing client/partner logos.
- Review older portfolio titles for spelling and accent consistency without changing factual content.

## Phase 2

Run the site in a Ruby 3.4 environment, test all language and collection routes, replace legacy modal/detail presentation where useful, optimize LFS imagery into responsive derivatives, and complete structured-data, Open Graph and Lighthouse verification.
