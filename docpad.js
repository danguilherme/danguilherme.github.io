var fs = require('fs');
var moment = require('moment');
var pkg = require('./package.json');
var author = {
  name: "Guilherme Ventura",
  email: "guilhermeventura2@gmail.com",
  facebookId: 100002397085708,
  facebookUrl: 'https://facebook.com/danguilherme',
  twitter: "danguilherme",
  twitterUrl: "https://twitter.com/danguilherme",
  github: "danguilherme",
  githubUrl: "https://github.com/danguilherme",
  linkedinUrl: "https://linkedin.com/in/danguilherme",
  googlePlus: "GuilhermeVenturaDanguilherme",
  googlePlusUrl: "https://plus.google.com/+GuilhermeVenturaDanguilherme"
};

const translationsMap = {};

var docpadConfig = {
  collections: {
    pages: function () {
      return this
        .getCollection("html")
        .findAllLive({ layout: 'page' }, [{ menuOrder: 1 }])
        .on("add", function (model) {
          return model.setMetaDefaults({
            htmlmin: true
          });
        });
    },
    posts: function () {
      return this
        .getCollection("html")
        .findAllLive({
          relativeOutDirPath: { $in: ['en\\blog', 'blog'] },
          basename: { $ne: "index" }
        }, [{ date: -1 }])
        .on("add", function (model) {
          return model.setMetaDefaults({
            htmlmin: true,
            layout: "blog-post"
          });
        });
    },
    'posts_pt-br': function () {
      return this
        .getCollection("html")
        .findAllLive({
          relativeOutDirPath: { $in: ['blog'] },
          basename: { $ne: "index" }
        }, [{ date: -1 }]);
    },
    'posts_en': function () {
      // should get only docs in English
      // issue: https://github.com/docpad/docpad/issues/1062
      return this
        .getCollection("html")
        .findAllLive({
          relativeOutDirPath: { $in: ['en\\blog'] },
          basename: { $ne: "index" }
        }, [{ date: -1 }]);
    },
    sitemap: function () {
      return this
        .getCollection("html")
        .findAllLive({ isDraft: { $ne: true } }, [])
        .on("add", function (model) {
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
        "/styles/print.css",
        "/styles/highlight.js/zenburn.css",
        "https://fonts.googleapis.com/css?family=Source+Code+Pro:400,700|Open+Sans:300,400,700|Raleway:200,400,700|Dosis:300,700"
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

    getPreparedTitle: function () {
      if (this.document.title && (this.document.title != this.site.title)) {
        return this.document.title + " | " + this.site.title;
      } else {
        return this.site.title;
      }
    },
    getPreparedDescription: function () {
      return this.document.description || this.document.tagline || this.site.description;
    },
    getDocumentKeywords: function () {
      return (this.document.keywords || this.document.tags || []);
    },
    getPreparedKeywords: function () {
      return this.getDocumentKeywords().concat(this.site.keywords).join(", ");
    },

    // utilitários
    icon: function (icon) {
      return "<svg class=\"icon icon-" + icon + "\"><use xlink:href=\"/styles/iconset/symbol-defs.svg#icon-" + icon + "\"></use></svg>";
    },
    formatDate: function (date, format, locale) {
      if (format == null) {
        format = "DD/MM/YYYY";
      }
      locale = locale || 'pt-br';
      moment.locale(locale);
      return moment(date).format(format);
    },
    slugify: function (text) {
      return text.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
    },

    _: function (i18nKey, placeholders) {
      let lang = this.document ? this.document.lang : 'pt-br';
      // se o cache nao ta feito ou o valor nao foi encontrado no cache,
      // lê o arquivo do disco
      if (!translationsMap[lang] || !translationsMap[lang][i18nKey]) {
        let prefix = lang == 'pt-br' ? '' : 'en/';
        let path = `src/documents/${prefix}${lang}.json`;
        let translation = fs.readFileSync(path);
        translationsMap[lang] = JSON.parse(translation);
      }

      let text = translationsMap[lang][i18nKey];

      for (key in placeholders) {
        let value = placeholders[key];
        text = replaceVariable(text, key, value);
      }

      // console.log(`[i18n] ${i18nKey}=${text}`);
      return text;
    }
  },


  plugins: {
    nodesass: {
      options: { outputStyle: 'compressed' }
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
    },
    polyglot: {
      languages: ["pt-br", "en"],
      mainLanguage: "pt-br",
      omitMainFolder: true
    }
  },

  environments: {
    development: {
      plugins: {
        stylus: {
          stylusOptions: {
            compress: false
          }
        },
        babel: {
          compact: false
        }
      }
    }
  }
};

let blogHelpers = {
  postImageWidth: 1024,
  postImageHeight: 512,
  getPostImage: function (post) {
    let spec = { w: this.postImageWidth, h: this.postImageHeight };
    let coverUrl = this.getThumbnail(
      "blog/" + post.basename + "/cover.png",
      'zoomcrop',
      spec);

    if (!coverUrl && post.isDraft)
      coverUrl = `http://dummyimage.com/${spec.w}x${spec.h}/292929/e3e3e3&text=${post.title}`;

    return coverUrl;
  },
  postThumbWidth: 768,
  postThumbHeight: 384,
  getPostThumb: function getPostThumb(post) {
    let spec = { w: this.postThumbWidth, h: this.postThumbHeight };
    let coverUrl = this.getThumbnail(
      "blog/" + post.basename + "/cover.png",
      'zoomcrop',
      spec);

    if (!coverUrl && post.isDraft)
      coverUrl = `http://dummyimage.com/${spec.w}x${spec.h}/292929/e3e3e3&text=${post.title}`;

    return coverUrl;
  }
};

Object.assign(docpadConfig.templateData, blogHelpers);

docpadConfig.templateData.blog = {
  getPostContent: function (post, contentRelativePath) {
    try {
      fs.accessSync("out/blog/" + post.basename + "/" + contentRelativePath);
    } catch (error) {
      return null;
    }
    return "/blog/" + post.basename + "/" + contentRelativePath;
  },
  getPostOriginalImageSrc: function (post) {
    var coverUrl = this.getPostContent(post, "cover.png");
    if (!coverUrl && post.isDraft)
      coverUrl = "http://dummyimage.com/500x300/292929/e3e3e3&text=" + post.title;

    return coverUrl;
  },
  postCoverWidth: 300,
  postCoverHeight: 100,
  getPostCoverSrc: function (thumbnailPlugin, post) {
    var coverUrl = thumbnailPlugin("blog/" + post.basename + "/cover.png", {
      w: this.postCoverWidth,
      h: this.postCoverHeight
    }, 'zoomcrop');
    if (!coverUrl && post.isDraft)
      coverUrl = "http://dummyimage.com/300x100/292929/e3e3e3&text=" + post.title;

    return coverUrl;
  },
  postImageWidth: 500,
  postImageHeight: 300,
  getPostImageSrc: function (thumbnailPlugin, post) {
    var coverUrl = thumbnailPlugin("blog/" + post.basename + "/cover.png", {
      w: this.postImageWidth,
      h: this.postImageHeight
    }, 'zoomcrop');

    if (!coverUrl && post.isDraft)
      coverUrl = "http://dummyimage.com/500x300/292929/e3e3e3&text=" + post.title;

    return coverUrl;
  }
};

function replaceVariable(text, variable, value) {
  // usa regex para dar replace em todas as ocorrências da variável na mesma string
  let regex = new RegExp(`%${variable}%`, 'gi');
  return (text || '').replace(regex, value || '');
}

module.exports = docpadConfig;
