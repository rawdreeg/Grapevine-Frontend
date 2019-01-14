<template>
    <div>
        <UserProfileHeader
            :user="user"
            :auth-user="authUser"
        />
        <div class="ui stackable grid container">
            <div class="eleven wide column">
                <div class="ui segment">
                    <h2 class="ui medium dividing header">Favs</h2>

                    <Posts
                        :posts.sync="onlyPosts"
                        :auth-user="authUser"
                    />
                </div>
            </div>
            <div class="five wide column">
                <UserProfileSidebarDetails :user="user"/>
                <WhoToFollow v-if="isLoggedIn"/>
            </div>
        </div>
    </div>
</template>

<script>
    import UserProfileHeader from '@/components/User/Profile/UserProfileHeader'
    import UserProfileSidebarDetails from '@/components/User/Profile/UserProfileSidebarDetails'
    import Posts from '@/components/Post/Posts'
    import WhoToFollow from '@/components/User/WhoToFollow'
    import profileMixin from '@/mixins/profileMixin'

    export default {
        name: 'FavoritePosts',
        mixins: [profileMixin],
        components: {
          UserProfileHeader,
          UserProfileSidebarDetails,
          Posts,
          WhoToFollow
        },
        data () {
          return {
            user: '',
            authUser: ''
          }
        },
        computed: {
          isLoggedIn () {
            return !!this.authUser
          },
          onlyPosts () {
            let favedPosts = []

            for (let i in this.user.favs) { 
              if(this.user.favs[i].post !== null){
                favedPosts[i] = this.user.favs[i].post
              }
            }

            return favedPosts.reverse()
          }
        }
    }
</script>