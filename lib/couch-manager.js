module.exports = (function() {
  var couchdb = require('felix-couchdb');

  function CouchManager(db, port, host) {
    this._db = db;
    this._port = port || 5984;
    this._host = host || 'localhost';

    this._client = couchdb.createClient(this._port, this._host);
    this._db = this._client.db(this._db);
  }


  CouchManager.prototype.add = function(data) {
    this._db.saveDoc(data);
  };

  return CouchManager;
}());
