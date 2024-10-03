"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.aggregate = aggregate;
const state_1 = require("./state");
const schema_1 = require("../db/schema");
const notifayer_1 = __importDefault(require("../notifayer"));
async function aggregate(data) {
    const timeStamp = Date.now();
    let isUpdated = false;
    Object.entries(data).forEach(([teamNo, teamData]) => {
        const { isPit, teamName, stint, kart, position, lapTime, lapsAmount } = teamData;
        if (!(teamNo in state_1.state.teams)) {
            state_1.state.teams[teamNo] = {
                lapsStat: [],
                teamName,
                averageLapTime: lapTime,
                position,
                kart,
                lapsAmount,
                isPit,
                stint,
                bestStintTime: lapTime,
            };
        }
        if (teamData.lapsAmount !== state_1.state.teams[teamNo].lapsAmount) {
            state_1.state.teams[teamNo].lapsStat.push(lapTime);
            const lastLaps = state_1.state.teams[teamNo].lapsStat.slice(-6);
            const averageLapTime = Math.round(lastLaps.reduce((acc, val) => acc + val, 0) /
                lastLaps.length);
            state_1.state.teams[teamNo].averageLapTime = averageLapTime;
            state_1.state.teams[teamNo].lapsAmount = teamData.lapsAmount;
            state_1.state.teams[teamNo].lapsStat = lastLaps;
            if (teamData.lapTime < state_1.state.teams[teamNo].bestStintTime ||
                !state_1.state.teams[teamNo].bestStintTime) {
                state_1.state.teams[teamNo].bestStintTime = teamData.lapTime;
            }
            isUpdated = true;
        }
        if (teamData.isPit !== state_1.state.teams[teamNo].isPit) {
            state_1.state.teams[teamNo].isPit = teamData.isPit;
            if (teamData.isPit) {
                state_1.state.pitlane.push({
                    kart,
                    teamName: state_1.state.teams[teamNo].teamName,
                    averageLapTime: state_1.state.teams[teamNo].averageLapTime,
                    bestStintTime: state_1.state.teams[teamNo].bestStintTime,
                    stint: state_1.state.teams[teamNo].stint,
                    parked: new Date(),
                });
            }
            else {
                state_1.state.teams[teamNo].bestStintTime = Infinity;
            }
            isUpdated = true;
        }
        if (teamData.stint !== state_1.state.teams[teamNo].stint) {
            state_1.state.teams[teamNo].stint = teamData.stint;
            isUpdated = true;
        }
    });
    if (isUpdated) {
        state_1.state.lastUpdatedTS = timeStamp;
        const raceState = new schema_1.RaceState(state_1.state);
        await raceState.save();
        notifayer_1.default.emit("message", state_1.state);
    }
}
//# sourceMappingURL=aggregator.js.map