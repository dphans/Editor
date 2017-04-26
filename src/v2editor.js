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
	templateHTML		   += 						'<button type="button" v-on:click="onToolbarButtonSelected" v-if="toolbarItem.type!==\'divider\'" :uk-tooltip="css == \'uikit\'" :class="{Active: ((toolbarItem.type === \'toggle\' && selectionFormats[toolbarItem.formatKey]) || (toolbarItem.type === \'define\' && !selectionFormats[toolbarItem.formatKey] && !toolbarItem.formatValue) || (toolbarItem.type === \'define\' && selectionFormats[toolbarItem.formatKey] && selectionFormats[toolbarItem.formatKey] == toolbarItem.formatValue) || ((toolbarItem.type === \'switchNext\' || toolbarItem.type === \'switchPrev\') && selectionFormats[toolbarItem.formatKey]))}" :format-type="toolbarItem.type" :action-name="toolbarItem.actionName" :format-key="toolbarItem.formatKey" :format-value="toolbarItem.formatValue" :format-direction="toolbarItem.formatDirection" :format-values="toolbarItem.formatValues" :format-force-line="toolbarItem.formatForceLine" v-bind:title="toolbarItem.title" class="EditorToolbarButton">'
	templateHTML 		   += 							'<span v-bind:class="toolbarItem.content.class"></span><strong v-bind:class="toolbarItem.content.class" v-if="toolbarItem.content.text">{{ toolbarItem.content.text }}</strong>'
	templateHTML 		   += 						'</button>'
	templateHTML		   += 						'<span v-if="toolbarItem.type === \'divider\'" class="EditorToolbarDivider"></span>'
	templateHTML		   += 					'</div>'
	templateHTML		   += 				'</div>'
	templateHTML		   += 			'</div>'
	templateHTML		   += 			'<div class="Editor">'
	templateHTML		   += 				'<div id="' + this.elementId + 'Composer"></div>'
	templateHTML		   += 			'</div>'
	templateHTML		   += 			'<div class="EditorInsertContainer">'
	templateHTML 		   +=  				'<div class="EditorInsertContents">'
	templateHTML 		   +=  					'<button v-for="insertButtonItem in insertButtonItems" v-on:click="onInsertButtonItemSelected" type="button" class="EditorInsertButtonItem" :uk-tooltip="(css===\'uikit\' ? \'pos:left;\' : false)" :insert-type="insertButtonItem.type" :title="insertButtonItem.title" :action-name="insertButtonItem.actionName">'
	templateHTML 		   += 						'<span v-bind:class="insertButtonItem.content.class">{{ insertButtonItem.content.text }}</span>'
	templateHTML 		   += 					'</button>'
	templateHTML 		   +=  				'</div>'
	templateHTML		   += 				'<button type="button" class="EditorInsertButton">'
	templateHTML 		   += 					'<span v-if="css===\'uikit\'" uk-icon="icon: plus;"></span>'
	templateHTML 		   += 					'<span v-if="css!==\'uikit\'" class="fa fa-plus"></span>'
	templateHTML 		   +=  				'</button>'
	templateHTML		   += 			'</div>'
	templateHTML		   += 		'</div>'
	templateHTML		   += '</div>'
	this.vue.container		= new Vue({
		el: '#' + this.elementId,
		template: templateHTML,
		data: {
			css: (window.UIkit ? 'uikit' : null),
			toolbarItems: this.options.editorToolbarItems,
			insertButtonItems: this.options.editorInsertItems,
			selectionRange: { index: 0, length: 0 },
			selectionFormats: {}
		},
		watch: {
			
		},
		methods: {
			onToolbarButtonSelected: function (event) {
				if (event && typeof event.preventDefault === 'function') event.preventDefault()
				if (!event.srcElement) { return }
				var buttonItem = event.srcElement
				if (buttonItem.tagName !== 'BUTTON') { buttonItem = buttonItem.parentElement }
				if (buttonItem.tagName !== 'BUTTON') { return }

				if (buttonItem.getAttribute('action-name')) {
					var actionName = buttonItem.getAttribute('action-name')
					if (typeof HandlerMethods.userActions[actionName] !== 'function') { return }
					HandlerMethods.userActions[actionName].call(this, HandlerMethods, CoreEditor, buttonItem)
					return
				}

				var formatType = buttonItem.getAttribute('format-type')
				var formatKey = buttonItem.getAttribute('format-key')
				var formatValue = buttonItem.getAttribute('format-value')
				var formatValues = buttonItem.getAttribute('format-values')
				var formatDirection = buttonItem.getAttribute('format-direction')
				var formatForceLine = buttonItem.getAttribute('format-force-line')
				if (typeof formatKey !== 'string') { return }

				// switch between values
				if (formatType === 'switchNext' || formatType === 'switchPrev') {
					if (typeof formatValues == 'string') { formatValues = formatValues.split(',') }
					if (formatValues.length <= 0) { return }
					if (this.selectionFormats[formatKey] ) {
						var indexOfCurrentValue = formatValues.indexOf(String(this.selectionFormats[formatKey]))
						if (formatType === 'switchNext') {
							CoreEditor.formatLine(this.selectionRange, formatKey, formatValues[indexOfCurrentValue + 1] || 0)
						} else {
							CoreEditor.formatLine(this.selectionRange, formatKey, formatValues[indexOfCurrentValue - 1] || 0)
						}
					} else {
						if (formatType === 'switchNext') {
							CoreEditor.formatLine(this.selectionRange, formatKey, formatValues[0])
						} else {
							CoreEditor.formatLine(this.selectionRange, formatKey, formatValues[formatValues.length - 1])
						}
					}
				}

				// toggle boolean
				else if (formatType === 'toggle') {
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

				// define value
				else if (formatType === 'define') {
					if (formatForceLine) {
						CoreEditor.formatLine(this.selectionRange, formatKey, formatValue)
					} else {
						CoreEditor.formatText(this.selectionRange, formatKey, formatValue)
					}
				}

				HandlerMethods.updateSelectionFormats()
			},
			onInsertButtonItemSelected: function (event) {
				if (event && typeof event.preventDefault === 'function') event.preventDefault()
				if (!event.srcElement) { return }
				var buttonItem = event.srcElement
				if (buttonItem.tagName !== 'BUTTON') { buttonItem = buttonItem.parentElement }
				if (buttonItem.tagName !== 'BUTTON') { return }
				var methodName	= buttonItem.getAttribute('action-name')
				if (typeof methodName !== 'string') { return }
				if (typeof HandlerMethods.userActions[methodName] !== 'function') { return }
				HandlerMethods.userActions[methodName].call(this, HandlerMethods, CoreEditor, buttonItem)
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

Vue2Editor.prototype.importJSON = function (jsonData) {
	jsonData 			= jsonData || []

	if (typeof jsonData === 'string') {
		try {
			jsonData 	= JSON.parse(jsonData)
		} catch (jsonParseException) {
			console.log(jsonParseException)
			jsonData 	= []
		}
	}
	
	var contentsDelta 	= []
	jsonData.forEach(function (line) {
		var lineFormats = line.lineFormats
		var lineContent = line.lineContents
		lineContent.forEach(function (paragraph) {
			switch (paragraph.content.type) {
				case 'image':
					contentsDelta.push({
						insert: {
							image: paragraph.content.data
						},
						attributes: paragraph.formats
					})
					break
				case 'video':
					contentsDelta.push({
						insert: {
							video: paragraph.content.data
						},
						attributes: paragraph.formats
					})
					break
				default:
					contentsDelta.push({
						insert: paragraph.content.data,
						attributes: paragraph.formats
					})
					break
			}
		})
		contentsDelta.push({ insert: "\n", attributes: lineFormats })
	})

	CoreEditor.setContents(new QuillDelta(contentsDelta))
}

Vue2Editor.prototype.exportJSON = function () {
	var jsonResult		= []
	var contents 		= CoreEditor.getContents()
	var lineContainer 	= []
	contents.forEach(function (content) {
		if (content.insert === '\n' || content.insert === '\n\n') {
			jsonResult.push({
				lineContents: lineContainer,
				lineFormats: content.attributes || {}
			})
			lineContainer = []
		} else {
			if (typeof content.insert === 'string') {
				lineContainer.push({
					content: {
						type: 'text',
						data: content.insert
					},
					formats: content.attributes || {}
				})
			} else {
				lineContainer.push({
					content: {
						type: Object.keys(content.insert)[0],
						data: content.insert[Object.keys(content.insert)[0]]
					},
					formats: content.attributes || {}
				})
			}
		}
	})
	if (lineContainer && lineContainer.length) {
		jsonResult.push({
			lineContents: lineContainer,
			lineFormats: []
		})
	}
	return jsonResult
}

/*
Vue2Editor.prototype.exportHTML	= function () {
	var elementId = ""
	var possChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
	for (var index = 0; index < 10; index += 1) {
		elementId += possChars.charAt(Math.floor(Math.random() * possChars.length))
	}
	var container 	= window.document.createElement('div')
	container.id  	= elementId
	var virtualQl 	= new Quill(container)
	virtualQl.setContents(CoreEditor.getContents())
	var htmlResult	= container.getElementsByClassName('ql-editor')[0].innerHTML
	container.remove()
	return htmlResult
}
*/

window.Editor = Vue2Editor
