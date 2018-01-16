'use strict';

module.exports = {
  up(db, next) {
    const data = require('./data/users.json');
    db.createCollection("users", { autoIndexId: false }, () => {
      db.collection('users').createIndex( { username: 1 }, { unique: true } )
      db.collection('users').insert(data, next);
    });
  },
 
  down(db, next) {
    db.collection('users').remove({}, next);
  }
};