'use strict';
var os = require('os');
var moment = require('moment')
module.exports.main = function(client){
  client.addListener('message', function(nick,to,text,message) {
    if(text === '!uptime'){
      client.say(to,"bot process started "+moment(new Date(new Date()-process.uptime()*1000)).fromNow()+", system booted "+moment(new Date(new Date()-os.uptime()*1000)).fromNow());
    }
  });
};
