'use strict';
var fs = require('fs');
var misp = require('npm-metainspector');

/* module built by sempiternum */
module.exports.description = "Catch metadata from linked URLs";

module.exports.main = function(client){
  client.addListener('message#', function(message) {
    console.log(message);
	
	
	
	
  });
};