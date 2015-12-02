
module.exports.description = "Print to the standard output any raw message from the server";

module.exports.main = function(client){
  client.addListener('raw', function(message) {
    console.log(message);
  });
};
