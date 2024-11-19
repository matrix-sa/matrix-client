<template>
  <v-main class="main">
    <VerticalNavMenu />
    <div class="container">
      <AppBar />
      <router-view class="router-container" />
    </div>
  </v-main>
</template>

<style scoped lang="scss">
.main {
  display: grid;
  grid-template-columns: minmax(0, 280px) minmax(0, 1fr);
  gap: 1.5rem;
}
.router-container{
  margin-inline: 1.5em;
  border-radius: 1.5em;
  padding-block-end: 2em;
}
</style>
