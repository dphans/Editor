var Quill 			= require('quill')
var QuillDelta 		= require('quill-delta')
var Vue 			= require('vue/dist/vue.js')

var ErrorsHandler 	= require('./modules/errors')()
var Constants 		= require('./modules/constants')
var CoreEditor		= null
var HandlerMethods 	= null

var Vue2Editor = function (element, options) {
	if (!element) {
		ErrorsHandler.print('ELEMENT_ID_UNDEFINED')
		return this
	}

	if (typeof element !== 'string') {
		ErrorsHandler.print('ELEMENT_TYPE_INVALID')
		return this
	}

	this.elementId 	= element
	var tempOptions = Constants.defaultOptions;
	if (options) {
		Object.keys(options).forEach(function (key) {
			tempOptions[key] = options[key]
		})
	};
	Object.keys(Constants.overrideOptions).forEach(function (key) {
		tempOptions[key] = Constants.overrideOptions[key]
	})

	this.options 	= tempOptions

	var containerClasses	= document.getElementById(this.elementId).className || ''
	var templateHTML		= '<div class="' + containerClasses + '">'
	templateHTML		   += 		'<div class="EditorContainer">'
	templateHTML		   += 			'<div class="EditorToolbar">'
	templateHTML		   += 				'<div>'
	templateHTML		   += 					'<div v-for="toolbarItem in toolbarItems">'
	templateHTML		   += 						'<button v-if="toolbarItem.type===\'button\'" v-bind:uk-tooltip="css == \'uikit\'" v-bind:class="{Active: (selectionFormats[toolbarItem.formatKey] && (selectionFormats[toolbarItem.formatKey] === toolbarItem.formatValue || selectionFormats[toolbarItem.formatKey] == true) || (toolbarItem.formatValue == \'\' && !selectionFormats[toolbarItem.formatKey] && (!toolbarItem.formatValues || !toolbarItem.formatValues.length)) || (selectionFormats[toolbarItem.formatKey] && toolbarItem.formatValues && toolbarItem.formatValues.length)) }" v-on:click="onToolbarButtonSelected" type="button" :format-key="toolbarItem.formatKey" :format-value="toolbarItem.formatValue" :format-direction="toolbarItem.formatDirection" :format-values="toolbarItem.formatValues" :format-force-line="toolbarItem.formatForceLine" v-bind:title="toolbarItem.title" class="EditorToolbarButton">'
	templateHTML 		   += 							'<span v-bind:class="toolbarItem.content.class">'
	templateHTML		   += 								'<span v-if="toolbarItem.content.text">{{ toolbarItem.content.text }}</span>'
	templateHTML 		   += 							'</span>'
	templateHTML 		   += 						'</button>'
	templateHTML		   += 						'<span v-if="toolbarItem.type === \'divider\'" class="EditorToolbarDivider"></span>'
	templateHTML		   += 					'</div>'
	templateHTML		   += 				'</div>'
	templateHTML		   += 			'</div>'
	templateHTML		   += 			'<div class="Editor">'
	templateHTML		   += 				'<div id="' + this.elementId + 'Composer"></div>'
	templateHTML		   += 			'</div>'
	templateHTML		   += 		'</div>'
	templateHTML		   += '</div>'
	this.vue.container		= new Vue({
		el: '#' + this.elementId,
		template: templateHTML,
		data: {
			css: (window.UIkit ? 'uikit' : null),
			toolbarItems: this.options.editorToolbarItems,
			selectionRange: { index: 0, length: 0 },
			selectionFormats: {}
		},
		watch: {
			selectionRange: function () {
				
			}
		},
		methods: {
			onToolbarButtonSelected: function (event) {
				if (event && typeof event.preventDefault === 'function') event.preventDefault()
				if (!event.srcElement) { return }
				var buttonItem = event.srcElement
				if (buttonItem.tagName !== 'BUTTON') { buttonItem = buttonItem.parentElement }
				if (buttonItem.tagName !== 'BUTTON') { return }

				var formatKey = buttonItem.getAttribute('format-key')
				var formatValue = buttonItem.getAttribute('format-value')
				var formatValues = buttonItem.getAttribute('format-values')
				var formatDirection = buttonItem.getAttribute('format-direction')
				var formatForceLine = buttonItem.getAttribute('format-force-line')
				if (typeof formatKey !== 'string') { return }

				// switch between values
				if (formatValues && formatDirection && formatDirection !== 'none') {
					if (typeof formatValues == 'string') { formatValues = formatValues.split(',') }
					if (formatValues.length <= 0) { return }
					if (typeof this.selectionFormats[formatKey] !== 'undefined') {
						var indexOfCurrentValue = formatValues.indexOf(String(this.selectionFormats[formatKey]))
						if (formatDirection === 'next' && (indexOfCurrentValue + 1) < (formatValues.length - 1)) {
							CoreEditor.formatLine(this.selectionRange, formatKey, formatValues[indexOfCurrentValue + 1])
						} else if (formatDirection === 'prev' && (indexOfCurrentValue - 1) >= 0) {
							CoreEditor.formatLine(this.selectionRange, formatKey, formatValues[indexOfCurrentValue - 1])
						} else {
							CoreEditor.formatLine(this.selectionRange, formatKey, '')
						}
					} else {
						if (formatDirection === 'next') {
							CoreEditor.formatLine(this.selectionRange, formatKey, formatValues[0])
						} else {
							CoreEditor.formatLine(this.selectionRange, formatKey, formatValues[formatValues.length - 1])
						}
					}
				}

				// toggle boolean
				else {
					if (typeof this.selectionFormats[formatKey] !== 'undefined' && this.selectionFormats[formatKey]) {
						if (formatForceLine) {
							CoreEditor.formatLine(this.selectionRange, formatKey, '')
						} else {
							CoreEditor.formatText(this.selectionRange, formatKey, '')
						}
					} else {
						if (formatForceLine) {
							CoreEditor.formatLine(this.selectionRange, formatKey, formatValue || true)
						} else {
							CoreEditor.formatText(this.selectionRange, formatKey, formatValue || true)
						}
					}
				}

				HandlerMethods.updateSelectionFormats()
			}
		}
	})

	if (!this.elementId) {
		ErrorsHandler.print('ELEMENT_NOT_DECLARED')
		return
	}

	if (window.hljs) {
		hljs.configure({
			languages: ['javascript', 'ruby', 'python', 'java', 'bash', 'objectivec', 'swift']
		})
	} else {
		if (this.options.modules && this.options.modules.syntax) {
			this.options.modules.syntax = false
		}
	}

	CoreEditor 		= new Quill(document.getElementById(this.elementId + 'Composer'), this.options || {})
	HandlerMethods 	= require('./modules/handlers')(this, CoreEditor)
	HandlerMethods.handleCoreEditorEvents()

	if (Constants.debug === true) {
		this.core 	= CoreEditor
	}

	return this
}

Vue2Editor.prototype 		= {}
Vue2Editor.prototype.constructor = Vue2Editor
Vue2Editor.prototype.vue	= {}

window.Editor = Vue2Editor
