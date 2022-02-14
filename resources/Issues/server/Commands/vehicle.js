/// <reference types="@altv/types-server" />
import * as alt from "alt-server";
import * as chat from "../Webviews/chat";

export const command = {
  name: "Vehicle",
  aliases: ["veh", "vehicle"],
  description: "Used to spawn a player",
  usage: "",
  access: "Player",
  run(player, args) {
    try {
      // if (userCheck.rank(player, 0)) return;
      if (!args || args.length <= 0) {
        return chat.send(player, "/Vehicle {Model}");
      }

      const spawnVeh = new alt.Vehicle(
        args[0],
        player.pos.x,
        player.pos.y,
        player.pos.z,
        0,
        0,
        0
      );

      alt.emitClient(player, "player:Vehicle", spawnVeh);
    } catch (err) {
      if (err) {
        console.log("Something went wrong!");
      }
    }
  },
};
