<template>
  <v-flex xs10 offset-xs1>
    <v-container fluid grid-list-xs>
      <v-layout justify-start row wrap>
        <v-flex v-for="user in users" :key="user._id" class="users" xs6>
          <user :user="user" />
        </v-flex>
      </v-layout>
    </v-container>
  </v-flex>
</template>

<script>
import User from '~/components/User.vue'
export default {
  components: {
    User
  },
  data() {
    return {
      users: []
    }
  },
  async asyncData({ app }) {
    const res = await app.$axios.get('/api/users')
    return {
      users: res.data
    }
  }
}
</script>
