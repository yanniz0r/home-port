<template>
  <h1>
    <span class="hello">{{ greeting }}, </span>
    <span class="name">{{ name || "Stranger" }}</span>
  </h1>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "Greeting",
  setup() {
    const store = useStore();
    const name = computed(() => store.state.settings.name);

    const getGreeting = () => {
      const now = new Date().getHours();
      if (now >= 6 && now < 11) {
        return "Good morning";
      } else if (now >= 11 && now < 13) {
        return "Hello";
      } else if (now >= 13 && now < 18) {
        return "Good afternoon";
      } else {
        return "Good night";
      }
    };

    const greeting = ref(getGreeting());

    onMounted(() => {
      setInterval(() => {
        greeting.value = getGreeting();
      }, 1000 * 60);
    });

    return {
      name,
      greeting
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
