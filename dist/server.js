"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = initServer;
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const db_1 = require("./db");
const race_aggregator_1 = require("./race-aggregator");
const ws_broadcast_1 = require("./client/ws-broadcast");
const state_1 = require("./race-aggregator/state");
const config_1 = __importDefault(require("./config"));
async function initServer() {
    const app = (0, express_1.default)();
    const httpServer = (0, http_1.createServer)(app);
    const io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: "*",
        },
    });
    (0, ws_broadcast_1.broadcastToClient)(io);
    await (0, db_1.DBConnect)();
    await (0, state_1.initState)();
    if (config_1.default["listen"]) {
        (0, race_aggregator_1.startRaceAggregator)(config_1.default["telemetry_url"]);
    }
    return httpServer;
}
//# sourceMappingURL=server.js.map