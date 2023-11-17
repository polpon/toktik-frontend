<template>
      <v-app-bar style="display: flex; align-items:center; background-color: rgb(24 24 27);">
        <v-toolbar-title style="padding-left: 10px; padding-right: 40px; color: #f5e0dc;">
          <a href="/login" style="-webkit-text-fill-color:whitesmoke; text-decoration: none; ">
            <v-img src="/src/assets/toktik.png" height="50px" width="120px">
            </v-img>
          </a>
        </v-toolbar-title>
        <div class="text-center ma-4" v-if="getLoginStatus()">
        <v-menu
        location="center"
        location-strategy="connected"
        >
            <template  v-slot:activator="{ props }">
              <v-btn icon="mdi-bell-ring-outline" v-bind="props" @click="openNotification">
              </v-btn>
            </template>
                  <div  style="overflow-y: auto; margin-top: 50px; background-color: rgb(39, 39, 42); border-radius: 10px; max-height: 320px; outline: auto;">
                    <div v-for="notification in this.$myNotifications" :key="notification.id">
                        <div class="flex block" style="
                        border: 1px solid rgb(196, 196, 196);
                        border-radius: 5%;
                        margin: 24px;
                        margin-top: 10px;
                        margin-bottom: 0%;
                        padding: 15px;
                        flex-direction: column;"
                        >
                          <p>{{notification.username}} {{notification.type}} {{notification.title}} </p>
                        </div>
                    </div>
                </div>
          </v-menu>
          </div>


          <div>
            <!-- <RouterLink
            style="text-decoration: none; color: inherit;"
            :to="{ name: 'login' }"> -->
            <v-btn v-if="getLoginStatus() == false" @click="pushLogin" variant="flat" color="primary" style="margin:5px; margin-right: 10px;">
            Login
            </v-btn>
            <!-- </RouterLink> -->

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
import axios from 'axios';

export default {
  data: () => ({
    username: "",
    notifications: [],
      // {
      //   id : "11",
      //   user_id : "",
      //   video_uuid : "sample video name",
      //   read : false,
      //   type: "random",
      //   title: "some cool video",
      //   day : "",
      // },
      // {
      //   id : "12",
      //   user_id : "",
      //   video_uuid : "sample video name",
      //   read : false,
      //   type: "random",
      //   title: "some cool video",
      //   day : "",
      // },

    // ],
    location: 'bottom',

  }),
  methods: {
    pushLogin() {
      this.$router.push("/login")
    },
    getLoginStatus() {
      // console.log(this.$store.state.logined)
      return this.$store.state.logined
    },
    openNotification() {
      console.log(this.$myNotifications)
      // this.notifications = notifications;
      // console.log("Open Notification")
      // console.log(this.$store.state.username)
      // let text = "getNewNotification";
      // // "getNewNotification" + username
      // console.log("Listening to:", text.concat(this.$store.state.username))
      //       socket.on(text.concat(this.$store.state.username), (notification) => {
      //           console.log(this.$store.state.username, "notification", notification);
      //           this.notifications.push(notification)
      //           this.notifications.sort((a, b) => b.id - a.id)
      //           // context.views = views;
      // });
      // socket.off(text.concat(this.username));



      // socket.off(text.concat(this.username));
    },
    async infiniteNotificationHandler() {
      console.log("loading...");
      console.log(this.$myNotifications.length > 0 ? this.$myNotifications[this.$myNotifications.length - 1].id : 0)
      await axios.post("/get_ten_notification_by_owner_id", {"start_from": this.$myNotifications.length > 0 ? this.$myNotifications[(this.$myNotifications.length)-1].id : 0})
      .then(res => {
        console.log(res);
        for (let each in res.data) {
          this.$myNotifications.push(res.data[each])
        }
        this.$myNotifications.sort((a, b) => b.id - a.id);
      })
      console.log("Notification", this.$myNotifications)
    },
  },
  computed() {
    () => infiniteNotificationHandler();
  }
}

</script>

