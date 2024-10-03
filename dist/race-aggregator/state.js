"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.state = void 0;
exports.initState = initState;
const schema_1 = require("../db/schema");
exports.state = {
    lastUpdatedTS: Date.now(),
    teams: {},
    pitlane: [],
};
async function initState() {
    const lastRecord = await schema_1.RaceState.findOne().sort({ lastUpdatedTS: -1 });
    if (lastRecord) {
        exports.state.lastUpdatedTS = lastRecord.lastUpdatedTS;
        exports.state.teams = Object.fromEntries(lastRecord.teams);
        exports.state.pitlane = lastRecord.pitlane;
    }
}
//# sourceMappingURL=state.js.map