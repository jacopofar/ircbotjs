'use strict';
var fs = require('fs');
var irc = require('irc');
var nconf = require('nconf');
var path = require('path');

nconf.argv()
.env()
.file({ file: 'config.json' })
.defaults({script_directory:'scripts'});

var client = new irc.Client(nconf.get('irc_server'), nconf.get('irc_username'), {
  channels: nconf.get('irc_channels'),
});

fs.readdir(nconf.get('script_directory'),function(err,files){
  files.forEach(fileName => {

    if(!/.+\.js$/.test(fileName))
      return;

    fs.stat(path.join(nconf.get('script_directory'),fileName),(err,fstat) => {
      if (!fstat.isDirectory()){
        var thisModule = require(path.resolve(path.join('.',nconf.get('script_directory'),fileName)));
        thisModule.main(client);
        console.log("running "+fileName);
      }
    });
  });
});

client.addListener('error', function(message) {
  console.log('error: ', message);
});
