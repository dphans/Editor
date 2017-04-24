module.exports = {
	debug: true,
	overrideOptions: {
		modules: {
			syntax: true
		}
	},
	defaultOptions: {
		editorToolbarItems: [
			{
				type: 'button',
				title: 'Section',
				content: {
					class: 'fa fa-header EditorToolbarButtonTextMedium'
				},
				formatKey: 'header',
				formatValue: '',
				formatValues: ['1', '2', '3'],
				formatDirection: 'prev'
			},
			{
				type: 'divider'
			},
			{
				type: 'button',
				title: 'Bold',
				content: {
					class: 'fa fa-bold EditorToolbarButtonTextMedium'
				},
				formatKey: 'bold',
				formatValue: 'toggle',
				formatValues: [],
				formatDirection: 'none'
			},
			{
				type: 'button',
				title: 'Italic',
				content: {
					class: 'fa fa-italic EditorToolbarButtonTextMedium'
				},
				formatKey: 'italic',
				formatValue: 'toggle',
				formatValues: '',
				formatDirection: 'none'
			},
			{
				type: 'button',
				title: 'Underline',
				content: {
					class: 'fa fa-underline EditorToolbarButtonTextMedium'
				},
				formatKey: 'underline',
				formatValue: 'toggle',
				formatValues: [],
				formatDirection: 'none'
			},
			{
				type: 'button',
				title: 'Strikethrough',
				content: {
					class: 'fa fa-strikethrough EditorToolbarButtonTextMedium'
				},
				formatKey: 'strike',
				formatValue: 'toggle',
				formatValues: [],
				formatDirection: 'none'
			},
			{
				type: 'button',
				title: 'Inline-code',
				content: {
					class: 'fa fa-code EditorToolbarButtonTextMedium'
				},
				formatKey: 'code',
				formatValue: 'toggle',
				formatValues: [],
				formatDirection: 'none'
			},
			{
				type: 'button',
				title: 'Highlight',
				content: {
					class: 'fa fa-square-o EditorToolbarButtonTextMedium'
				},
				formatKey: 'background',
				formatValue: '#ffff00',
				formatValues: [],
				formatDirection: 'none'
			},
			{
				type: 'divider'
			},
			{
				type: 'button',
				title: 'Align Left',
				content: {
					class: 'fa fa-align-left EditorToolbarButtonTextMedium'
				},
				formatForceLine: true,
				formatKey: 'align',
				formatValue: '',
				formatValues: [],
				formatDirection: 'none'
			},
			{
				type: 'button',
				title: 'Align Center',
				content: {
					class: 'fa fa-align-center EditorToolbarButtonTextMedium'
				},
				formatForceLine: true,
				formatKey: 'align',
				formatValue: 'center',
				formatValues: [],
				formatDirection: 'none'
			},
			{
				type: 'button',
				title: 'Align Right',
				content: {
					class: 'fa fa-align-right EditorToolbarButtonTextMedium'
				},
				formatForceLine: true,
				formatKey: 'align',
				formatValue: 'right',
				formatValues: [],
				formatDirection: 'none'
			},
			{
				type: 'divider'
			},
			{
				type: 'button',
				title: 'Indent',
				content: {
					class: 'fa fa-indent EditorToolbarButtonTextMedium'
				},
				formatKey: 'indent',
				formatValue: '',
				formatValues: ['1', '2', '3', '4'],
				formatDirection: 'next'
			},
			{
				type: 'divider'
			},
			{
				type: 'button',
				title: 'List Ordered',
				content: {
					class: 'fa fa-list-ol EditorToolbarButtonTextMedium'
				},
				formatKey: 'list',
				formatValue: 'ordered',
				formatValues: '',
				formatDirection: 'none'
			},
			{
				type: 'button',
				title: 'List Bullet',
				content: {
					class: 'fa fa-list-ul EditorToolbarButtonTextMedium'
				},
				formatKey: 'list',
				formatValue: 'bullet',
				formatValues: '',
				formatDirection: 'none'
			},
			{
				type: 'divider'
			},
			{
				type: 'button',
				title: 'Blockquote',
				content: {
					class: 'fa fa-quote-right EditorToolbarButtonTextMedium'
				},
				formatKey: 'blockquote',
				formatValue: 'toggle',
				formatForceLine: true,
				formatValues: '',
				formatDirection: 'none'
			},
			{
				type: 'button',
				title: 'Block-code',
				content: {
					class: 'fa fa fa-file-code-o EditorToolbarButtonTextMedium'
				},
				formatKey: 'code-block',
				formatValue: 'toggle',
				formatForceLine: true,
				formatValues: '',
				formatDirection: 'none'
			}
		]
	}
}
