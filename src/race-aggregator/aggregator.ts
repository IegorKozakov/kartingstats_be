import { state } from "./state";
import { RaceState } from "../db/schema";

import notifayer from "../notifayer";

export async function aggregate(data: any) {
  const timeStamp = Date.now();
  let isUpdated = false;

  Object.entries(data).forEach(([teamNo, teamData]: [string, any]) => {
    const { isPit, teamName, stint, kart, position, lapTime, lapsAmount } =
      teamData;

    if (!(teamNo in state.teams)) {
      state.teams[teamNo] = {
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

    if (teamData.isPit !== state.teams[teamNo].isPit) {
      state.teams[teamNo].isPit = teamData.isPit;
      if (teamData.isPit) {
        state.pitlane.push({
          kart,
          teamName: state.teams[teamNo].teamName,
          averageLapTime: state.teams[teamNo].averageLapTime,
          bestStintTime: state.teams[teamNo].bestStintTime,
          stint: state.teams[teamNo].stint,
          parked: new Date(),
        });
      } else {
        state.teams[teamNo].bestStintTime = Infinity;
      }
      isUpdated = true;
    }

    if (teamData.lapsAmount !== state.teams[teamNo].lapsAmount) {
      state.teams[teamNo].lapsStat.push(lapTime);
      const lastLaps = state.teams[teamNo].lapsStat.slice(-6);
      const averageLapTime = Math.round(
        lastLaps.reduce((acc: number, val: number) => acc + val, 0) /
          lastLaps.length
      );

      state.teams[teamNo].averageLapTime = averageLapTime;
      state.teams[teamNo].lapsAmount = teamData.lapsAmount;
      state.teams[teamNo].lapsStat = lastLaps;

      if (
        teamData.lapTime < state.teams[teamNo].bestStintTime ||
        !state.teams[teamNo].bestStintTime
      ) {
        state.teams[teamNo].bestStintTime = teamData.lapTime;
      }

      isUpdated = true;
    }

    if (teamData.stint !== state.teams[teamNo].stint) {
      state.teams[teamNo].stint = teamData.stint;
      isUpdated = true;
    }
  });

  console.log(state.pitlane);

  if (isUpdated) {
    state.lastUpdatedTS = timeStamp;
    const raceState = new RaceState(state);
    await raceState.save();
    notifayer.emit("message", state);
  }
}
