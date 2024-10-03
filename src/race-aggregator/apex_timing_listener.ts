import WebSocket from "ws";

export async function init(address: string): Promise<WebSocket> {
  const ws = new WebSocket(address, {
    perMessageDeflate: false,
  });

  await new Promise<void>((resolve): void => {
    ws.on("open", () => {
      resolve();
    });
  });

  return ws;
}
