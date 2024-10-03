import createServer from "./server";
import config from "./config";

createServer().then((server) => {
  server.listen(config["port"]);
});
