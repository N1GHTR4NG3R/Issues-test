/// <reference types="@altv/types-server">
import alt from "alt-server";

let cmdHandler = {};

function invokeCmd(player, cmd, args) {
  const callback = cmdHandler[cmd];
  if (callback) {
    callback.func(player, args);
  } else {
    send(player, `This is not a command: /${cmd}`);
  }
}

alt.onClient("chat:Message", (player, msg) => {
  console.log(`Step 3: Recieved from Client ${msg}`);
  if (msg[0] === "/") {
    msg = msg.trim().slice(1);

    if (msg.length > 0) {
      alt.log(`[Chat:CMD] ${player.name}: /${msg}`);
      let args = msg.split(" ");
      let cmd = args.shift();

      invokeCmd(player, cmd, args);
    }
  } else {
    msg = msg.trim();
    if (msg.length > 0) {
      alt.log(`[Chat:MSG] ${player.name}: ${msg}`);
      alt.emitClient(null, "chat:Message", player.name, msg);
    }
  }
});

export function send(player, msg) {
  alt.emitClient(player, "chat:Message", null, msg);
}

export function broadCast(msg) {
  send(null, msg);
}

export function registerCmd(cmd, callback, rank) {
  rank = 0;
  if (cmdHandler[cmd] !== undefined) {
    alt.logError(`Failed to register Command /${cmd}, already registered`);
  } else {
    cmdHandler[cmd] = { func: callback, rank };
  }
}
export default { send, broadCast, registerCmd };
