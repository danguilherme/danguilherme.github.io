var  fs = require('fs');
var moment = require('moment');
var pkg = require('./package.json');
var author = {
  name: "Guilherme Ventura",
  email: "guilhermeventura2@gmail.com",
  twitter: "danguilherme",
  github: "danguilherme"
};

moment.locale('pt-br');
var docpadConfig = {
  collections: {
    pages: function() {
      return this
        .getCollection("html")
        .findAllLive({ layout: 'page' }, [{ menuOrder: 1 }])
        .on("add", function(model) {
          return model.setMetaDefaults({
            htmlmin: true
          });
        });
    },
    posts: function() {
      return this
        .getCollection("html")
        .findAllLive({
          relativeOutDirPath: 'blog',
          basename: { $ne: "index" }
        }, [{ date: -1 }])
        .on("add", function(model) {
          return model.setMetaDefaults({
            htmlmin: true,
            layout: "post"
          });
        })
        .findAllLive({
          isDraft: { $ne: true }
        });
    },
    sitemap: function() {
      return this
        .getCollection("html")
        .findAllLive({ isDraft: { $ne: true } }, [])
        .on("add", function(model) {
          return model.setMetaDefaults({
            changefreq: "monthly"
          });
        });
    }
  },

  changefreq: 'weekly',
  priority: 0.5,
  filePath: 'sitemap.xml',

  templateData: {
    site: {
      url: "https://danguilherme.github.io",
      version: pkg.version,
      styles: [
        "/styles/style.css",
        "/styles/highlight.js/zenburn.css",
        "https://fonts.googleapis.com/css?family=Source+Code+Pro:400,700|Marvel:400,700|Raleway:200,400,700|Dosis:300,700"
      ],
      scripts: [
        "/scripts/danguilherme.js",
        "/scripts/triple-click.js",
        "/scripts/main.js",
        "/scripts/google-analytics.js"
      ],
      title: "Guilherme Ventura",
      author: author,
      description: "Blog do Guilherme",
      keywords: "blog, front-end, programação, javascript, css, html, csharp, C#, artigos"
    },

    getPreparedTitle: function() {
      if (this.document.title && (this.document.title != this.site.title)) {
        return this.document.title + " | " + this.site.title;
      } else {
        return this.site.title;
      }
    },
    getPreparedDescription: function() {
      return this.document.description || this.document.tagline || this.site.description;
    },
    getPreparedKeywords: function() {
      return (this.document.keywords || this.document.tags || []).concat(this.site.keywords).join(", ");
    },

    // utilitários
    icon: function(icon) {
      return "<svg class=\"icon icon-" + icon + "\"><use xlink:href=\"/styles/iconset/symbol-defs.svg#icon-" + icon + "\"></use></svg>";
    },
    formatDate: function(date, format) {
      if (format == null) {
        format = "DD/MM/YYYY";
      }
      return moment(date).format(format);
    },
    slugify: function(text) {
      return text.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
    }
  },


  plugins: {
    stylus: {
      stylusOptions: {
        compress: true,
        'include css': true
      }
    },
    rss: {
      "default": {
        collection: 'posts',
        url: '/rss.xml'
      }
    },
    related: {
      parentCollectionName: 'posts'
    },
    cleanurls: {
      trailingSlashes: true,
      "static": true
    },
    ghpages: {
      deployRemote: 'origin',
      deployBranch: 'master'
    },
    sitemap: {
      collectionName: 'sitemap',
      cachetime: 600000
    }
  },

  environments: {
    development: {
      collections: {
        posts: function() {
          return this
            .getCollection("html")
            .findAllLive({
              relativeOutDirPath: 'blog',
              basename: { $ne: "index" }
            }, [{ date: -1 }])
            .on("add", function(model) {
              return model.setMetaDefaults({
                htmlmin: true,
                layout: "post"
              });
            });
        }
      },
      plugins: {
        stylus: {
          stylusOptions: {
            compress: false
          }
        }
      }
    }
  }
};

docpadConfig.templateData.blog = {
  getPostContent: function(post, contentRelativePath) {
    try {
      fs.accessSync("out/blog/" + post.basename + "/" + contentRelativePath);
    } catch (error) {
      return null;
    }
    return "/blog/" + post.basename + "/" + contentRelativePath;
  },
  getPostOriginalImageSrc: function(post) {
    var coverUrl = this.getPostContent(post, "cover.png");
    if (!coverUrl && post.isDraft)
      coverUrl = "http://dummyimage.com/500x300/292929/e3e3e3&text=" + post.title;

    return coverUrl;
  },
  getPostCoverSrc: function(thumbnailPlugin, post) {
    var coverUrl = thumbnailPlugin("blog/" + post.basename + "/cover.png", {
      w: 300,
      h: 100
    }, 'zoomcrop');
    if (!coverUrl && post.isDraft)
      coverUrl = "http://dummyimage.com/300x100/292929/e3e3e3&text=" + post.title;

    return coverUrl;
  },
  getPostImageSrc: function(thumbnailPlugin, post) {
    var coverUrl = thumbnailPlugin("blog/" + post.basename + "/cover.png", {
      w: 500,
      h: 300
    }, 'zoomcrop');

    if (!coverUrl && post.isDraft)
      coverUrl = "http://dummyimage.com/500x300/292929/e3e3e3&text=" + post.title;

    return coverUrl;
  }
};

module.exports = docpadConfig;
