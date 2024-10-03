import { Server } from "socket.io";
import notifayer from "../notifayer";
import { state } from "../race-aggregator/state";

export function broadcastToClient(io: Server) {
  io.on("connection", (socket) => {
    socket.emit("message", state);
    console.info("client connected");
  });

  notifayer.on("message", (message) => {
    io.emit("message", message);
  });
}
