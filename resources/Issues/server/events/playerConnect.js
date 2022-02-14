import * as alt from "alt-server";

import { defPlayer } from "../Configs/Spawn";

alt.on("playerConnect", (player) => {
  player.model = "mp_m_freemode_01";
  player.spawn(
    defPlayer.defSpawn.x,
    defPlayer.defSpawn.y,
    defPlayer.defSpawn.z,
    0
  );
  player.dimension = player.id;

  console.log(`Name: ${player.name} connected!.`);
  alt.emitClient(player, "connectionComplete");
});
