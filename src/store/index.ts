import Unsplash from 'unsplash-js';
import { createStore } from "vuex";

const storedSettingsString = localStorage.getItem("settings");
const storedSettings = storedSettingsString ? JSON.parse(storedSettingsString) : {};

const defaultSettings = {
  backgroundColor: '#fff',
}

const UNSPLASH_ACCESS_KEY = process.env.VUE_APP_UNSPLASH_ACCESS_KEY;
const UNSPLASH_SECRET_ACCESS_KEY = process.env.VUE_APP_UNSPLASH_SECRET_ACCESS_KEY;

const unsplash = UNSPLASH_ACCESS_KEY && UNSPLASH_SECRET_ACCESS_KEY && new Unsplash({
  accessKey: UNSPLASH_ACCESS_KEY,
  secret: UNSPLASH_SECRET_ACCESS_KEY,
})

export default createStore({
  state: {
    settings: {
      ...defaultSettings,
      ...storedSettings
    }
  },
  mutations: {
    setSettings(state, settings) {
      const newSettings = {
        ...state.settings,
        ...settings,
      };
      state.settings = newSettings;
      localStorage.setItem("settings", JSON.stringify(newSettings));
    },
  },
  actions: {
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
      const selectedImageUrl = images[Math.floor(Math.random() * images.length)].urls.full;
      store.commit('setSettings', {backgroundImageUrl: selectedImageUrl});
    }
  },
  modules: {}
});
