// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv')().load();

// Require keystone
var keystone = require('keystone'),
	i18n = require('i18n');


// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
	
	'name': 'Tenerife',
	'brand': 'Tenerife',
	
	'less': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	
	'views': 'templates/views',
	'view engine': 'jade',
	
	'emails': 'templates/emails',
	
	'auto update': true,

	'google api key': process.env.GOOGLE_BROWSER_KEY,
    	
	'session': true,
	'auth': true,
	'user model': 'User',
	'cookie secret': 'hxhP/qk-`k)![OKMt#i4r=STu)"KS9E1#fx00?t{Ih#IlC`LXT*JkT={pflqDcl-',

	'locales': ['en', 'es']

});



// Load your project's Models

keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js

keystone.set('locals', {
	_: require('underscore'),
	env: keystone.get('env'),
	utils: keystone.utils,
	google_api_key: keystone.get('google api key'),
	editable: keystone.content.editable,
	language: 'en'
});

// Configure i18n

i18n.configure({
		locales: keystone.get('locales'),
		cookie: 'tenerife-paradise.holiday',
		directory: __dirname + '/locales'
});

// Load your project's Routes

keystone.set('routes', require('./routes'));

// Setup common locals for your emails. The following are required by Keystone's
// default email templates, you may remove them if you're using your own.

keystone.set('email locals', {
	logo_src: '/images/logo-email.gif',
	logo_width: 194,
	logo_height: 76,
	theme: {
		email_bg: '#f9f9f9',
		link_color: '#2697de',
		buttons: {
			color: '#fff',
			background_color: '#2697de',
			border_color: '#1a7cb7'
		}
	}
});

// Setup replacement rules for emails, to automate the handling of differences
// between development a production.

// Be sure to update this rule to include your site's actual domain, and add
// other rules your email templates require.

keystone.set('email rules', [{
	find: '/images/',
	replace: (keystone.get('env') == 'production') ? 'http://tenerife-paradise.holiday/images/' : 'http://localhost:8000/images/'
}, {
	find: '/keystone/',
	replace: (keystone.get('env') == 'production') ? 'http://tenerife-paradise.holiday/keystone/' : 'http://localhost:8000/keystone/'
}]);

// Load your project's email test routes

keystone.set('email tests', require('./routes/emails'));

// Configure the navigation bar in Keystone's Admin UI

keystone.set('nav', {
	'posts': ['posts', 'post-categories'],
	'galleries': 'galleries',
	'enquiries': 'enquiries',
	'users': 'users'
});

// Start Keystone to connect to your database and initialise the web server

keystone.start();
