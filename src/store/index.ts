import { createStore } from "vuex";

const storedSettingsString = localStorage.getItem("settings");
const storedSettings = storedSettingsString ? JSON.parse(storedSettingsString) : {};

const defaultSettings = {
  backgroundColor: '#fff',
}

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
    }
  },
  actions: {},
  modules: {}
});
