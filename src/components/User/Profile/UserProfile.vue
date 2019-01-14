<template>
  <div>
    <Nav />
    <UserProfileHeader :user="user" :auth-user="authUser" />
    <div class="ui stackable grid container">
      <div class="sixteen wide column">
      <router-link class="ui button mini primary" to="/">Back Home</router-link>
      </div>
    </div>

    <div class="ui stackable grid container">
      <div class="eleven wide column">
        <div class="ui segment">
          <h2 class="ui medium dividing header">Posts</h2>

          <Posts :posts.sync="posts" :auth-user="authUser" />
        </div>
      </div>
      <div class="five wide column">
         <UserProfileSidebarDetails :user="user" />
         <div class="ui divider"></div>
        <WhoToFollow v-if="isLoggedIn" />
      </div>
    </div>
  </div>
</template>
<script>
import UserProfileHeader from '@/components/User/Profile/UserProfileHeader'
import UserProfileSidebarDetails from '@/components/User/Profile/UserProfileSidebarDetails'
import WhoToFollow from '@/components/User/WhoToFollow'
import Posts from '@/components/Post/Posts'
import Nav from '@/components/Nav'

export default {
  name: 'UserProfile',
  components: {
    UserProfileSidebarDetails,
    UserProfileHeader,
    WhoToFollow,
    Posts,
    Nav
  },
  data() {
    return {
      user: {},
      authUser: {},
      posts: []
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.fetchUser(to.params.username)

    next()
  },
  computed: {
    isLoggedIn() {
      return !!this.authUser
    }
  },
  created() {
    this.fetchUser(this.$route.params.username)

    const token = localStorage.getItem('user-token')

    if (token) {
      this.fetchAuthenticatedUser(token)
    }
  },
  methods: {
    fetchUser(username) {
      axios.get(`/${username}`).then(response => {
        this.user = response.data.data
        this.posts = response.data.data.posts.reverse()
      })
    },
    fetchAuthenticatedUser(token) {
      axios
        .get('account/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          this.authUser = response.data.data
        })
    }
  }
}
</script>