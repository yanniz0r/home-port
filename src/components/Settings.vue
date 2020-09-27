<template>
  <h2>Your data</h2>
  <label>
    Name:
    <input type="text" v-model="name" />
  </label>
  <h2>Visuals</h2>
  <label>
    Background:
    <input type="color" v-model="backgroundColor" />
  </label>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "Settings",
  setup() {
    const store = useStore();
    const name = ref(store.state.settings.name);
    const backgroundColor = ref(store.state.settings.backgroundColor);

    watchEffect(() => {
      store.commit("setSettings", {
        backgroundColor: backgroundColor.value,
        name: name.value
      });
    });

    return {
      name,
      backgroundColor
    };
  }
});
</script>

<style lang="scss" scoped>
.hello,
.name {
  font-size: 36px;
}
</style>
