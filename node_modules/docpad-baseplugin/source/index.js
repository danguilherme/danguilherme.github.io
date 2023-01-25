'use strict'

// External
const Errlop = require('errlop')
const extendr = require('extendr')
const typeChecker = require('typechecker')
const eachr = require('eachr')

/**
 * @typedef {Object} BasePluginOptions
 * @property {DocPad} docpad
 * @property {Object} config - forwaded to {@link BasePlugin#setConfig}
 */

/**
 * The base class for all DocPad plugins
 * @class
 * @constructor
 * @param {BasePluginOptions} opts
 */
class BasePlugin {
	constructor(opts) {
		// Prepare
		const { docpad, config } = opts

		// Validate
		if (this.initialConfig && this.config) {
			throw new Errlop(
				`Plugin ${this.name} is misconfigured, it has both @config and @initialConfig defined, it can only have one or the other, preferably @initialConfig`
			)
		}

		// ---------------------------------
		// Inherited

		/**
		 * The DocPad Instance
		 * @type {Object}
		 * @private
		 */

		this.docpad = docpad

		// ---------------------------------
		// Variables

		try {
			/**
			 * The plugin name
			 * @type {String}
			 */
			this.name = this.name || null
		} catch (err) {
			// ignore, as must be exposed via a getter, in which case it won't have reference issues
		}

		try {
			/**
			 * Plugin priority
			 * @private
			 * @type {Number}
			 */
			this.priority = this.priority || 500
		} catch (err) {
			// ignore, as must be exposed via a getter, in which case it won't have reference issues
		}

		try {
			/**
			 * The initial config
			 * @type {Object}
			 */
			this.initialConfig = extendr.clone(
				this.initialConfig || this.config || {}
			)
		} catch (err) {
			// ignore, as must be exposed via a getter, in which case it won't have reference issues
		}

		/**
		 * The instance config
		 * @type {Object}
		 */
		this.instanceConfig = {}

		/**
		 * The plugin config
		 * @type {Object}
		 */
		this.config = {}

		// ---------------------------------
		// Construct

		// Bind listeners
		this.bindListeners()

		// Apply the configuration
		this.setConfig(config)

		// Only listen ot events if we are enabled
		if (this.isEnabled()) {
			// Listen to events
			return this.addListeners()
		}
	}

	/**
	 * Set Configuration
	 * @private
	 * @param {Object} [instanceConfig]
	 * @returns {BasePlugin} this
	 * @chainable
	 */
	setConfig(instanceConfig) {
		// Prepare
		const docpad = this.docpad
		const userConfig = docpad.config.plugins[this.name]

		// Reset the configuration
		this.config = docpad.config.plugins[this.name] = {}

		// Merge in the instance configuration
		if (instanceConfig) {
			extendr.deepDefaults(this.instanceConfig, instanceConfig)
		}

		// Merge configurations
		this.config = docpad.mergeConfigs([
			this.initialConfig,
			userConfig,
			this.instanceConfig,
		])

		// Remove listeners if we are disabled
		if (this.isEnabled() === false) {
			this.removeListeners()
		}

		// Chain
		return this
	}

	/**
	 * Get the Configuration
	 * @private
	 * @returns {Object}
	 */
	getConfig() {
		return this.config
	}

	/**
	 * Bind Listeners
	 * @returns {BasePlugin} this
	 * @chainable
	 */
	bindListeners() {
		// Prepare
		const pluginInstance = this
		const docpad = this.docpad
		const events = docpad.getEvents()

		// Bind events
		eachr(events, function (eventName) {
			// Fetch the event handler
			const eventHandler = pluginInstance[eventName]

			// Check it exists and is a function
			if (typeChecker.isFunction(eventHandler)) {
				// Bind the listener to the plugin
				pluginInstance[eventName] = eventHandler.bind(pluginInstance)
			}
		})

		// Chain
		return this
	}

	/**
	 * Alias of {@link BasePlugin#addListeners} for backwards compatibility
	 * @private
	 * @returns {BasePlugin} this
	 * @chainable
	 */
	bindEvents() {
		return this.addListeners()
	}

	/**
	 * Add Listeners
	 * @returns {BasePlugin} this
	 * @chainable
	 */
	addListeners() {
		// Prepare
		const pluginInstance = this
		const docpad = this.docpad
		const events = docpad.getEvents()

		// Bind events
		eachr(events, function (eventName) {
			// Fetch the event handler
			const eventHandler = pluginInstance[eventName]

			// Check it exists and is a function
			if (typeChecker.isFunction(eventHandler)) {
				// Apply the priority
				if (eventHandler.priority == null) {
					eventHandler.priority =
						pluginInstance[eventName + 'Priority'] ||
						pluginInstance.priority ||
						null
				}

				try {
					eventHandler.name = `${pluginInstance.name}: ${eventName}`
					if (eventHandler.priority) {
						eventHandler.name += `(priority ${eventHandler.priority})`
					}
				} catch (ignoredError) {
					// newer versions of node do not allow writing the name property on functions, as it is readonly
				}

				// Wrap the event handler, and bind it to docpad
				docpad.off(eventName, eventHandler).on(eventName, eventHandler)
			}
		})

		// Chain
		return this
	}

	/**
	 * Remove Listeners
	 * @returns {BasePlugin} this
	 * @chainable
	 */
	removeListeners() {
		// Prepare
		const pluginInstance = this
		const docpad = this.docpad
		const events = docpad.getEvents()

		// Bind events
		eachr(events, function (eventName) {
			// Fetch the event handler
			const eventHandler = pluginInstance[eventName]

			// Check it exists and is a function
			if (typeChecker.isFunction(eventHandler)) {
				// Wrap the event handler, and unbind it from docpad
				docpad.off(eventName, eventHandler)
			}
		})

		// Chain
		return this
	}

	/**
	 * Destroy the plugin cleanly.
	 * Calls {@link BasePlugin#removeListeners}
	 * @returns {BasePlugin} this
	 * @chainable
	 */
	destroy() {
		this.removeListeners()
		return this
	}

	/**
	 * Is the plugin enabled?
	 * @return {Boolean}
	 */
	isEnabled() {
		return this.config.enabled !== false
	}

	/**
	 * Whether or not this is a DocPad Plugin
	 * @static
	 * @param {*} [value]
	 * 	The value to determine if it is a DocPad plugin.
	 * 	If omitted, will return `true` to indicate that the class is a DocPad Plugin class.
	 * @returns {boolean}
	 */
	static isDocPadPlugin(value) {
		if (value != null) {
			return value instanceof this
		} else {
			return true
		}
	}
}

// ---------------------------------
// Export Plugin

module.exports = BasePlugin
