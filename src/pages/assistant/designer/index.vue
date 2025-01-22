<script setup>
  import soonIcon from '@images/svg/soon.svg'

</script>
<template>
  <v-container class="d-flex flex-column align-center justify-center pa-15">
    <v-img
      alt="coming-soon"
      height="218"
      :src="soonIcon"
      width="256"
    />
    <span class="mt-12 ">
      {{ $t("soon") }}
    </span>
  </v-container>
</template>
<style lang='scss' scoped>
   span {
       font-size: 24px;
        font-weight: 500;
    }
</style>
