module.exports = (function() {
  var fs = require('fs');
  function ConfigManager(filepath) {
    this._filePath = filepath || 'config.json';
  }

  ConfigManager.prototype.get = function() {
    var ret = fs.readFileSync( this._filePath, 'utf-8' );
    return JSON.parse(ret);
  };
  return ConfigManager;
}());
