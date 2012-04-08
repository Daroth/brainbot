module.exports = (function() {
  var url = require('url');
  var parents = {};
  var _protocols = [ "http:", "https:", "ftp:" ];
  parents.getContext= function(message) {
    var parsed, context;
    var ret = [];
    var tags = [];
    var recipients = [];
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
      } else if (word.lastIndexOf('#') === 0) {
        tags.push(word.substring(1, word.length));
      } else if (word.lastIndexOf('@') === 0) {
        recipients.push(word.substring(1, word.length));
      }
    });

    ret.map(function(x) {
      x.tags = tags;
      x.recipients = recipients;
    });
    return ret;
  };
  return parents;
}());
