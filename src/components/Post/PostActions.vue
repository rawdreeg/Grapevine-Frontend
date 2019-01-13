<template>
  <div class="meta">
    <a v-if="replies" class="reply">
      <i class="reply icon"></i>
      {{ replies.length }}
    </a>
    <a class="like" v-if="isFavedByUser" @click="unfavPost">
      <i class="like red icon"></i> {{ favs.length }}
    </a>
    <a class="like" v-else @click="favPost">
      <i class="like icon"></i> {{ favs.length }}
    </a>
  </div>
</template>
<script>
export default {
  name: 'PostActions',
  props: {
    post: {
      type: Object,
      required: true
    },
    authUser: {
      type: Object,
      required: true
    },
    replies: {
      type: Array,
      required: true
    },
    favs: {
      type: Array,
      required: true
    }
  },

  computed: {
    isFavedByUser() {
      for (const fav of this.favs) {
        if (fav.user_id === this.authUser.id) {
          return true
        }
      }

      return false
    }
  },
  methods: {
    favPost() {
      const token = localStorage.getItem('user-token')

      if (!token) {
        alert('You must be logged in to perform the action.')
        return
      }

      axios
        .post(
          '/favs/create', {
            post_id: this.post.id
          }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        .then(response => {
          this.favs.push(response.data.data)
        })
    },
    unfavPost() {
      const token = localStorage.getItem('user-token')

      if (!token) {
        alert('You must be logged in to perform the action.')
        return
      }

      axios
        .delete(`/favs/destroy/${this.post.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          const filteredFavs = this.favs.filter(fav => {
            return fav.user_id !== this.authUser.id
          })

          this.$emit('update:favs', filteredFavs)
        })
    }
  }
}
</script>
