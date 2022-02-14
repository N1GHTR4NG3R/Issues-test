<template>
  <div id="hud">
    <Chat />
  </div>
</template>

<script>
// @ is an alias to /src
import Chat from "@/components/chat.vue";

export default {
  name: "Hud",
  components: {
    Chat,
  },
  methods: {},
  mounted() {
    if ("alt" in window) {
      // alt.emit("webview:initiated");
    }
  },
};
</script>

<style>
#hud {
  width: 100%;
  height: 100%;
}
</style>
