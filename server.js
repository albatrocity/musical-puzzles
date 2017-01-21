const keystone = require('keystone')

keystone.init({
  name: 'Musical Puzzles',

  less: 'public',
  static: ['public'],
  port: 3001,

  views: 'templates/views',
  'view engine': 'html',

  'auto update': true,
  mongo: 'mongodb://localhost/my-project',

  session: true,
  auth: true,
  'user model': 'User',
  'cookie secret': '(your secret here)',
})

require('./models')

keystone.set('routes', require('./routes'))

keystone.start()
