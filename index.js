const server = require("./app");
server.listen(process.env.PORT, message =>
  console.log(`app listening on post:${process.env.PORT}`)
);
