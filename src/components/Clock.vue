<template>
  <div class="time-wrapper">
    <span class="hours">{{ hours }}</span>
    <span class="colon">&colon;</span>
    <span class="minutes">{{ minutes }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";

export default defineComponent({
  name: "Clock",
  setup() {
    const currentMinutes = () => {
      const now = new Date();
      const minutes = now.getMinutes();
      return minutes < 10 ? `0${minutes}` : minutes.toString();
    };

    const currentHours = () => {
      const now = new Date();
      const hours = now.getHours();
      return hours < 10 ? `0${hours}` : hours.toString();
    };

    const time = reactive({
      hours: currentHours(),
      minutes: currentMinutes()
    });

    onMounted(() => {
      setInterval(() => {
        time.hours = currentHours();
        time.minutes = currentMinutes();
      }, 1000);
    });

    return time;
  }
});
</script>

<style scoped lang="scss">
.time-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
}

.hours,
.minutes {
  font-size: 52px;
  font-weight: bold;
}
.colon {
  font-size: 36px;
  font-weight: bold;
}
</style>
