<template>
      <v-app-bar style="display: flex; align-items:center; background-color: rgb(243 232 255);">
        <v-toolbar-title style="padding-left: 10px; padding-right: 40px; color: #f5e0dc;">
          <a href="/" style="-webkit-text-fill-color:whitesmoke; text-decoration: none; ">
            <v-img src="/src/assets/toktik.png" height="50px" width="120px">
            </v-img>
          </a>
        </v-toolbar-title>
        <div>
            <RouterLink
            style="text-decoration: none; color: inherit;"
            :to="{ name: 'login' }" id="user">
            <v-btn variant="flat" color=#D8B4FE style="margin:5px; margin-right: 10px;">
            Login
            </v-btn>
            </RouterLink>
            
            <RouterLink
                style="text-decoration: none; color: inherit;"
                :to="{ name: 'signup' }" id="user">
            <v-btn variant="flat" color=#D8B4FE style="margin:5px; margin-right: 10px;">
              Sign up
            </v-btn>
            </RouterLink>
          </div>
 
      </v-app-bar>
</template>

