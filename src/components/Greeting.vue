<template>
  <h1>
    <span class="hello">Hello, </span>
    <span class="name">{{ name || "Stranger" }}</span>
  </h1>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "Greeting",
  setup() {
    const store = useStore();
    return {
      name: store.state.settings.name
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
