<template>
      <v-app-bar style="display: flex; align-items:center; background-color: rgb(24 24 27);">
        <v-toolbar-title style="padding-left: 10px; padding-right: 40px; color: #f5e0dc;">
          <a href="/" style="-webkit-text-fill-color:whitesmoke; text-decoration: none; ">
            <v-img src="/src/assets/toktik.png" height="50px" width="120px">
            </v-img>
          </a>
        </v-toolbar-title>
        <div>
            <RouterLink
            style="text-decoration: none; color: inherit;"
            :to="{ name: 'login' }">
            <v-btn v-if="getLoginStatus() == false" variant="flat" color="primary" style="margin:5px; margin-right: 10px;">
            Login
            </v-btn>
            </RouterLink>
            
            <RouterLink
                style="text-decoration: none; color: inherit;"
                :to="{ name: 'signup' }">
            <v-btn v-if="getLoginStatus() == false"  variant="flat" color="primary" style="margin:5px; margin-right: 10px;">
              Sign up
            </v-btn>
            </RouterLink>
            <RouterLink
                style="text-decoration: none; color: inherit;"
                :to="{ name: 'profile' }">
            <v-btn v-if="getLoginStatus()" variant="flat" color="primary" style="margin:5px; margin-right: 10px;">
              Profile
            </v-btn>
            </RouterLink>
            <RouterLink
                style="text-decoration: none; color: inherit;"
                :to="{ name: 'logout' }"
            >
              <v-btn v-if="getLoginStatus()" @click="logout" variant="flat" color="primary" style="margin:5px; margin-right: 10px;">
                Logout
              </v-btn>
            </RouterLink>
            

              

            
          </div>
 
      </v-app-bar>
</template>

<script>

// import store from './store'

export default {
  // data: () => ({
  //   getLoginStatus: this.$store.state.logined,

  // }),
  methods: {
    getLoginStatus() {
      console.log(this.$store.state.logined)
      return this.$store.state.logined
    }

  },
  // beforeMount() {
  //   this.getLoginStatus()
  //   }
}

</script>

