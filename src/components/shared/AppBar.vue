<script setup>

  const items = ref([
    'Home', 'Breadcrumbs',
  ])

</script>

<template>
  <div class="app-bar-wrapper">
    <div class="app-bar">
      <div>
        <v-breadcrumbs :items="items">
          <template #divider>
            <v-icon icon="mdi:dot" />
          </template>
        </v-breadcrumbs>
      </div>
      <div class="d-flex">
        <v-select
          :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
          label="Select"
        />

        <v-btn>
          <v-icon>mdi:bell</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-bar-wrapper {
  width: 100%;
  background-color: bisque;
  padding-inline: 1.5em;
  padding-block: 1.5em;
}
.app-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
  background-color: beige;
  border-radius: 1.5em;
}

.app-bar div{
    flex-grow: 1;
}
</style>
