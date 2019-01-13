<template>
  <div class="ui stackable two column centered vertically padded grid container">
    <div class="column">
      <a class="ui button mini primary" @click="back">Back</a>
      <div class="ui feed">
        <div class="event">
          <div class="label">
            <img src="https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm">
          </div>
          <div class="content">
            <div class="summary">
              <router-link :to="`/${post.user.username}`">
                {{ post.user.name }}
                <small>{{ `@${post.user.username}` }}</small>
              </router-link>
            </div>
            <div class="extra text">
              {{ post.post }}
            </div>

          </div>
        </div>
      </div>
      <div class="ui divider"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SinglePost',
  data() {
    return {
      post: ''
    }
  },
  created() {
    this.fetchPost()
  },
  methods: {
    fetchPost() {
      axios.get(`/posts/${this.$route.params.id}`).then(response => {
        this.post = response.data.data
      })
    },
    back() {
      this.$router.go(-1)
    }
  }
}
</script>