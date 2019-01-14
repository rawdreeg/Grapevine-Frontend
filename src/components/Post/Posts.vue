<template>
  <div class="ui feed" v-if="posts.length > 0">
    <Post
        v-for="post in posts"
        :key="post.id"
        :post="post"
        :auth-user="authUser"
        :replies="post.replies"
         v-on:delete="removeDeletedPost"
    />
  </div>
  <div class="ui feed" v-else>
    <p> No posts on your timeline. Follow some people, invite friends :)</p>
  </div>
</template>

<script>
import Post from '@/components/Post/Post'
import EventBus from '@/eventBus'

export default {
  name: 'Posts',
  components: {
    Post
  },

  created () {
    // listen for event fired
    EventBus.$on('postAdded', this.fetchAddedPost)
  },
  methods: {
    fetchAddedPost (post) {
      // add post to top of posts
      this.posts.unshift(post)
    },
    removeDeletedPost (postId) {
      const filteredPosts = this.posts.filter(post => {
        return post.id !== postId
      })

      this.$emit('update:posts', filteredPosts)
    }
  },
  props: {
    posts: {
      type: Array,
      required: true
    },
    authUser: {
      type: Object,
      required: true
    }
  }
}
</script>
