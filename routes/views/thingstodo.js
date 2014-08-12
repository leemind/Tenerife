var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var locals = res.locals,
		view = new keystone.View(req, res);
	
	// Set locals
	locals.section = 'thingstodo';
	
	// Render the view
	view.render('thingstodo');
	
}
