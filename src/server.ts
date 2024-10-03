import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { DBConnect } from "./db";
import { startRaceAggregator } from "./race-aggregator";
import { broadcastToClient } from "./client/ws-broadcast";
import { initState } from "./race-aggregator/state";

export default async function initServer() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  broadcastToClient(io);

  await DBConnect();
  await initState();

  startRaceAggregator("wss://www.apex-timing.com:8533/");

  return httpServer;
}
