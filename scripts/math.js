'use strict';
var mathjs = require('mathjs');

module.exports.description = "Calculate arithmetical expressions using math.js, try !calc command";

module.exports.main = function(client){
  client.addListener('message#', function(nick,to,text,message) {
    if(text.indexOf('!calc') === 0){
      if(text.toLowerCase().indexOf('the answer') !== -1 && text.indexOf('42') === -1){
        client.say(to,nick+": "+42);
        return;
      }
      var expr = text.replace('!calc','').trim();
      if(expr === ''){
        client.say(to,nick+": usage !calc <expression>, expressions are the ones accepted by math.js");
        return;
      }
      try{
        var result = mathjs.eval(expr);
        client.say(to,nick+": "+result);
      }
      catch(e){
        client.say(to,nick+": error - "+e); 
      }
    }
  });
};
