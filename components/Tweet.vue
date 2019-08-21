<template>
  <v-card>
    <v-layout row wrap>
      <v-btn icon>
        <v-avatar size="32px">
          <img :src="tweet.avatarUrl" />
        </v-avatar>
      </v-btn>
      <div>
        <span class="name">
          {{ tweet.name }}
        </span>
        <span class="created-at"> ・ {{ formatDate(tweet.createdAt) }} </span>
        <span class="content">
          {{ tweet.content }}
        </span>
      </div>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  props: {
    tweet: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleString('ja-JP')
    }
  }
}
</script>

<style>
.name {
  font-size: 16px;
  font-weight: bold;
}
.created-at {
  color: gray;
}
.content {
  margin: 0px;
  font-size: 16px;
  white-space: pre-line;
}
</style>
