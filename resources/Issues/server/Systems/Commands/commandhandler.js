/// <reference types="@altv/types-server" />

import * as chat from "../../webviews/chat";
import glob from "glob";

function getCmds() {
  return new Promise((resolve, reject) => {
    glob(
      "**/*.js",
      { cwd: "resources/Issues/server/Commands/" },
      (error, files) => {
        console.log("Command handler");
        if (error) reject(error);
        resolve(files);
      }
    );
  });
}

getCmds().then(async (files) => {
  for (const file of files) {
    console.log("Command Handler 2");
    const importedCommand = await import(`../../Commands/${file}`);
    const command = importedCommand.command;
    let rank;

    switch (command.access) {
      case "Player":
        rank = 0;
        break;
      case "Support":
        rank = 1;
        break;
      case "Moderator":
        rank = 2;
        break;
      case "Admin":
        rank = 3;
        break;
      case "Developer":
        rank = 4;
        break;
      case "Owner":
        rank = 5;
        break;
    }

    command.aliases.forEach((name) => {
      console.log("Command Handler 3:");
      // Name includes Aliase
      if (name) {
        chat.registerCmd(name, command.run, rank);
      }
    });
  }
});
