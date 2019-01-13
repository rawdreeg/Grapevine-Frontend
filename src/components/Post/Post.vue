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
        </div>
      </div>
      <router-link :to="`/${post.user.username}/status/${post.id}`">
        <div class="extra text">
          {{ post.post }}
        </div>
      </router-link>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Post',
  props: {
    post: {
      type: Object,
      required: true
    },
    authUser: {
      type: Object,
      required: true,
    }
  }
}
</script>