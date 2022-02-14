/// <reference types="@altv/types-natives" />
/// <reference types="@altv/types-client" />

import alt from "alt-client";
import * as webview from "../../client/configs/webviews";

let opened = false;

webview.on("chat:Message", (msg) => {
  alt.emitServer("chat:Message", msg);
  console.log(`Step 2 - Emitted too server: ${msg}`);
});

export function pushMessage(name, msg) {
  const sender = alt.Player.local.name;
  webview.emit("chat:getMessage", name, msg, sender);
}

alt.onServer("chat:Message", pushMessage);

alt.on("keyup", (key) => {
  // Open Chat
  if (!opened && key === 74) {
    opened = true;
    webview.emit("chat:Open", true);
    webview.emit("chat:Focus");
    // Disable controls
    alt.toggleGameControls(false);
  }
  // Close chat
  if (opened && key === 9) {
    opened = false;
    webview.emit("chat:Open", false);
    // Enable controls
    alt.toggleGameControls(true);
  }
});

export default { pushMessage };
