<template>
  <div>
    <div class="ui attached segment">
      <form class="ui form" @submit.prevent="sendPost">
        <div class="field">
          <textarea name="post" v-model="post" rows="2" placeholder="What's up, Doc?"></textarea>
        </div>

        <button class="ui button fluid primary" :disabled="!isFormValid">Post</button>
      </form>
    </div>
    <div class="ui bottom attached menu right">
      <router-link class="item" to="/">
        <i class="home icon"></i>
      </router-link>
      <router-link class="item" :to="`/${user.username}`">Profile</router-link>
      <router-link class="item" to="/settings/profile">Settings</router-link>
      <a class="item"><i class="sign out icon"></i></a>
    </div>
  </div>
</template>

<script>
import EventBus from '@/eventBus'

export default {
  name: 'UserSidebar',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      post: ''
    }
  },
  computed: {
    isFormValid() {
      return !!this.post
    }
  },
  methods: {
  sendPost() {
    const token = localStorage.getItem('user-token')

      axios
        .post(
          '/post', {
            post: this.post
          }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        .then(response => {
          // fire an event to the event bus
          EventBus.$emit('postAdded', response.data.data)

          // clear input field
          this.post = ''
        })
    }
  },
}
</script>