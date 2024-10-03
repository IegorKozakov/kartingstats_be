"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.broadcastToClient = broadcastToClient;
const notifayer_1 = __importDefault(require("../notifayer"));
const state_1 = require("../race-aggregator/state");
function broadcastToClient(io) {
    io.on("connection", (socket) => {
        socket.emit("message", state_1.state);
        console.info("client connected");
    });
    notifayer_1.default.on("message", (message) => {
        io.emit("message", message);
    });
}
//# sourceMappingURL=ws-broadcast.js.map