<script setup>
  import { ref, watch } from 'vue'

  const drawer = ref(false)
  const group = ref(null)

  const items = ref([
    { title: 'Foo', value: 'foo' },
    { title: 'Bar', value: 'bar' },
    { title: 'Fizz', value: 'fizz' },
    { title: 'Buzz', value: 'buzz' },
    { title: 'Foo', value: 'foo' },
    { title: 'Bar', value: 'bar' },
    { title: 'Fizz', value: 'fizz' },
    { title: 'Buzz', value: 'buzz' },
    { title: 'Foo', value: 'foo' },
    { title: 'Bar', value: 'bar' },
    { title: 'Fizz', value: 'fizz' },
    { title: 'Buzz', value: 'buzz' },
    { title: 'Foo', value: 'foo' },
    { title: 'Bar', value: 'bar' },
    { title: 'Fizz', value: 'fizz' },
    { title: 'Buzz', value: 'buzz' },
  ])

  // Watch the 'group' variable and close the drawer when it changes
  watch(group, () => {
    drawer.value = false
  })
</script>
<template>
  <v-card style="flex-grow: 1;">
    <v-layout style="height: 100%;">
      <v-app-bar
        color="primary"
        prominent
      >
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" />

        <v-spacer />

        <LanguageSwitch
          class="lagnuage-select"
          flat
          hide-details
          prepend-inner-icon="mdi:language"
          single-line
          variant="plain"
          width="50px"
        />
        <v-btn>
          <v-icon>mdi:language</v-icon>
        </v-btn>
        <v-btn>
          <v-icon>mdi:bell</v-icon>
        </v-btn>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        temporary
      >
        <v-list
          :items="items"
        />
      </v-navigation-drawer>

      <v-main style="height: 100%;">
        <v-card-text>
          <router-view />
        </v-card-text>
      </v-main>
    </v-layout>
  </v-card>
</template>
