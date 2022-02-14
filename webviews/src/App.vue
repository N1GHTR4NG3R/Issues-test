<template>
  <div id="app">
    <router-view />
    <img alt="Countylines logo" src="@/assets/Images/logo.png" class="logo" />
  </div>
</template>

<script>
export default {
  components: {},
  mounted() {
    if (!("alt" in window)) {
      return;
    } else {
      alt.emit("webview:initiated");
    }
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Nunito:ital@1&display=swap");

* {
  font-family: "Nunito", sans-serif;
  color: rgba(233, 233, 233, 0.897);
  user-select: none;
}
html,
body {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
}
#app {
  width: 100%;
  height: 100%;
  text-align: center;
}

.logo {
  width: 6vw;
  height: 10vh;
  position: absolute;
  bottom: 4vh;
  right: 1.5vw;
}
</style>
