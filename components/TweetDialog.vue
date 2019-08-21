<template>
  <v-fab-transition>
    <v-dialog v-model="dialog" max-width="600px">
      <v-btn slot="activator" fixed bottom right fab dark color="primary">
        <v-icon>edit</v-icon>
      </v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">
            Tweet
          </span>
        </v-card-title>
        <v-card-text>
          <v-textarea
            v-model="content"
            label="What's happening?"
            box
            autofocus
            @keyup.enter="tweetEnter"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn icon flat color="red" @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-btn icon flat color="green" @click="tweet">
            <v-icon>check</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-fab-transition>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      content: null
    }
  },
  methods: {
    async tweet() {
      this.dialog = false
      await this.$axios.post('/api/tweets', { content: this.content })
      this.content = null
      this.$emit('tweeted')
    },
    async tweetEnter(event) {
      if (event.ctrlKey) {
        await this.tweet()
      }
    }
  }
}
</script>

<style>
.v-card__title {
  padding: 8px;
}
.v-card__text {
  padding: 8px;
}
.v-card__actions {
  padding: 8px;
}
</style>
