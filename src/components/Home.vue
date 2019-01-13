<template>
  <div class="ui stackable grid vertically padded container centered">
    <div class="twelve wide column">
      <UserSidebar :user="user" />
    </div>
    <div class="twelve wide column ">
      <div class="ui segment">
        <h2 class="ui medium dividing header">Timeline</h2>

        <Posts :posts.sync="posts" :auth-user="user" />
      </div>
    </div>
    <div class="twelve wide column"></div>
  </div>
</template>
<script>
import UserSidebar from '@/components/User/UserSidebar'
import Posts from '@/components/Post/Posts'

export default {
  name: 'Home',
  components: {
    UserSidebar,
    Posts
  },
  data() {
    return {
      user: '',
      posts: []
    }
  },
  beforeRouteEnter(to, from, next) {
    const token = localStorage.getItem('user-token')

    return token ? next() : next('/login')
  },
  created() {
    this.fetchAuthenticatedUser()
    this.fetchUserTimeline()
  },
  methods: {
    fetchAuthenticatedUser() {
      const token = localStorage.getItem('user-token')

      window.axios
        .get('/account/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          this.user = response.data.data
        })
    },
    fetchUserTimeline() {
      const token = localStorage.getItem('user-token')

      axios
        .get('/users/timeline', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          this.posts = response.data.data.reverse()
        })
    }
  }
}
</script>