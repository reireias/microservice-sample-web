<template>
  <center>
    <v-progress-circular :size="70" :width="7" color="primary" indeterminate />
  </center>
</template>

<script>
export default {
  data() {
    return {
      user: null
    }
  },
  async mounted() {
    const res = await this.$axios.get('/api/auth/github/callback', {
      params: this.$route.query
    })
    const user = {
      _id: res.data.user._id,
      name: res.data.user.name,
      avatarUrl: res.data.user.avatarUrl
    }
    this.$store.commit('login', user)
    this.$router.push('/home')
  }
}
</script>
