<template>
  <div>
    <Settings v-if="edit" :onClose="() => (edit = false)" />
    <div
      class="wrapper"
      v-bind:class="{
        'wrapper--blur': edit
      }"
      v-bind:style="{
        backgroundColor: settings.backgroundColor,
        backgroundImage:
          settings.backgroundImageUrl && `url(${settings.backgroundImageUrl})`
      }"
    >
      <div>
        {{ settings }}
        <Greeting />
        <Clock />
      </div>
    </div>
  </div>
  <button @click="edit = !edit" class="action-button">
    <CogIcon />
  </button>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import Clock from "./components/Clock.vue";
import Greeting from "./components/Greeting.vue";
import Settings from "./components/Settings.vue";
import CogIcon from "./components/icons/Cog-Icon.vue";

export default defineComponent({
  name: "App",
  components: {
    Clock,
    Greeting,
    Settings,
    CogIcon
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
  right: 16px;
  bottom: 16px;
  padding: 0;
  border: none;
  background: none;
  width: 32px;
  height: 32px;

  transition: transform 0.25s;

  &:hover {
    transform: scale(1.2);
  }

  svg {
    max-width: 100%;
    max-height: 100%;
  }
}

.wrapper {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-size: cover;
  background-position: center;
}

.wrapper--blur {
  filter: blur(10px);
}
</style>
