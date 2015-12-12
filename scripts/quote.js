'use strict';
var fs = require('fs');
var levenshtein = require('levenshtein');

var quotearray = [];
fs.readFile('quotes.txt', 'utf8', function(err, data) {
    if (err){
      console.error("ERROR LOADING QUOTE FILE: "+JSON.stringify(err));
      return;
    }
    quotearray = data.split('\n');
    console.log("found "+quotearray.length+" quotes");
});

module.exports.description = "Store and retrieve quotes, use !quote and !addquote";

module.exports.main = function(client){
  client.addListener('message#', function(nick,to,text,message) {
    if(text === '!quote'){
      if(quotearray.length === 0){
        client.say(to,"no quotes found, you can add new ones using !addquote");
        return;
      }

      var ind = Math.floor(Math.random()*quotearray.length);
      client.say(to,quotearray[ind]);
      console.log("requested a random quote by "+nick+", picked number "+ind+" which is "+quotearray[ind]);
      return;
    }

    if(text.indexOf('!quote') === 0){
      var searchKey = text.replace('!quote ','').toLowerCase().replace(/\*/g,'');
      var filtered = quotearray.filter(q => q.toLowerCase().replace(/\*/g,'').indexOf(searchKey) !== -1);
      if(filtered.length === 0){
        client.say(to,"no quotes found with the given key, "+searchKey);
        return;
      }

      var ind = Math.floor(Math.random()*filtered.length);
      client.say(to,filtered[ind]);
      console.log("requested a random filtered quote by "+nick+", for "+searchKey+"  picked number "+ind+" which is "+filtered[ind]);
      return;
    }


    if(text.indexOf('!addquote') === 0){
      var thisQuote = text.replace('!addquote ','').trim();
      if(thisQuote.length < 5){
          client.say(to,nick+", I don't think that's a real quote");
          return;
      }
      var tooSimilar = quotearray.filter(q => {
          return (new levenshtein(q,thisQuote).distance) < (thisQuote.length/3);
      });
      if (tooSimilar.length > 0){
          client.say(to,nick+", sorry, that quote was too similar to this existing one: "+tooSimilar[0]);
          return;
      }
      quotearray.push(thisQuote);
      fs.appendFile('quotes.txt', thisQuote+'\n', function (err) {
        if(err){
          client.say(to,"sorry, internal error saving the quote :(");
          console.error(err);
          return;
        }
        client.say(to,"succesfully added the quote number "+quotearray.length);
        return;
      });
    }
  });
};
