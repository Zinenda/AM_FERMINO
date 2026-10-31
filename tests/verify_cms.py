"""Integration checks: run with `python3 tests/verify_cms.py`.

Requires the project's Ruby/Bundler dependencies on PATH. All writes use a
temporary copy; no publication or external authentication is performed.
"""
import json
from pathlib import Path
import shutil
import subprocess
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]


class CMSIntegration(unittest.TestCase):
    def test_editor_content_reaches_both_languages(self):
        with tempfile.TemporaryDirectory(prefix="amf-cms-test-") as tmp:
            source = Path(tmp) / "source"
            shutil.copytree(ROOT, source, ignore=shutil.ignore_patterns(
                ".git", "node_modules", "_site", "assets", "output", ".jekyll-cache", ".jekyll-metadata"
            ))
            (source / "assets").symlink_to(ROOT / "assets", target_is_directory=True)
            fixture = source / "collections/_posts/2026-10-01-cms-verification.md"
            fixture.write_text("""---
title: Verificação CMS
title_en: CMS verification
date: 2026-10-01T09:00:00+02:00
image: /assets/img/generated/service-consulting-landscape.png
document: /assets/img/uploads/epda-moz-natures-chiuta-v1_compressed.pdf
body_en: |
  ## English body from CMS
  Full translated article.
---
## Texto português do CMS
Artigo de teste.
""", encoding="utf-8")
            portfolio = source / "_data/portfolio.json"
            data = json.loads(portfolio.read_text())
            data["home"][0]["title_pt"] = "Destaque alterado no CMS"
            data["home"][0]["title_en"] = "Featured project edited in CMS"
            data["projects"].append(dict(data["projects"][0], title_pt="Novo projecto do CMS"))
            portfolio.write_text(json.dumps(data))
            # Renaming changes the sort order; the service must keep its own image.
            old = source / "collections/_servicos/afugentamento-de-fauna.md"
            old.rename(old.with_name("zzz-fauna.md"))
            dest = Path(tmp) / "site"
            result = subprocess.run(
                ["bundle", "exec", "jekyll", "build", "--destination", str(dest)],
                cwd=source, text=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT,
            )
            self.assertEqual(result.returncode, 0, result.stdout)
            self.assertNotIn("YAML Exception", result.stdout)
            pt_url = "/2026/10/01/cms-verification.html"
            en_url = "/publications/cms-verification-en/"
            pt = (dest / pt_url.lstrip("/")).read_text()
            en = (dest / en_url.lstrip("/") / "index.html").read_text()
            self.assertIn('<html lang="pt">', pt)
            self.assertIn("Texto português do CMS", pt)
            self.assertIn(en_url, pt)
            self.assertIn('<html lang="en">', en)
            self.assertIn("English body from CMS", en)
            self.assertNotIn("Texto português do CMS", en)
            self.assertIn(pt_url, en)
            self.assertIn("epda-moz-natures-chiuta-v1_compressed.pdf", en)
            self.assertIn(en_url, (dest / "publications/index.html").read_text())
            self.assertIn(pt_url, (dest / "noticias/index.html").read_text())
            for route in ("publications/moz-natures-gold-project-chiuta/index.html",
                          "publications/warya-heavy-mineral-sands-sangage/index.html"):
                self.assertTrue((dest / route).is_file(), route)
            pt_home = (dest / "index.html").read_text()
            self.assertIn("Destaque alterado no CMS", pt_home)
            self.assertIn("Featured project edited in CMS", (dest / "index-en.html").read_text())
            self.assertIn("portfolio-project-extra", (dest / "portfolio-pt/index.html").read_text())
            self.assertIn("Novo projecto do CMS", (dest / "portfolio-pt/index.html").read_text())
            # Match the fauna panel after sorting, not a particular panel index.
            from html.parser import HTMLParser

            class ServiceImages(HTMLParser):
                def __init__(self):
                    super().__init__()
                    self.in_panel = False
                    self.text = ""
                    self.image = None
                    self.panels = []

                def handle_starttag(self, tag, attrs):
                    attrs = dict(attrs)
                    if tag == "article" and "service-drawer-panel" in attrs.get("class", ""):
                        self.in_panel, self.text, self.image = True, "", None
                    if tag == "img" and self.in_panel:
                        self.image = attrs.get("src")

                def handle_data(self, text):
                    if self.in_panel:
                        self.text += text

                def handle_endtag(self, tag):
                    if tag == "article" and self.in_panel:
                        self.panels.append((self.text, self.image))
                        self.in_panel = False

            parser = ServiceImages()
            parser.feed(pt_home)
            fauna = [image for text, image in parser.panels if "Afugentamento de Fauna" in text]
            self.assertEqual(fauna, ["/assets/img/generated/service-fauna-tete.jpg"])
            # CMS config must remain static: its template tokens belong to Decap.
            self.assertEqual((dest / "admin/config.yml").read_bytes(), (source / "admin/config.yml").read_bytes())


if __name__ == "__main__":
    unittest.main()
