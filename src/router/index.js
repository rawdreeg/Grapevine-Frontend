import Vue from 'vue'
import Router from 'vue-router'
import SignUpForm from '@/components/Auth/SignUpForm'
import LogInForm from '@/components/Auth/LogInForm'
import UserProfileSettings from '@/components/User/Settings/UserProfileSettings'
import UserPasswordSettings from '@/components/User/Settings/UserPasswordSettings'
import Home from '@/components/Home'
import SinglePost from '@/components/Post/SinglePost'
import UserProfile from '@/components/User/Profile/UserProfile'
import UsersFollowing from '@/components/User/Profile/UsersFollowing'
import UserFollowers from '@/components/User/Profile/UserFollowers'
import FavoritePosts from '@/components/User/Profile/FavoritePosts'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/signup',
      component: SignUpForm
    },
    {
      path: '/login',
      component: LogInForm
    },
    {
      path: '/settings/profile',
      component: UserProfileSettings
    },
    {
      path: '/settings/password',
      component: UserPasswordSettings
    },
    {
      path: '/following',
      component: UsersFollowing
    },
    {
      path: '/:username/following',
      component: UsersFollowing,
      props: true
    },
    {
      path: '/followers',
      component: UserFollowers
    },
    {
      path: '/:username/followers',
      component: UserFollowers,
      props: true
    },
    {
      path: '/favs',
      component: FavoritePosts
    },
    {
      path: '/:username/favs',
      component: FavoritePosts,
      props: true
    },
    {
      path: '/:username',
      component: UserProfile,
      props: true
    },
    {
      path: '/:username/status/:id',
      component: SinglePost,
      props: true
    }
  ]
})
