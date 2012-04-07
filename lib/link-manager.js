var url = require('url');

module.exports = (function() {
  var parents = [];
  var _protocols = [ "http:", "https:", "ftp:" ];
  parents.getContext= function(message) {
    var word, parsed, context, i;
    var ret = [];
    var tags = [];
    var text = message.text || '';
    var words = text.split(' ');

    words.forEach(function(word) {
      parsed = url.parse(word);
      if(_protocols.indexOf(parsed.protocol) != -1) {
        context = {
          nick: message.nick,
          to: message.to,
          text: message.text
        };
        context.url = word;
        ret.push(context);
      } else if (word.lastIndexOf('#') == 0) {
        tags.push(word);
      }
    });

    ret.map(function(x) {
      x.tags = tags;
    });
    return ret;
  };
  return parents;
}());
