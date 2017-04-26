module.exports 	= function (Editor, CoreEditor) {

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
		},

		checkAndInsertYoutubeVideo: function (videoURL, coreEditor) {
			videoURL			= videoURL || ''
			var youtubeRegx 	= /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/
			var youtubeIdMatch 	= videoURL.match(youtubeRegx)
			var youtubeId		= (youtubeIdMatch && youtubeIdMatch[7].length == 11) ? youtubeIdMatch[7] : videoURL
			if (!videoURL || videoURL === '') {
				if (typeof window.UIkit !== 'undefined') { UIkit.modal.alert('Invalid Youtube URL or Id!') }
				else { window.alert('Invalid Youtube URL or Id!') }
				return
			}
			coreEditor.insertEmbed((coreEditor.getLength() - 1), 'video', 'https://www.youtube.com/embed/' + youtubeId, 'user')
			coreEditor.formatLine((coreEditor.getLength() - 1), { align: 'center' }, 'user')
		},

		checkAndInsertPhotoURL: function (photoURL, coreEditor) {
			photoURL			= photoURL || ''
			if (!photoURL || photoURL === '') {
				if (typeof window.UIkit !== 'undefined') { UIkit.modal.alert('Invalid photo URL!') }
				else { window.alert('Invalid photo URL!') }
				return
			}

			var imageURLRegx	= /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/
			var imageURLMatch 	= photoURL.match(imageURLRegx)
			if (imageURLMatch && imageURLMatch[0]) {
				coreEditor.insertEmbed((coreEditor.getLength() - 1), 'image', imageURLMatch[0], 'user')
				coreEditor.formatLine((coreEditor.getLength() - 1), { align: 'center' }, 'user')
			} else {
				if (typeof window.UIkit !== 'undefined') { UIkit.modal.alert('Invalid photo URL!') }
				else { window.alert('Invalid photo URL!') }
			}
		},

		userActions: {
			save: function (handlerMethods, coreEditor, senderButtonItem) {

			},
			uploadPhoto: function (handlerMethods, coreEditor, senderButtonItem) {
				
			},
			insertPhotoURL: function (handlerMethods, coreEditor, senderButtonItem) {
				if (typeof window.UIkit !== 'undefined') {
					UIkit.modal.prompt('Please enter photo URL', 'https://www.smashingmagazine.com/wp-content/uploads/2015/06/10-dithering-opt.jpg')
						.then(function (youtubeURL) {
							handlerMethods.checkAndInsertPhotoURL(youtubeURL, coreEditor)
						}, function () {})
				} else {
					handlerMethods.checkAndInsertPhotoURL(window.prompt('Please enter photo URL'), coreEditor)
				}
			},
			insertMedia: function (handlerMethods, coreEditor, senderButtonItem) {
				if (typeof window.UIkit !== 'undefined') {
					UIkit.modal.prompt('Please enter Youtube video URL or ID', 'https://www.youtube.com/watch?v=JCfEKhsJrxE')
						.then(function (youtubeURL) {
							handlerMethods.checkAndInsertYoutubeVideo(youtubeURL, coreEditor)
						}, function () {})
				} else {
					handlerMethods.checkAndInsertYoutubeVideo(window.prompt('Please enter Youtube video URL or ID'), coreEditor)
				}
			}
		}

	}

}
