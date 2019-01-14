<template>
  <div>
  <div class="ui segment" v-show="usersToFollow.length > 0">
    <h2 class="ui medium dividing header">Who to follow     
      <i class="refresh link icon" @click="fetchWhoToFollow" style="float:right; font-size:12px"></i>
    </h2>

    <div class="ui divided link items">
      <div class="item" v-for="user in usersToFollow" :key="user.id">
        <div class="ui avatar image">
          <img src="https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm">
        </div>
        <div class="content">
          <router-link class="ui small header" :to="`/${user.username}`">
            {{ user.name }} <small>{{ `@${user.username}` }}</small>
          </router-link>

          <div class="meta">
            <button class="ui compact button mini primary" @click="followUser(user.id)">Follow</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="ui segment" >
       <p>Made by <a href="http://rawdreeg.com">Rodrigue</a> with 
       <a href="https://vuejs.org/">VueJs</a> and <a href="https://adonisjs.com/"> AdonisJS</a></p>

       <p> Thanks 
         <a href="https://twitter.com/ammezie" title="Follow @ammezie on Twitter"> Chimezie Enyinnaya </a> 
         for the amazing <a href="https://scotch.io/courses/build-a-twitter-clone-with-adonis-and-vue">course</a>
         </p>
  </div>
  </div>
</template>

<script>
export default {
  name: 'WhoToFollow',
  data() {
    return {
      usersToFollow: ''
    }
  },
  created() {
    this.fetchWhoToFollow()
  },
  methods: {
    fetchWhoToFollow() {
      const token = localStorage.getItem('user-token')

      axios
        .get('/users/users_to_follow', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          this.usersToFollow = response.data.data
        })
    },
    followUser(userId) {
      const token = localStorage.getItem('user-token')

      axios
        .post(
          '/users/follow', {
            user_id: userId
          }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        .then(response => {
          this.usersToFollow = this.usersToFollow.filter(u => {
            return u.id !== userId
          })
        })
    }
  }
}
</script>