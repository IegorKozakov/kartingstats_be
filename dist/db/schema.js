"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RaceState = void 0;
const mongoose_1 = require("mongoose");
const raceStateSchema = new mongoose_1.Schema({
    lastUpdatedTS: {
        type: Number,
        required: true,
    },
    teams: {
        type: Map,
        of: mongoose_1.Schema.Types.Mixed, // Allows any type of value for the teams object
    },
    pitlane: [
        {
            type: Map,
            of: mongoose_1.Schema.Types.Mixed, // Allows any type of value for the pitlane array
        },
    ],
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields
// Create and export the Mongoose model
exports.RaceState = (0, mongoose_1.model)("RaceState", raceStateSchema);
//# sourceMappingURL=schema.js.map