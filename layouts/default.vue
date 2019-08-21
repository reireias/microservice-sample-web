<template>
  <v-app>
    <v-tabs icons-and-text dark color="primary" slider-color="accent">
      <v-tab to="/home">
        Home
        <v-icon>home</v-icon>
      </v-tab>
      <v-tab to="/users">
        Users
        <v-icon>people</v-icon>
      </v-tab>
      <v-spacer />
      <avatar />
    </v-tabs>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Avatar from '~/components/Avatar.vue'
export default {
  components: {
    Avatar
  },
  data() {
    return {
      title: 'Microservice Sample'
    }
  }
}
</script>
