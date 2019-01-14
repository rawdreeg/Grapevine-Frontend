<template>
  <div>
    <UserProfileHeader 
    :user="user"
    :auth-user="authUser" />
    <div class="ui stackable grid container">
      <div class="twelve wide column">
        <div class="ui segment">
          <div  v-if="user.following.length > 0"  class="ui three column grid">
            <UserCard
            v-for="following in user.following"
            :key="following.id"
            :user="following" />
          </div>
          <div v-else class="ui three">
            <h3>Nothing to show here :(</h3>
          </div>
        </div>
      </div>
      <div class="four wide column">
        <UserProfileSidebarDetails
        :user="user" />
      </div>
    </div>
  </div>
</template>

<script>
import UserProfileHeader from '@/components/User/Profile/UserProfileHeader'
import UserCard from '@/components/User/Profile/UserCard'
import UserProfileSidebarDetails from '@/components/User/Profile/UserProfileSidebarDetails'
import profileMixin from '@/mixins/profileMixin'

export default {
  name: 'UsersFollowing',
  mixins: [profileMixin],
  components: {
    UserProfileHeader,
    UserCard,
    UserProfileSidebarDetails
  },
  data () {
    return {
      user: '',
      authUser: '{}'
    }
  }
}
</script>
