import { RaceState } from "../db/schema";

export const state: {
  lastUpdatedTS: number;
  teams: { [key: string]: any };
  pitlane: { [key: string]: any }[];
} = {
  lastUpdatedTS: Date.now(),
  teams: {},
  pitlane: [],
};

export async function initState() {
  const lastRecord = await RaceState.findOne().sort({ lastUpdatedTS: -1 });

  if (lastRecord) {
    state.lastUpdatedTS = lastRecord.lastUpdatedTS;
    state.teams = Object.fromEntries(lastRecord.teams);
    state.pitlane = lastRecord.pitlane;
  }
}
