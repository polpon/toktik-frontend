<template>
      <div style="display: flex; align-items:center;" class="bg-cyan-950">
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
            <v-btn variant="flat" color=#cdd6f4 style="margin:5px">
            Login
            </v-btn>
            </RouterLink>
            
            <RouterLink
                style="text-decoration: none; color: inherit;"
                :to="{ name: 'signup' }" id="user">
            <v-btn variant="flat" color=#cdd6f4 style="margin:5px">
              Sign up
            </v-btn>
            </RouterLink>
          </div>
      </div>
</template>

