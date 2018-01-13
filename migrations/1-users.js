'use strict';

module.exports = {
  up(db, next) {
    const data = require('./data/users.json');
    db.collection('users').insert(data, next);
  },
 
  down(db, next) {
    db.collection('users').remove({}, next);
  }
};