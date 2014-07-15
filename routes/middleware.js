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
   
	console.log("Middleware.js res language set is:",res.getLocale());
    console.log("Middleware.js i18n language set is:",i18n.getLocale());
	console.log("Middleware.js keystone language",keystone.get('language'));

	
	if (keystone.get('language') != 'default')
		{
		locals.setLocale(keystone.get('language'));
		}
	
	// set this so we can use it everywhere (in base jade template for example)
    locals.languages = keystone.get('locales');
    
	// Create the nav links (using language)
	locals.navLinks = [
		{ label: res.__('home'),		key: 'home',		href: '/' },
		{ label: res.__('apartment'),	key: 'apartment',	href: '/apartment' },
//		{ label: res.__('catering'),	key: 'catering',	href: '/catering' },
		{ label: res.__('book'),		key: 'book',		href: '/book' },
		{ label: res.__('area'),		key: 'local',		href: '/local' },
        { label: res.__('services'),    key: 'services',    href: '/services' },
        { label: res.__('thingstodo'),  key: 'thingstodo',  href: '/thingstodo' },
//		{ label: res.__('blog'),		key: 'blog',		href: '/blog' },
		{ label: res.__('gallery'),	    key: 'gallery',		href: '/gallery' },
		{ label: res.__('contact'),	    key: 'contact',		href: '/contact' }
	];
    
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

/** Try and turn off caching when new lang is selected */
exports.nocache = function (req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
}
