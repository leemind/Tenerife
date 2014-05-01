/**
 * This file contains the common middleware used by your routes.
 * 
 * Extend or replace these functions as your application requires.
 * 
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */

var _ = require('underscore'),
	querystring = require('querystring'),
	keystone = require('keystone')
	i18n = require('i18n');


/**
	Initialises the standard view locals
	
	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/


exports.initLocals = function(req, res, next) {
		
	var locals = res.locals;
	
	locals.navLinks = [
		{ label: i18n.__('home'),		key: 'home',		href: '/' },
		{ label: i18n.__('apartment'),	key: 'apartment',	href: '/apartment' },
		{ label: i18n.__('catering'),	key: 'catering',	href: '/catering' },
		{ label: i18n.__('book'),		key: 'book',		href: '/book' },
		{ label: i18n.__('area'),		key: 'local',		href: '/local' },
		{ label: i18n.__('blog'),		key: 'blog',		href: '/blog' },
		{ label: i18n.__('gallery'),	key: 'gallery',		href: '/gallery' },
		{ label: i18n.__('contact'),	key: 'contact',		href: '/contact' }
	];
    
	// set this so we can use it everywhere (in base jade template for example)
    locals.languages = keystone.get('locales');
	
	console.log(locals.languages," Language set is:",i18n.getLocale());
	
	i18n.setLocale(locals.language);
	
	locals.user = req.user;
	
	next();
	
};


/**
	Fetches and clears the flashMessages before a view is rendered
*/

exports.flashMessages = function(req, res, next) {
	
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error')
	};
	
	res.locals.messages = _.any(flashMessages, function(msgs) { return msgs.length }) ? flashMessages : false;
	
	next();
	
};


/**
	Prevents people from accessing protected pages when they're not signed in
 */

exports.requireUser = function(req, res, next) {
	
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
	
}
