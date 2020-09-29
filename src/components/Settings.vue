<template>
  <div class="settings__overlay">
    <div class="settings__top-right-actions">
      <button class="settings__close-button" @click="close">
        <X-Icon />
      </button>
    </div>
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
            <option :disabled="!unsplashEnabled" value="unsplash"
              >Unsplash
              <span v-if="!unsplashEnabled">
                (Add unsplash credentials for support ❤️)
              </span>
            </option>
          </select>
        </div>
      </div>
      <div
        class="settings__row settings__sub-row"
        v-if="settings.backgroundImageSource === 'unsplash'"
      >
        <div class="settings__row-key">
          <span>Unsplash Secret Access Key</span>
        </div>
        <div class="settings__row-value">
          <input
            class="settings__input"
            :disabled="!unsplashEnabled"
            type="text"
            v-model="settings.unsplashSecretAccessKey"
          />
        </div>
      </div>
      <div
        class="settings__row settings__sub-row"
        v-if="settings.backgroundImageSource === 'unsplash'"
      >
        <div class="settings__row-key">
          <span>Unsplash Access Key ID</span>
        </div>
        <div class="settings__row-value">
          <input
            class="settings__input"
            :disabled="!unsplashEnabled"
            type="text"
            v-model="settings.unsplashAccessKeyID"
          />
        </div>
      </div>
      <div
        class="settings__row settings__sub-row"
        v-if="settings.backgroundImageSource === 'unsplash'"
      >
        <div class="settings__row-key">
          <span>Unsplash Topic</span>
        </div>
        <div class="settings__row-value">
          <input
            class="settings__input"
            :disabled="!unsplashEnabled"
            type="text"
            v-model="settings.backgroundImageUnsplashTopic"
          />
        </div>
      </div>
      <div
        class="settings__row settings__sub-row"
        v-if="settings.backgroundImageSource === 'unsplash'"
      >
        <div class="settings__row-key">
          <span>Image size</span>
        </div>
        <div class="settings__row-value">
          <select v-model="settings.backgroundImageUnsplashSize">
            <option value="raw">raw (pretty big)</option>
            <option value="full">full</option>
            <option value="regular">regular</option>
            <option value="thumb">smol</option>
          </select>
        </div>
      </div>
      <div
        class="settings__row settings__sub-row"
        v-if="settings.backgroundImageSource === 'unsplash'"
      >
        <div class="settings__row-key">
          <span>Fetch a new image</span>
        </div>
        <div class="settings__row-value">
          <button v-on:click="getRandomUnsplashImage">Refresh</button>
        </div>
      </div>
      <div class="settings__row">
        <div class="settings__row-key">
          <span>Reset App</span>
        </div>
        <div class="settings__row-value">
          <button v-on:click="reset">Reset</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from "vue";
import { useStore } from "vuex";

import { State } from "@/store";

import XIcon from "./icons/X-Icon.vue";

export default defineComponent({
  name: "Settings",
  props: {
    onClose: {
      type: Function
    }
  },
  components: {
    "X-Icon": XIcon
  },
  setup(props) {
    const store = useStore<State>();
    const settings = reactive({ ...store.state.settings });
    const canSave = ref(false);

    watch(
      () => settings,
      () => {
        canSave.value = true;
      }
    );

    const getRandomUnsplashImage = () => {
      store.dispatch("setRandomUnsplashBackgroundImage");
    };

    const saveData = () => {
      store.dispatch("updateSettings", settings).then(() => {
        if (
          settings.backgroundImageSource === "unsplash" &&
          !settings.backgroundImageUrl
        ) {
          getRandomUnsplashImage();
        }
      });
    };

    const close = () => {
      props.onClose?.();
      saveData();
    };

    const unsplashEnabled =
      process.env.VUE_APP_UNSPLASH_ACCESS_KEY &&
      process.env.VUE_APP_UNSPLASH_SECRET_ACCESS_KEY;

    const reset = () => {
      store.dispatch("reset");
    };

    return {
      settings,
      unsplashEnabled,
      getRandomUnsplashImage,
      reset,
      canSave,
      close,
      saveData
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
  background-color: rgba(255, 255, 255, 0.75);
}

.settings__wrapper {
  max-width: 720px;
  margin: 0 auto;
}

.settings__row {
  box-sizing: border-box;
  $border: solid 1px rgba(0, 0, 0, 0.1);
  display: flex;
  padding: 16px;
  width: 100%;
  border-top: $border;

  &:last-of-type {
    border-bottom: $border;
  }
}

.settings__sub-row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 32px;

  .settings__row-key {
    font-weight: normal;
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

.settings__close-button {
  height: 32px;
  width: 32px;
  padding: 0;
  margin: 0;
  border: none;
  background: none;

  svg {
    max-width: 100%;
    max-height: 100%;
  }
}

.settings__top-right-actions {
  position: absolute;
  right: 16px;
  top: 16px;
  padding: 0;
}
</style>
