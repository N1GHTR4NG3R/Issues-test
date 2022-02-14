import * as alt from "alt-client";

let CLI;
let CLIReady = 0;
let cursor = 0;
let onEvents = [];

// Create Vue Instance, focus and set cursor too true...
alt.on("webview:init", () => {
  /**
   * Use this when building:
   * http://resource/client/html/vue/index.html#/login
   * And this when developing
   * http://localhost:8080/#/login
   */
  CLI = new alt.WebView("http://localhost:8080/#/login");
  CLI.on("webview:initiated", () => {
    console.log("Webview initiated");
    setReady();
    focus();
    // alt.showCursor(true);
    // alt.toggleGameControls(false);
    alt.emit("webview:initiated");
  });
});

function setReady() {
  CLIReady = 1;
  CLI.focus();
  // Queue and loop events...
  onEvents.forEach((event) => {
    CLI.on(event.eventName, event.handler);
  });
  onEvents = [];
}

/**
 * Webview events
 * @param {String} eventName Event Name
 * @param {Handler} handler Parameter
 * @param {Array} parameters Parameter
 */

export function on(eventName, handler) {
  if (!CLIReady) {
    onEvents.push({ eventName, handler });
  } else {
    CLI.on(eventName, handler);
  }
}

export function emit(eventName, ...parameters) {
  if (CLIReady) {
    CLI.emit(eventName, ...parameters);
  }
}

alt.onServer("webview.emit", emit);

const emitServer = (method, ...parameters) => {
  alt.emitServer(method, ...parameters);
};

on("emit-server", emitServer);

/**
 * Change the current route of Vue Router
 * @param {string} newRoute Name of the new route
 * @param {Boolean} boolean newRoute Set focus to true or false
 */
export function setRoute(newRoute, boolean) {
  if (CLIReady) {
    CLI.emit("route:set", newRoute);
  }
  if (boolean) {
    focus();
  }
}
alt.onServer("webview.set-route", setRoute);

/**
 * Return the webview to /home (the default webview)
 */
export function close() {
  if (CLIReady) {
    console.log("closing the webview");
    CLI.emit("route:set", "Home");
    unfocus();
  }
}

/**
 * Focus the Vue CLI WebView
 */
export function focus() {
  if (CLIReady) {
    CLI.focus();
  }
}

/**
 * Unfocus the Vue CLI WebView
 */
export function unfocus() {
  if (CLIReady) {
    CLI.unfocus();
  }
}

/**
 * @param {Boolean} value True / False
 */
export function showCursor(value) {
  if (value) {
    cursor += 1;
    alt.showCursor(true);
    return;
  }

  for (let i = 0; i < cursor; i++) {
    try {
      alt.showCursor(false);
    } catch (e) {}
  }

  cursor = 0;
}

/**
 * Get the current state of the webview cursor (excluding all other cursors)
 * @return {Integer} Cursor state (0-1)
 */
export function getCursorState() {
  return cursor;
}
