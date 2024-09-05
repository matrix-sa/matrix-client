<template>
  <v-app>
    <v-main class="main">
      <VerticalNavMenu />
      <div class="container">
        <AppBar />
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
  //
</script>
<style scoped lang="scss">
.main{
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: flex-start;
  width: 100%;

}
.container{
  background-color: aqua;
  display: flex;
  flex-direction: column;
  align-self: stretch;
  flex-grow: 1;
}
</style>
