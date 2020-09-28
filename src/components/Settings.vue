<template>
  <div class="settings__overlay">
    <div class="settings__wrapper">
      <div class="settings__row">
        <h2>Your data</h2>
      </div>
      <div class="settings__row">
        <div class="settings__row-key">
          <span>Name</span>
        </div>
        <div class="settings__row-value">
          <input class="settings__input" type="text" v-model="settings.name" />
        </div>
      </div>
      <div class="settings__row">
        <div class="settings__row-key">
          <span>Background Color</span>
        </div>
        <div class="settings__row-value">
          <input type="color" v-model="settings.backgroundColor" />
        </div>
      </div>
      <div class="settings__row">
        <div class="settings__row-key">
          <span>Background Image</span>
        </div>
        <div class="settings__row-value">
          <select v-model="settings.backgroundImageSource">
            <option value="none">None, keep it simple</option>
            <option v-bind:disabled="!unsplashEnabled" value="unsplash"
              >Unsplash
              <span v-if="!unsplashEnabled">
                (Add unsplash credentials for support ❤️)
              </span>
            </option>
          </select>
        </div>
      </div>
      <div
        class="settings__row"
        v-if="settings.backgroundImageSource === 'unsplash'"
      >
        <div class="settings__row-key">
          <span>Unsplash Topic</span>
        </div>
        <div class="settings__row-value">
          <input
            class="settings__input"
            v-bind:disabled="!unsplashEnabled"
            type="text"
            v-model="settings.backgroundImageUnsplashTopic"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watchEffect } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "Settings",
  setup() {
    const store = useStore();
    const settings = reactive(store.state.settings);

    watchEffect(() => {
      store.commit("setSettings", settings);
    });

    watchEffect(() => {
      switch (settings.backgroundImageSource) {
        case "unsplash":
          store.dispatch("setRandomUnsplashBackgroundImage");
          break;
        case "none":
          break;
      }
    });

    const unsplashEnabled =
      process.env.VUE_APP_UNSPLASH_ACCESS_KEY &&
      process.env.VUE_APP_UNSPLASH_SECRET_ACCESS_KEY;

    return {
      settings,
      unsplashEnabled
    };
  }
});
</script>

<style lang="scss" scoped>
.hello,
.name {
  font-size: 36px;
}

.settings__overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.5);
}

.settings__wrapper {
  max-width: 720px;
  margin: 0 auto;
}

.settings__row {
  $border: solid 1px rgba(0, 0, 0, 0.1);
  display: flex;
  padding: 16px;
  width: 100%;
  border-top: $border;

  &:last-of-type {
    border-bottom: $border;
  }
}

.settings__row-key {
  font-weight: bold;
}

.settings__row-value {
  flex-grow: 1;
  justify-content: flex-end;
  display: flex;
}

.settings__input {
  background: none;
  border: none;
  text-align: right;
  width: 100%;
}
</style>
