"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = init;
const ws_1 = __importDefault(require("ws"));
async function init(address) {
    const ws = new ws_1.default(address, {
        perMessageDeflate: false,
    });
    await new Promise((resolve) => {
        ws.on("open", () => {
            resolve();
        });
    });
    return ws;
}
//# sourceMappingURL=apex_timing_listener.js.map