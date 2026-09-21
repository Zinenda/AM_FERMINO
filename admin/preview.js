(function () {
  "use strict";

  if (!window.CMS || !window.createClass || !window.h) return;

  CMS.registerPreviewStyle("/admin/preview.css");

  var EditorialPreview = createClass({
    render: function () {
      var entry = this.props.entry;
      var title = entry.getIn(["data", "title"]) || "Título da publicação";
      var date = entry.getIn(["data", "date"]);
      var image = entry.getIn(["data", "image"]);
      var asset = image ? this.props.getAsset(image) : null;

      return h("article", { className: "preview-page" },
        h("header", { className: "preview-hero" },
          asset && h("img", {
            className: "preview-hero__image",
            src: asset.toString(),
            alt: ""
          }),
          h("div", { className: "preview-hero__overlay" }),
          h("div", { className: "preview-hero__content" },
            h("p", { className: "preview-eyebrow" }, "Publicação · AM Fermino"),
            h("h1", {}, title),
            date && h("time", {}, new Date(date).toLocaleDateString("pt-MZ", {
              day: "2-digit",
              month: "long",
              year: "numeric"
            }))
          )
        ),
        h("main", { className: "preview-body" }, this.props.widgetFor("body"))
      );
    }
  });

  var TextPreview = createClass({
    render: function () {
      var title = this.props.entry.getIn(["data", "title"]) || "Título";
      return h("article", { className: "preview-text" },
        h("p", { className: "preview-eyebrow" }, "AM Fermino · Conteúdo institucional"),
        h("h1", {}, title),
        h("div", { className: "preview-copy" }, this.props.widgetFor("body"))
      );
    }
  });

  var PhotoPreview = createClass({
    render: function () {
      var entry = this.props.entry;
      var title = entry.getIn(["data", "title"]) || "Legenda da fotografia";
      var image = entry.getIn(["data", "image"]);
      var asset = image ? this.props.getAsset(image) : null;
      return h("figure", { className: "preview-photo" },
        asset
          ? h("img", { src: asset.toString(), alt: title })
          : h("div", { className: "preview-photo__empty" }, "Seleccione uma imagem"),
        h("figcaption", {}, title)
      );
    }
  });

  CMS.registerPreviewTemplate("posts", EditorialPreview);
  CMS.registerPreviewTemplate("sobre", TextPreview);
  CMS.registerPreviewTemplate("about", TextPreview);
  CMS.registerPreviewTemplate("servicos", TextPreview);
  CMS.registerPreviewTemplate("services", TextPreview);
  CMS.registerPreviewTemplate("portfolio", PhotoPreview);
})();
