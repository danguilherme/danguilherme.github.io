# Export Plugin
module.exports = (BasePlugin) ->
	# Define Plugin
	class PolyglotPlugin extends BasePlugin
		# Plugin name
		name: 'polyglot'
		config:
			languages: null
			mainLanguage: null
			omitMainFolder: true


		# Injected to site's templateData on `extendTemplateData` event
		templateData:
			# Example : @date()
			# Example with parameters : @date(post.date, post.lang)
			date: (opts={}) ->
				{ date, lang, format } = opts

				date ?= @document.date
				lang ?= @document.lang or @defaultLanguage
				format ?= 'LL'

				moment = require 'moment'
				moment.locale(lang)
				return moment(date).format(format)

			# Returns a translation URL for the specified language,
			# if it has one
			toLang: (lang) ->
				if @document.translationURLs? and @document.translationURLs[lang]?
					@getNewUrl @document.translationURLs[lang]

			# get the current URL from the original URL a page had
			# of use for plugins which rewrite the actual URL
			getNewUrl: (oldUrl) ->
				match = @getCollection('documents').findAll({ origUrl: oldUrl })
				if match.size() != 1
					throw new Error "Expected to find 1
						document with original URL #{oldUrl} but
						got #{match.size()}"
				return match.toJSON()[0].url

			# is there a valid translation for this page
			hasLang: (lang) ->
				@document.translationURLs? and @document.translationURLs[lang]?

			# other languages for this page
			otherLangs: ->
				other = {}
				for lang, url of @document.translationURLs
					if lang != @document.lang
						other[lang] = @getNewUrl url
				return other

			# Allow to obtain current language from URL if @document.lang isn't available
			# Using @document.lang is prefered for performance
			langFromUrl: (url) ->
				match = @getCollection('documents').findAll({ url: url })
				return match.models[0].get('lang') if match.size() > 0
		extendTemplateData: (opts) ->
			{ templateData } = opts
			config = @config

			@log 'debug', config

			templateData = Object.assign(templateData, @templateData)
			templateData.languages = config.languages
			templateData.mainLanguage = config.mainLanguage

			if not @checkRequiredConfigs()
				@error @requiredConfigMissingError()
				return @

			@


		extendCollections: (opts) ->
			config = @getConfig()
			docpad = @docpad
			languages = config.languages
			database = @docpad.getDatabase()

			if not @checkRequiredConfigs()
				@error @requiredConfigMissingError()
				return @

			for lang in languages
				do (lang, docpad) ->
					# get documents by language and add info on metadata
					relativeDirPathCriteria = $startsWith: lang
					if config.omitMainFolder and lang is config.mainLanguage
						otherLanguages = languages.filter((l) -> l != config.mainLanguage)
						relativeDirPathCriteria = new RegExp("^(?!#{otherLanguages.join('|')}(\\\\|$))")
					docpad
						.getCollection('documents')
						.findAllLive({ relativeDirPath: relativeDirPathCriteria }, [ {date:-1} ] )
						.on "add", (model) -> model.setMetaDefaults { lang: lang }

					# create collections for each language
					docpad.setCollection(
						"lang_#{lang}",
						database.createLiveChildCollection().setQuery("is_#{lang}", { lang: lang })
					)

			# Chain
			@


		generateBefore: (opts) ->
			docsCollection = @docpad.getCollection('html').findAll()
			allDocs = docsCollection.toJSON()
			config = @config

			translationsMap = {}
			for d in allDocs
				if d.lang?
					documentUrl = @docUrl d
					translationsMap[documentUrl] = {}
					translationsMap[documentUrl][d.lang] = documentUrl

			# add user-specified translations
			for d in allDocs
				for l in config.languages
					if (d.translations? and d.translations[l]?) and (d.lang? and d.lang != l)
						documentUrl = @docUrl d
						translationUrl = '/' + l + '/' + d.translations[l]
						if translationUrl not of translationsMap
							@log 'debug', translationsMap
							@error "#{documentUrl} specifies a non-existing translation #{translationUrl}"

						if translationsMap[documentUrl][l]?
							@error "#{documentUrl} already has translation
								#{translationsMap[documentUrl][l]} (trying to add #{translationUrl}).
								Specified in #{documentUrl}"

						translationsMap[documentUrl][l] = translationUrl

						if translationsMap[translationUrl][d.lang]?
							@error "#{translationUrl} already has translation
								#{translationsMap[translationUrl][d.lang]} (trying to add
								#{documentUrl}). Specified in #{documentUrl}"
						translationsMap[translationUrl][d.lang] = documentUrl

			# add automatic translations by going through the files
			# separate loop from above to allow specification in meta-data to be
			# reflexive
			for d in allDocs
				for l in config.languages
					if d.lang!=l and d.lang? and l?
						documentUrl = @docUrl d
						translationUrl = '/' + l + '/' + (@noLanguagePath d.lang, documentUrl)
						if translationUrl of translationsMap
							if translationsMap[documentUrl][l]?
								if translationsMap[documentUrl][l] != translationUrl
									@error "#{documentUrl} already has a translation
										#{translationsMap[documentUrl][l]} when adding #{translationUrl}"
							else
								translationsMap[documentUrl][l] = translationUrl

			for d in docsCollection.models
				d.set("origUrl", d.get("url")) unless d.get('origUrl') # store in case the URL gets rewritten
				if d.get("url") of translationsMap
					d.set("translationURLs", translationsMap[d.get("url")])
					lang = d.get("lang")
					prefix = "#{lang}/"
					prefix = '' if config.omitMainFolder && lang is config.mainLanguage
					d.set("langPrefix", prefix)
				else if not d.has("lang")
					d.set("lang","")

			@log 'debug', translationsMap

			@

		# Helper functions
		noLanguagePath: (lang, path) ->
			config = @getConfig()
			pathIndex = 2 # where the file path really starts
			pathIndex = 1 if lang is config.mainLanguage and config.omitMainFolder

			path.split('/')[pathIndex..].join '/'


		docUrl: (document) ->
			document.origUrl || document.url

		error: (msg) ->
			msg = msg.message if msg instanceof Error
			@docpad.error "Polyglot: #{JSON.stringify(msg)}"
		log: (type, message) ->
			@docpad.log type, "Polyglot: #{JSON.stringify(message, null, 2)}"
		requiredConfigMissingError: ->
			new Error("Configs 'mainLanguage' and 'languages' are mandatory")
		checkRequiredConfigs: ->
			config = @getConfig()
			config.mainLanguage and (config.languages and config.languages.length)