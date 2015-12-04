'use strict';
var fs = require('fs');
var moment = require('moment');

//simple object having the user as a key and the ISO date of the last presence as a value
var lastSeen = {};

fs.readFile('seen_users.json', 'utf8', function(err, data) {
  if (err){
    console.error("ERROR LOADING SEEN USERS FILE: "+JSON.stringify(err)+" THIS IS NORMAL AT THE FIRST RUN");
    return;
  }
  try{
    lastSeen = JSON.parse(data);
    console.log("found "+Object.keys(lastSeen).length+" distinct users in presence file");
  } catch (e) {
    console.error("ERROR, THE seen_users.json file is not a valid JSON. It will be skipped and overwritten");
  }
});

module.exports.description = "Tells the last time a user was seen using !seen username";

module.exports.main = function(client){
  client.addListener('message#', function(nick,to,text,message) {
    //update the user last action date in any case
    lastSeen[nick] = new Date().toISOString();
    if(text === '!seen'){
      client.say(to,"usage !seen username");
      return;
    }
    if(text.indexOf('!seen') === 0){
      var searchUser = text.replace('!seen ','').trim();
      var lastDate = lastSeen[searchUser];
      if(!lastDate){
        client.say(to,'sorry, that user was not cool enough to visit this channel while this bot was running');
        return;
      }
      var span = moment(lastDate).fromNow(); 
      client.say(to,"the user "+searchUser+" was seen "+span);
      return;
    }
  });

  client.addListener('join',function(channel, nick, message){
    lastSeen[nick] = new Date().toISOString();
  });

  setInterval(() => {
    fs.writeFile('seen_users.json',JSON.stringify(lastSeen),err =>{
      if(err){
        console.log("ERROR WHILE WRITING SEEN USERS FILE:",err);
      }
    });

  },1000*60*2);
};
