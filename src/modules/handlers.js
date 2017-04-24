module.exports = function (Editor, CoreEditor) {

	return {

		updateSelectionFormats: function () {
			Editor.vue.container.selectionFormats = CoreEditor.getFormat(Editor.vue.container.selectionRange)
		},

		handleCoreEditorEvents: function () {
			var Handlers = this

			// on editor-change (text-change + selection-change)
			// this method call before text/selection change
			CoreEditor.on('editor-change', function (eventName, data) {
				if (eventName === 'selection-change') {
					var range = CoreEditor.getSelection(false)
					if (range) {
						Editor.vue.container.selectionFormats 	= CoreEditor.getFormat(range)
						Editor.vue.container.selectionRange 	= {
							index: (typeof range.index === 'number' && range.index >= 0) ? range.index : 0,
							length: (typeof range.length === 'number' && range.length >= 0) ? range.length : 0,
						}
					}
				}
			})

			// on text-change
			CoreEditor.on('text-change', function (delta, oldDelta, source) {
				if (source === 'user') {
					Handlers.updateSelectionFormats.call(this)
				}
			})

			// on selection-change
			CoreEditor.on('selection-change', function (range, oldRange, source) {

			})
		}

	}

}
