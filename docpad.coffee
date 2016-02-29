fs = require('fs')
moment = require('moment')
moment.locale('pt-br')
pkg = require('./package.json')

author = {
  name: "Guilherme Ventura"
  email: "guilhermeventura2@gmail.com"
  twitter: "danguilherme"
  github: "danguilherme"
}

# Define the DocPad Configuration
docpadConfig = {
  collections:
    pages: ->
      @getCollection("html").findAllLive({ layout: 'page' }, [{ menuOrder: 1 }]).on "add", (model) ->
        model.setMetaDefaults({ htmlmin: true })
    posts: ->
      @getCollection("html").findAllLive({relativeOutDirPath: 'blog', isDraft: { $ne: true }, basename: { $ne: "index" }}, [{date:-1}]).on "add", (model) ->
        model.setMetaDefaults({ htmlmin: true, layout: "post" })
    sitemap: ->
      # everything but drafts
      @getCollection("html").findAllLive({ isDraft: { $ne: true } }, []).on "add", (model) ->
        model.setMetaDefaults({ changefreq: "monthly" })

  templateData:
    # Specify some site properties
    site:
      # The production URL of our website
      url: "https://danguilherme.github.io"
      version: pkg.version

      styles: [
        "/styles/style.css"
        "/styles/highlight.js/zenburn.css"
        "https://fonts.googleapis.com/css?family=Source+Code+Pro:400,700|Marvel:400,700|Raleway:200,400,700"
      ]

      scripts: [
        "/scripts/danguilherme.js"
        "/scripts/triple-click.js"
        "/scripts/main.js"
        "/scripts/google-analytics.js"
      ]

      # The default title of our website
      title: "Guilherme Ventura"
      author: author

      # The website description (for SEO)
      description: """
        Blog do Guilherme
        """

      # The website keywords (for SEO) separated by commas
      keywords: """
          blog, front-end, programação, javascript, css, html, csharp, C#, artigos
          """

    # -----------------------------
    # Helper Functions

    # Get the prepared site/document title
    # Often we would like to specify particular formatting to our page"s title
    # we can apply that formatting here
    getPreparedTitle: ->
      # if we have a document title, then we should use that and suffix the site"s title onto it
      if @document.title
        "#{@document.title} | #{@site.title}"
      # if our document does not have its own title, then we should just use the site"s title
      else
        @site.title

    # Get the prepared site/document description
    getPreparedDescription: ->
      # if we have a document description, then we should use that, otherwise use the site"s description
      @document.description or @document.tagline or @site.description

    # Get the prepared site/document keywords
    getPreparedKeywords: ->
      # Merge the document keywords with the site keywords
      (@document.keywords or @document.tags or []).concat(@site.keywords).join(", ")

    # Format date
    formatDate: (date, format="DD/MM/YYYY") -> return moment(date).format(format)

    # Transforms "Texto de Exemplo" into "texto-de-exemplo"
    slugify: (text) ->
      return text.toString().toLowerCase()
        .replace(/\s+/g, '-')     # Replace spaces with -
        .replace(/[^\w\-]+/g, '') # Remove all non-word chars
        .replace(/\-\-+/g, '-')   # Replace multiple - with single -
        .replace(/^-+/, '')       # Trim - from start of text
        .replace(/-+$/, '');      # Trim - from end of text


  # -----------------------------
  # Plugins Configuration
  plugins:
    stylus:
      stylusOptions:
        compress: true
        'include css': true
    rss:
      default:
        collection: 'posts'
        url: '/rss.xml'
    related:
      parentCollectionName: 'posts'
    cleanurls:
      trailingSlashes: false
      static: true
    ghpages:
      deployRemote: 'origin'
      deployBranch: 'master'
    sitemap:
      collectionName: 'sitemap'
      cachetime: 600000
			changefreq: 'weekly'
			priority: 0.5
			filePath: 'sitemap.xml'

  environments:
    development:
      collections:
        posts: ->
          @getCollection("html").findAllLive({relativeOutDirPath: 'blog', basename: $ne: "index" }, [{date:-1}]).on "add", (model) ->
            model.setMetaDefaults({ layout: "post" })
}

docpadConfig.templateData.blog = {
  getPostContent: (post, contentRelativePath) ->
    try
      # throws if any accessibility checks fail, and does nothing otherwise.
      fs.accessSync("out/blog/#{post.basename}/#{contentRelativePath}");
    catch error
      console.warn("getPostContent: '#{contentRelativePath}' does not exist for '#{post.title}'");
      return null;
    return "/blog/#{post.basename}/#{contentRelativePath}";

  getPostOriginalImageSrc: (post) ->
    coverUrl = @getPostContent(post, "cover.png");

    if !coverUrl && post.isDraft
      # not supposed to be shown by published articles, just for tests
      coverUrl = "http://dummyimage.com/500x300/292929/e3e3e3&text=#{post.title}";

    return coverUrl;

  getPostCoverSrc: (thumbnailPlugin, post) ->
    coverUrl = thumbnailPlugin("blog/#{post.basename}/cover.png", {w: 300, h: 100}, 'zoomcrop');

    if !coverUrl && post.isDraft
      # not supposed to be shown by published articles, just for tests
      coverUrl = "http://dummyimage.com/300x100/292929/e3e3e3&text=#{post.title}";

    return coverUrl;

  getPostImageSrc: (thumbnailPlugin, post) ->
    coverUrl = thumbnailPlugin("blog/#{post.basename}/cover.png", {w: 500, h: 300}, 'zoomcrop');

    if !coverUrl && post.isDraft
      # not supposed to be shown by published articles, just for tests
      coverUrl = "http://dummyimage.com/500x300/292929/e3e3e3&text=#{post.title}";

    return coverUrl;
}

# Export the DocPad Configuration
module.exports = docpadConfig
