/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />

import * as alt from "alt-client";
import * as native from "natives";

alt.on("connectionComplete", () => {
  // Inititate Webviews
  alt.emit("webview:init");
  // Turn Map off
  native.displayRadar(false);
  // Turn default HUD off
  native.displayHud(false);
});
