<template>
  <div class="chatWrap">
    <div class="chatMsgs">
      <div v-for="msg in messages" :key="msg.index">
        <p
          class="outputMsg speech fadeOut"
          ref="output"
          v-bind:class="[msg.isSelf ? ' blue blue:before' : '']"
        >
          {{ msg.name + ": " + msg.msg }}
        </p>
      </div>
      <div ref="scrollToo" class="bounce"></div>
    </div>
    <div class="inputMsg">
      <input
        class="msgOutput"
        type="text"
        ref="inputMsg"
        v-model="message"
        v-show="showInput"
        @keyup.enter="sendMsg"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Chat",
  data() {
    return {
      message: "",
      messages: [],
      showInput: false,
    };
  },
  methods: {
    // v-bind:class="[isActive ? 'active' : 'inActive']"
    inputFocus() {
      this.$refs["inputMsg"].focus();
    },
    sendMsg() {
      alt.emit("chat:Message", this.message);
      console.log(`Step 1 - Emitted too Client: ${this.message}`);
      this.message = "";
    },
    getMsg(name, msg, sender) {
      const recievedMsg = {
        name,
        msg,
        isSelf: true,
      };
      if (name === sender) {
        this.$nextTick(() => {
          recievedMsg.isSelf = false;
        });
      }
      this.messages.push(recievedMsg);
      this.$refs["scrollToo"].scrollIntoView(false);
    },
    toggleInput(boolean) {
      this.showInput = boolean;
    },
  },
  mounted() {
    if ("alt" in window) {
      alt.on("chat:getMessage", this.getMsg);
      alt.on("chat:Focus", this.inputFocus);
      alt.on("chat:Open", this.toggleInput);
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chatWrap {
  position: absolute;
  top: 3vh;
  left: 1vw;
  width: 550px;
  height: 350px;
}
.chatMsgs {
  min-height: 350px;
  max-height: 350px;
  overflow: hidden;
  animation-duration: 300s; /* 5 minutes */
  animation-fill-mode: both;
}
.inputMsg > input {
  position: fixed;
  top: 28vh;
  left: 1vw;
  width: 15%;
  height: 35px;
  background-color: rgba(44, 44, 44, 0.719);
  border: none;
  color: white;
  outline: none;
  padding: none;
  font-size: 22px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 20px;
}
.outputMsg {
  position: relative;
  word-wrap: normal;
  max-width: max-content;
  border-radius: 5px;
  font-size: 20px;
  padding: 4px;
  padding-left: 10px;
  padding-right: 10px;
  margin: 6px;
  margin-bottom: 18px;
  background-color: rgba(14, 184, 14, 0.842);
  color: rgb(48, 48, 48);
  animation-duration: 300s; /* 5 minutes */
  animation-fill-mode: both;
}
.speech:before {
  content: "";
  width: 0px;
  height: 0px;
  position: absolute;
  border-left: 12px solid rgba(23, 199, 23, 0.623);
  border-right: 6px solid transparent;
  border-bottom: 10px solid transparent;
  left: 12px;
  bottom: -10px;
}
.bounce {
  height: 47px;
}
/* Set color classes here */
.blue {
  position: relative;
  width: max-content;
  border-radius: 5px;
  font-size: 20px;
  padding: 4px;
  padding-left: 10px;
  padding-right: 10px;
  margin: 6px;
  margin-bottom: 18px;
  background-color: rgba(44, 113, 216, 0.836);
}
.blue:before {
  content: "";
  width: 0px;
  height: 0px;
  position: absolute;
  border-left: 12px solid rgba(44, 113, 216, 0.836);
  border-right: 6px solid transparent;
  border-bottom: 10px solid transparent;
  left: 12px;
  bottom: -10px;
}
@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.fadeOut {
  animation-name: fadeOut;
}
</style>
