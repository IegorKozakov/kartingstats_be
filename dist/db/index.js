"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBConnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connection.on("connected", () => console.log("MONGO connected"));
mongoose_1.default.connection.on("open", () => console.log("MONGO open"));
mongoose_1.default.connection.on("disconnected", () => console.log("MONGO disconnected"));
mongoose_1.default.connection.on("reconnected", () => console.log("MONGO reconnected"));
mongoose_1.default.connection.on("disconnecting", () => console.log("MONGO disconnecting"));
mongoose_1.default.connection.on("close", () => console.log("MONGO close"));
const DBConnect = async () => {
    try {
        await mongoose_1.default.connect("mongodb://root:password@localhost:27017");
    }
    catch (error) {
        console.error(error);
    }
};
exports.DBConnect = DBConnect;
//# sourceMappingURL=index.js.map