<template>
  <div
    class="wrapper"
    v-bind:style="{ backgroundColor: settings.backgroundColor }"
  >
    <div v-if="!edit">
      <Greeting />
      <Clock />
    </div>
    <div v-if="edit">
      <h1>Settings</h1>
      <Settings />
    </div>
  </div>
  <button @click="edit = !edit" class="action-button">
    {{ edit ? "Back" : "Edit" }}
  </button>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import Clock from "./components/Clock.vue";
import Greeting from "./components/Greeting.vue";
import Settings from "./components/Settings.vue";

export default defineComponent({
  name: "App",
  components: {
    Clock,
    Greeting,
    Settings
  },
  setup() {
    const store = useStore();

    const settings = computed(() => store.state.settings);
    const edit = ref(false);
    return {
      settings,
      edit
    };
  }
});
</script>

<style lang="scss">
body,
html {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.action-button {
  position: absolute;
  right: 12px;
  bottom: 12px;
}

.wrapper {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
