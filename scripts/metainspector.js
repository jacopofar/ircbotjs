'use strict';

const MetaInspector = require('node-metainspector');

module.exports.description = "Show metadata from URLs in messages";

module.exports.main = function(irc_client){
  irc_client.addListener('message#', function(nick,to,text,message) {
    if(text.indexOf('http://') + text.indexOf('https://') !== -2){
      const urls = text.match(/http(s)?:\/\/[^ ]+/ig);
      console.log('seen ' + urls.length + ' urls');
      if(urls.length > 3) {
        //too many URLs, ignoring them
        return;
      }
      for(let u of urls){
        console.log('analyzing URL ' + u);
        let client = new MetaInspector(u, { timeout: 5000,
          limit: 1024*1024*1,
          headers: {
            'User-Agent': 'ircbotjs - Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:49.0) Gecko/20100101 Firefox/49.0'
          } });
          client.on("fetch", function(){
            console.log('fetched ' + u + ' -- ' + client);
            let shortDes = client.title;
            if (client.author) shortDes += ' by ' + client.author;
            if (client.description) shortDes += ' ' + client.description.substr(0,100) + '...';
            irc_client.say(to, shortDes + ' - ' + u + ' [otr]');
          });

          client.on("error", function(err){
            console.log('error: ', err)
            irc_client.say(to, err);
          });
          client.fetch();
        }
      }
    });
  };
