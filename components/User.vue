<template>
  <v-card>
    <v-btn icon>
      <v-avatar size="32px">
        <img :src="user.avatarUrl" />
      </v-avatar>
    </v-btn>
    <span class="name">
      {{ user.name }}
    </span>
    <v-card-actions>
      <v-spacer />
      <v-btn v-if="user.follow" color="red" outline @click="unfollow(user)">
        unfollow
      </v-btn>
      <v-btn v-else color="primary" outline @click="follow(user)">
        follow
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  methods: {
    async follow(user) {
      const res = await this.$axios.post('/api/follow', { _id: user._id })
      if (res.status === 200) {
        user.follow = true
      }
    },
    async unfollow(user) {
      const res = await this.$axios.delete('/api/follow', {
        params: { _id: user._id }
      })
      if (res.status === 200) {
        user.follow = false
      }
    }
  }
}
</script>

<style>
.name {
  font-size: 16px;
  font-weight: bold;
}
</style>
