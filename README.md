# ircbotjs
IRC bot written in nodejs

Installation
===========

On Ubuntu/Debian, should work on other Linux distributions with small changes

1. install nodejs (`curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash - && sudo apt-get install -y nodejs`)
2. optionally, install libicu (`sudo apt-get install libicu-dev`). It's used to perform character set recogniton, if not installed will give a warning in the next step but overall the bot will work
3. install the dependencies with `npm install`
4. run with `npm start` or `node index.js` or forever/pm2 as you wish

Usage
=====

1. Setup config.json or use environment variables or command line flags to set up your connection
2. The bot will connect to IRC and load all of the .js files in the given scripts folder

Write a module
==============

Still to be fully defined, however all of the .js files in the *scripts* folder are loaded as node modules, so you have to write one and export the main function:

`module.exports = function(client){...}`

the client is the client object of node-IRC, see the doc for its usage: https://node-irc.readthedocs.org/en/latest/API.html#events
