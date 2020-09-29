import Unsplash from 'unsplash-js';
import { createLogger, createStore } from "vuex";

const storedSettingsString = localStorage.getItem("settings");
const storedSettings = storedSettingsString ? JSON.parse(storedSettingsString) : {};

export interface State {
  settings: {
    backgroundColor: string;
    backgroundImageSource: string;
    backgroundImageUrl?: string;
    backgroundImageUnsplashSize?: string;
    backgroundImageUnsplashTopic?: string;
    name?: string;
  }
}

const defaultSettings = {
  backgroundColor: '#FFFFFF',
}

const UNSPLASH_ACCESS_KEY = process.env.VUE_APP_UNSPLASH_ACCESS_KEY;
const UNSPLASH_SECRET_ACCESS_KEY = process.env.VUE_APP_UNSPLASH_SECRET_ACCESS_KEY;

const unsplash = UNSPLASH_ACCESS_KEY && UNSPLASH_SECRET_ACCESS_KEY && new Unsplash({
  accessKey: UNSPLASH_ACCESS_KEY,
  secret: UNSPLASH_SECRET_ACCESS_KEY,
})


const store = createStore<State>({
  state: {
    settings: {
      ...defaultSettings,
      ...storedSettings
    }
  },
  mutations: {
    setSettings(state, settings) {
      state.settings = settings;
      localStorage.setItem("settings", JSON.stringify(settings));
    },
  },
  actions: {
    updateSettings(store, settings) {
      store.commit('setSettings', {
        ...store.state.settings,
        ...settings
      });
    },
    async setRandomUnsplashBackgroundImage(store) {
      const topic = store.state.settings.backgroundImageUnsplashTopic;
      if (!topic) {
        console.warn("🚨 No topic for unsplash set! Please tell us what you want to see.");
        return;
      }
      if (!unsplash) {
        console.warn("🚨 No credentials for unsplash set! Make sure you provide them.");
        return;
      }
      const result = await unsplash.search.photos(topic, 0);
      const resultJson = await result.json();
      const images: any[] = resultJson.results;
      if (!images.length) {
        console.warn(`🚨 "${topic}" seems to be something noone makes photos of... Maybe try something else. I heard "cats" always works.`);
      }
      const selectedImageUrl = images[Math.floor(Math.random() * images.length)].urls[store.state.settings.backgroundImageUnsplashSize || 'regular'];
      console.info("Got a beautiful new background image from unsplash:", selectedImageUrl);
      store.commit('setSettings', { ...store.state.settings, backgroundImageUrl: selectedImageUrl });
    },
    reset(store) {
      localStorage.removeItem("settings");
      store.commit('setSettings', defaultSettings)
    }
  },
  modules: {},
  plugins: [
    createLogger()
  ]
});

export default store;
