# Restauro das fotografias das publicações

Ferramenta: image_gen incorporada. Foram seleccionadas as duas variantes de restauro produzidas na etapa anterior e agora aplicadas ao site. Os primeiros ensaios publicados usavam ampliação convencional dos originais.

Os originais extraídos dos PDFs foram preservados em `assets/img/publications/*-original.jpg`. Os novos ficheiros `*-restored.png` são os masters seleccionados, com versões responsivas JPEG e WebP de 320, 640, 960 e 1200 píxeis. Os detalhes finos são reconstruídos por IA a partir de fontes comprimidas, não recuperados de uma fotografia original em alta resolução.

## Prompt: Mpanga

Use case: identity-preserve. Asset type: documentary photograph for an environmental report website. Edit target: the supplied low resolution photograph extracted from the first PDF page. Upscale and gently restore compression artifacts to a high resolution image, approximately 1600 pixels wide, preserving the original near-square aspect ratio and exact framing. Preserve all people, identities, poses, faces, clothing, helmets, survey tools, vegetation, tree and background in their original positions. Only improve resolution and reduce JPEG artifacts. Keep a natural documentary photograph, with no invented objects, no extra people, no changes to expressions, no beautification, no text or borders. Preserve the full photograph without cropping.

## Prompt: Campala

Use case: identity-preserve. Asset type: documentary photograph for an environmental report website. Edit target: the supplied low resolution group photograph extracted from the first PDF page. Upscale and gently restore compression artifacts to a high resolution image approximately 1600 pixels wide, preserving the original near-square aspect ratio and exact framing. Preserve exactly the seven people, their identities, faces, poses, clothing, proportions and original positions; preserve the government building, window, plants, ground and sign with its existing text 'GOVERNO DO DISTRITO DE MACANGA'. Only increase resolution and reduce JPEG artifacts. No new objects or people, no changed expressions, no beautification, no rewritten sign, no added text or borders. Preserve the full photograph without cropping.
