<script setup>
  defineProps({
    letter: {
      type: String,
      required: true,
    },
    width: {
      type: [String, Number],
      default: 40, // Default width
    },
    height: {
      type: [String, Number],
      default: 40, // Default height
    },
    bgColor: {
      type: String,
      default: 'primary', // Default to Vuetify's primary color
    },
  })
</script>
<template>
  <div
    class="user-img-letter"
    :style="{
      width: width + 'px',
      height: height + 'px',
      backgroundColor: bgColor === 'primary' ? 'rgb(var(--v-theme-primary))' : 'rgb(var(--v-theme-warning))'
    }"
  >
    <span>{{ letter }}</span>
  </div>
</template>

<style scoped lang="scss">
.user-img-letter {
    border-radius: 1rem;

    align-items: center;
    color: #FFF;
    font-size: 1.5em;
    font-weight: bolder;
    padding: 0;

    span {
        display: block;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        transform: translateY(-4px)
    }

}
</style>
