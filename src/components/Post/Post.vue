<template>
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
        <div class="date">
          {{ post.created_at | timeAgo }}
          <small v-if="canDeletePost">
            <a @click="deletePost(post.id)"> -Remove post</a>
          </small>
        </div>
      </div>
      <router-link :to="`/${post.user.username}/status/${post.id}`">
        <div class="extra text">
          {{ post.post }}
        </div>
      </router-link>
      <PostActions
      :post="post"
      :replies="post.replies"
      :favs.sync="post.favs"
      :auth-user="authUser"
      />
      </div>
    </div>
</template>

<script>
import PostActions from '@/components/Post/PostActions'

export default {
  name: 'Post',
  components: {
    PostActions
  },
  computed: {
    canDeletePost() {
      return this.post.user_id === this.authUser.id
    }
  },
  props: {
    post: {
      type: Object,
      required: true
    },
    authUser: {
      type: Object,
      required: true,
    }
  },
  methods: {
    deletePost(postId) {
      const token = localStorage.getItem('user-token')
      const deleteConfirmed = confirm('Are you sure?')

      if (deleteConfirmed) {
        axios
          .delete(`/posts/destroy/${postId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(response => {
            this.$emit('delete', postId)
          })
      }
    }
  }
}
</script>