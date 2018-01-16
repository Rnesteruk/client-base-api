'use strict';

module.exports = {
  up(db, next) {
    const data = require('./data/clients.json');
    const clients = "clients";
    const ident = "identitycounters";
    // create identitycounters for auto increment id field
    db.createCollection(ident, () => {
      db.collection(ident).insert({
        model: "Client",
        field: "id",
        count: data.length - 1
      });
    });
    // create clients example base
    db.createCollection(clients, { autoIndexId: false }, () => {
      db.collection(clients).createIndex( { id: 1 }, { unique: true } )
      db.collection(clients).insert(data, next);
    });
  },
 
  down(db, next) {
    db.collection('clients').remove({}, next);
  }
};