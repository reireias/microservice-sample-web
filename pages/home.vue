<template>
  <v-flex xs10 offset-xs1>
    <timeline ref="timeline" />
    <tweet-dialog @tweeted="tweeted" />
  </v-flex>
</template>

<script>
import Timeline from '~/components/Timeline.vue'
import TweetDialog from '~/components/TweetDialog.vue'
export default {
  components: {
    Timeline,
    TweetDialog
  },
  methods: {
    tweeted() {
      this.$refs.timeline.update()
    }
  }
}
</script>
