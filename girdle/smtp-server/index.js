const SMTPServer = require("smtp-server").SMTPServer;

const server = new SMTPServer({
  onConnect(session, callback) {
    return callback();
  }
});

server.on("error", err => {
  console.log("Error %s", err.message);
});

server.listen(2525);


