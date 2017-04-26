module.exports = {
	debug: true,
	events: {
		save: function (jsonContent) {
			
		}
	},
	overrideOptions: {
		modules: {
			syntax: true
		}
	},
	defaultOptions: {
		editorInsertItems: [
			/*{
				type: 'action',
				title: 'Upload photo',
				content: { class: 'fa fa-upload' },
				actionName: 'uploadPhoto'
			},*/
			{
				type: 'action',
				title: 'Insert photo',
				content: { class: 'fa fa-photo' },
				actionName: 'insertPhotoURL'
			},
			{
				type: 'action',
				title: 'Insert media',
				content: { class: 'fa fa-film' },
				actionName: 'insertMedia'
			}
		],
		editorToolbarItems: [
			{
				type: 'action',
				title: 'Save',
				content: { class: 'fa fa-save EditorToolbarButtonTextMedium' },
				actionName: 'save'
			},
			{ type: 'divider' },
			{
				type: 'define',
				title: 'Section',
				content: { class: 'EditorToolbarButtonTextLarge', text: 'Sc' },
				formatKey: 'header',
				formatForceLine: true,
				formatValue: '2'
			},
			{
				type: 'define',
				title: 'Sub-section',
				content: { class: 'EditorToolbarButtonTextMedium', text: 'Ss' },
				formatKey: 'header',
				formatForceLine: true,
				formatValue: '3'
			},
			{
				type: 'define',
				title: 'Normal',
				content: { class: 'EditorToolbarButtonTextSmall', text: 'Bd' },
				formatKey: 'header',
				formatForceLine: true,
				formatValue: ''
			},
			{ type: 'divider' },
			{
				type: 'toggle',
				title: 'Bold',
				content: { class: 'fa fa-bold EditorToolbarButtonTextMedium' },
				formatKey: 'bold'
			},
			{
				type: 'toggle',
				title: 'Italic',
				content: { class: 'fa fa-italic EditorToolbarButtonTextMedium' },
				formatKey: 'italic',
			},
			{
				type: 'toggle',
				title: 'Underline',
				content: { class: 'fa fa-underline EditorToolbarButtonTextMedium' },
				formatKey: 'underline'
			},
			{
				type: 'toggle',
				title: 'Strikethrough',
				content: { class: 'fa fa-strikethrough EditorToolbarButtonTextMedium' },
				formatKey: 'strike'
			},
			{
				type: 'toggle',
				title: 'Inline-code',
				content: { class: 'fa fa-code EditorToolbarButtonTextMedium' },
				formatKey: 'code'
			},
			{
				type: 'toggle',
				title: 'Highlight',
				content: { class: 'fa fa-square-o EditorToolbarButtonTextMedium' },
				formatKey: 'background',
				formatValue: '#ffff00'
			},
			{ type: 'divider' },
			{
				type: 'define',
				title: 'Align Left',
				content: { class: 'fa fa-align-left EditorToolbarButtonTextMedium' },
				formatForceLine: true,
				formatKey: 'align',
				formatValue: ''
			},
			{
				type: 'define',
				title: 'Align Center',
				content: { class: 'fa fa-align-center EditorToolbarButtonTextMedium' },
				formatForceLine: true,
				formatKey: 'align',
				formatValue: 'center'
			},
			{
				type: 'define',
				title: 'Align Right',
				content: { class: 'fa fa-align-right EditorToolbarButtonTextMedium' },
				formatForceLine: true,
				formatKey: 'align',
				formatValue: 'right'
			},
			{ type: 'divider' },
			{
				type: 'switchNext',
				title: 'Indent',
				content: { class: 'fa fa-indent EditorToolbarButtonTextMedium' },
				formatKey: 'indent',
				formatValues: ['1', '2', '3', '4']
			},
			{ type: 'divider' },
			{
				type: 'toggle',
				title: 'List Ordered',
				content: { class: 'fa fa-list-ol EditorToolbarButtonTextMedium' },
				formatKey: 'list',
				formatValue: 'ordered',
				formatForceLine: true
			},
			{
				type: 'toggle',
				title: 'List Bullet',
				content: { class: 'fa fa-list-ul EditorToolbarButtonTextMedium' },
				formatKey: 'list',
				formatValue: 'bullet',
				formatForceLine: true
			},
			{ type: 'divider' },
			{
				type: 'toggle',
				title: 'Blockquote',
				content: { class: 'fa fa-quote-right EditorToolbarButtonTextMedium' },
				formatKey: 'blockquote',
				formatForceLine: true
			},
			{
				type: 'toggle',
				title: 'Block-code',
				content: { class: 'fa fa-file-code-o EditorToolbarButtonTextMedium' },
				formatKey: 'code-block',
				formatForceLine: true
			},
			{ type: 'divider' },
			{
				type: 'action',
				title: 'Link',
				content: { class: 'fa fa-link EditorToolbarButtonTextMedium' },
				formatKey: 'link'
			}
		]
	}
}
