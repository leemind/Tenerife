var keystone = require('keystone'),
	i18n = require('i18n');

exports = module.exports = function(req, res) {
	
	var reqLang = req._parsedUrl.query;
	
	// console.log(req);
	console.log("Server Side: lang.js");
	
	console.log("Server side res language pre button press is:",res.getLocale());
	console.log("Server side i18n language pre button press is:",i18n.getLocale());
	
	//i18n.setLocale(reqLang);
	// res.setLocale(reqLang);
	
	// Set the language in the middleware
	keystone.set('language',reqLang);
	
	console.log("Server side res language set now is:",res.getLocale());
	console.log("Server side i18n language set now is:",i18n.getLocale());

	
}

