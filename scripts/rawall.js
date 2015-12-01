
module.exports.main = function(client){
  client.addListener('raw', function(message) {
    console.log(message);
  });
};
