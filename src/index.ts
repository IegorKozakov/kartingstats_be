import createServer from "./server";

createServer().then((server) => {
  server.listen(1234);
});
