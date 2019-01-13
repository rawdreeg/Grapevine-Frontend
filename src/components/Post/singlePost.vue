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
            <div class="summary" v-if="post.user">
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
        <div v-if="authUser">
        <PostActions 
        :post="post"
        :replies="replies"
        :favs.sync="post.favs"
        :auth-user="authUser"
        />
      </div>
      <div class="ui divider"></div>
 

      <form class="ui form" @submit.prevent="replyPost">
        <div class="field">
          <textarea name="reply" v-model="reply" rows="2" placeholder="Reply Post"></textarea>
        </div>

        <button class="ui button primary" :disabled="!isFormValid">Reply</button>
      </form>

      <Replies :replies="replies" />
    </div>
  </div>
</template>

<script>
import Replies from '@/components/Post/Replies'
import PostActions from '@/components/Post/PostActions'

export default {
  name: 'SinglePost',
  components: {
    Replies,
    PostActions
  },
  data () {
    return {
      post: '',
      replies: [],
      reply: '',
      authUser: {}
    }
  },
  computed: {
    isFormValid () {
      return !!this.reply
    }
  },
  created () {
    this.fetchPost()
    this.fetchAuthenticatedUser()
  },
  methods: {
    fetchPost () {
      axios.get(`/posts/${this.$route.params.id}`).then(response => {
        this.post = response.data.data
        this.replies = response.data.data.replies.reverse()
      })
    },
    back () {
      this.$router.go(-1)
    },
    replyPost () {
      const token = localStorage.getItem('user-token')

      axios
        .post(
          `/posts/reply/${this.post.id}`, {
            reply: this.reply
          }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        .then(response => {
          this.reply = ''

          this.replies.unshift(response.data.data)
        })
    },
    fetchAuthenticatedUser () {
      const token = localStorage.getItem('user-token')
      console.log('here')

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