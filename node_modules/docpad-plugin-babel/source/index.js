'use strict'

const babel = require('@babel/core')
const BasePlugin = require('docpad-baseplugin')

module.exports = class BabelPlugin extends BasePlugin {
	// Plugin name
	get name() {
		return 'babel'
	}

	get initialConfig() {
		return {
			compact: true,
			comments: false,
			ast: false,
		}
	}

	// Render
	// Called per document, for each extension conversion. Used to render one extension to another.
	render(opts) {
		// Prepare
		const { inExtension, outExtension } = opts

		// Upper case the text document's content if it is using the convention txt.(uc|uppercase)
		if (
			['es6', 'babel'].includes(inExtension) &&
			['js', null].includes(outExtension)
		) {
			// Render synchronously
			opts.content = babel.transform(
				opts.content,
				Object.assign(
					{
						presets: ['@babel/preset-env', '@babel/preset-react'],
					},
					this.config
				)
			).code
		}

		// Done
		return
	}
}
