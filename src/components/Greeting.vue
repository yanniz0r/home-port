<template>
  <h1>
    <span class="hello">Hello, </span>
    <span class="name">{{ name || "Stranger" }}</span>
  </h1>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "Greeting",
  setup() {
    const store = useStore();
    const name = computed(() => store.state.settings.name);
    return {
      name
    };
  }
});
</script>

<style lang="scss" scoped>
.hello,
.name {
  font-size: 36px;
  color: #fff;
  text-shadow: 0 0 25px rgba(0, 0, 0, 0.75);
}
</style>
