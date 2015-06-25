# DocPad Configuration File
# http://docpad.org/docs/config

# Define the DocPad Configuration
docpadConfig = {
            
  templateData:
    # Specify some site properties
    site:
      # The production URL of our website
      url: "http://danguilherme.github.io/hackeventos/"

      # The default title of our website
      title: "Blog - Guilherme Ventura"

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
      @document.description or @site.description

    # Get the prepared site/document keywords
    getPreparedKeywords: ->
      # Merge the document keywords with the site keywords
      @site.keywords.concat(@document.keywords or []).join(", ")
}

# Export the DocPad Configuration
module.exports = docpadConfig