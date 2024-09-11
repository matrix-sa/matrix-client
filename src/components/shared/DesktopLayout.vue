<template>
  <v-main class="main">
    <VerticalNavMenu />
    <div class="container">
      <AppBar />
      <router-view />
    </div>
  </v-main>
</template>

<style scoped lang="scss">
.main {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: flex-start;
  width: 100%;
}
.container {
  display: flex;
  flex-direction: column;
  align-self: stretch;
  flex-grow: 1;
  padding-block-end: 2em;
}
</style>
