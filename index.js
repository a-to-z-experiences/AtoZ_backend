require("dotenv").config(); // load .env variables

const server = require("./api/server.js");

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(
    `\n *** ✨ Ya server is running on localhost:${port} sis ✨ *** \n`
  );
});
