'use strict';
var fs = require('fs');
var irc = require('irc');
var nconf = require('nconf');
var path = require('path');

nconf.argv()
.env()
.file({ file: 'config.json' })
.defaults({script_directory:'scripts'});

var client = new irc.Client(nconf.get('irc_server'), nconf.get('irc_nickname'), {

	userName: nconf.get('irc_username'),
	realName: nconf.get('irc_realname'),
	port: nconf.get('irc_server_port'),
	localAddress: nconf.get('localAddress'),
	debug: nconf.get('debug'),
	showErrors: nconf.get('show_errors'),
	autoRejoin: nconf.get('auto_rejoin'),
	autoConnect: nconf.get('auto_connect'),
	channels: nconf.get('irc_channels'),
	secure: nconf.get('secure'),
	floodProtection: nconf.get('flood_protection'),
	floodProtectionDelay: nconf.get('flood_protection_delay'),
	sasl: nconf.get('sasl'),
	password: nconf.get('irc_server_password'),
});

fs.readdir(nconf.get('script_directory'),function(err,files){
  files.forEach(fileName => {

    if(!/.+\.js$/.test(fileName))
      return;

    fs.stat(path.join(nconf.get('script_directory'),fileName),(err,fstat) => {
      if (!fstat.isDirectory()){
        var thisModule = require(path.resolve(path.join('.',nconf.get('script_directory'),fileName)));
        thisModule.main(client);
        console.log("found module "+fileName+(thisModule.description?(" ("+thisModule.description+")"):""));
      }
    });
  });
});

client.addListener('error', function(message) {
  console.log('error: ', message);
});