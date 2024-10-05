import { initState } from "./state";
import { init } from "./apex_timing_listener";
import { processMessage } from "./apex-message-processor";
import { aggregate } from "./aggregator";

export async function startRaceAggregator(url: string) {
  setInterval(async () => {
    const data = await new Promise<any>(async (resolve) => {
      console.log("init aggregator");
      const ws = await init(url);

      ws.on("message", (event) => {
        const data = processMessage(event);
        ws.close();
        resolve(data);
      });
    });

    if (data) {
      aggregate(data);
    }
  }, 2000);
}
