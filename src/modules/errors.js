module.exports = function () {
	
	return {
		CAUSES: {
			ELEMENT_ID_UNDEFINED: 'Please declare element id. For example: <div id="MyEditor"></div> and new Editor("MyEditor")',
			ELEMENT_TYPE_INVALID: 'Please declare element id wrong type. For example: For example: <div id="MyEditor"></div> and new Editor("MyEditor")',
			ELEMENT_NOT_DECLARED: 'Element not declared. Please check init method. For example: new Editor(elementId, options)'
		},

		print: function (errorCauses) {
			var message = '[Editor] ';
			if (!errorCauses || !this.CAUSES[errorCauses]) {
				message += 'UNKNOWN_ERROR'
			} else {
				message += this.CAUSES[errorCauses]
			}
			console.log(message);
		}
	}

}
