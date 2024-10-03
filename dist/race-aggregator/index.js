"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startRaceAggregator = startRaceAggregator;
const apex_timing_listener_1 = require("./apex_timing_listener");
const apex_message_processor_1 = require("./apex-message-processor");
const aggregator_1 = require("./aggregator");
async function startRaceAggregator(url) {
    setInterval(async () => {
        const data = await new Promise(async (resolve) => {
            const ws = await (0, apex_timing_listener_1.init)(url);
            ws.on("message", (event) => {
                const data = (0, apex_message_processor_1.processMessage)(event);
                ws.close();
                resolve(data);
            });
        });
        if (data) {
            (0, aggregator_1.aggregate)(data);
        }
    }, 2000);
}
//# sourceMappingURL=index.js.map