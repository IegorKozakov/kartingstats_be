import { parse } from "node-html-parser";

export function processMessage(data: any) {
  const message = data.toString();
  const items = message.split("\n");
  let result;

  if (data.includes("init|")) {
    result = processInitMessage(items);
  }

  return result;
}

function processInitMessage(message: string[]) {
  const grid = message.filter((item: any) => item.includes("grid|"));
  const table = grid[0].split("||")[1];

  if (!table) {
    console.error("Can not load table");
    return null;
  }
  const dom = parse(table);
  const rows = dom.querySelectorAll("tr:not(.head)");
  const initialData: { [key: string]: any } = {};

  if (!dom) {
    console.error("Invalid DOM table");
    return false;
  }

  const driverCellNumber = dom
    .querySelector("td[data-type='dr']")
    ?.getAttribute("data-id");
  const lastLapCellNumber = dom
    .querySelector("td[data-type='llp']")
    ?.getAttribute("data-id");
  const kartCellNumber = dom
    .querySelector("td[data-type='no']")
    ?.getAttribute("data-id");
  const rkCellNumber = dom
    .querySelector("td[data-type='rk']")
    ?.getAttribute("data-id");
  const onTrackNumber =
    dom.querySelector("td[data-type='otr']")?.getAttribute("data-id") ?? null;
  const teamLaps =
    dom.querySelector("td[data-type='tlp']")?.getAttribute("data-id") ?? null;

  rows.forEach((row) => {
    let dataId = row.getAttribute("data-id");
    let isPit =
      row.querySelector(`td[data-id="${dataId}c2"]`)?.getAttribute("class") ??
      "";
    let teamName =
      row.querySelector(`td[data-id="${dataId}${driverCellNumber}"]`)
        ?.textContent ?? "";
    let stint =
      row.querySelector(`td[data-id="${dataId}${onTrackNumber}"]`)
        ?.textContent ?? "0";
    let kart =
      row.querySelector(`div[data-id="${dataId}${kartCellNumber}"]`)
        ?.textContent ?? "";
    let position =
      row.querySelector(`p[data-id="${dataId}${rkCellNumber}"]`)?.textContent ??
      "";
    let lapTime =
      row.querySelector(`td[data-id="${dataId}${lastLapCellNumber}"]`)
        ?.textContent ?? "";
    let lapsAmount =
      row.querySelector(`td[data-id="${dataId}${teamLaps}"]`)?.textContent ??
      "";

    if (!kart) {
      console.error("Can not define kart number");
      return false;
    }

    if (kart == "69") {
      console.log(isPit && isPit == "si");
    }

    initialData[kart] = {
      isPit: isPit && isPit == "si",
      teamName,
      stint: convertToMSFromHours(stint),
      kart,
      position,
      lapTime: convertToMS(lapTime),
      lapsAmount,
    };
  });
  return initialData;
}

function convertToMS(time: string): number {
  if (time.length < 2) {
    return +time;
  }
  let convertedTime = 0;
  let splittedMilisec = time.split(".");
  let milliseconds = 0;
  if (splittedMilisec.length > 1) {
    milliseconds = parseInt(splittedMilisec[1]);
  }
  let splittedHM = splittedMilisec[0].split(":");
  if (splittedHM.length > 1) {
    convertedTime =
      parseInt(splittedHM[0]) * 60 * 1000 +
      parseInt(splittedHM[1]) * 1000 +
      milliseconds;
  } else {
    convertedTime = parseInt(splittedHM[0]) * 1000 + milliseconds;
  }

  return convertedTime;
}

function convertToMSFromHours(time: string) {
  if (time.length < 2) {
    return time;
  }
  let splittedMilisec = time.split(":");
  if (splittedMilisec.length < 2) {
    return time;
  }
  if (splittedMilisec[0] === "0") {
    return parseInt(splittedMilisec[1]) * 60000;
  }
  return (
    parseInt(splittedMilisec[0]) * 60 * 60000 +
    parseInt(splittedMilisec[1]) * 60000
  );
}
