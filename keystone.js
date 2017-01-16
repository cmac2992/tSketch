// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
const isProduction = process.env.NODE_ENV === 'production';
const dotenv = require('dotenv');

if (!isProduction) {
  dotenv.load();
}
// require('newrelic');
const _ = require('lodash');
// const throng = require('throng');
// const WORKERS = process.env.WEB_CONCURRENCY || 1;

// Require keystone
const keystone = require('keystone');

keystone.init({
  name: 'Draw Trump A Doodle',
  brand: 'Draw Trump A Doodle',

  // sass: 'public',
  static: 'public',
  // favicon: 'public/images/favicon.ico',
  // 'view engine': 'jade',
  // views: 'templates/views',
  'auto update': true,
  session: true,
  'session store': 'mongo',
  auth: true,

  'user model': 'User',

  // WYSIWYG Options
  // 'wysiwyg cloudinary images': true,
  // 'wysiwyg additional buttons': 'styleselect',
  // 'wysiwyg additional options': {
  //   browser_spellcheck: true,
  //   default_link_target: '_blank',
  //   media_strict: false,
  //   extended_valid_elements: 'script[charset|defer|language|src|type|async]',
  //   convert_urls: false,
  //   relative_urls: false,
  // },

  /*
   * Mongoose by default sets the auto_reconnect option to true.
   * We recommend setting socket options at both the server and replica set level.
   * We recommend a 30 second connection timeout because it allows for
   * plenty of time in most operating environments.
   */
  'mongo options': {
    config: {
      autoIndex: false,
    },
  },
});

// Load your project's Models
keystone.import('models');
// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
  _,
  env: keystone.get('env'),
  utils: keystone.utils,
  editable: keystone.content.editable,
});

// Load your project's Routes
keystone.set('routes', require('./routes'));

// Cloudinary Config Options
keystone.set('cloudinary folders', true);
keystone.set('cloudinary prefix', 'draw-trump-a-doodle');

// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
  users: 'users',
});

// Start Keystone to connect to your database and initialise the web server
keystone.start();
// throng({
//   workers: WORKERS,
//   lifetime: Infinity,
//   start: keystone.start.bind(keystone),
// });