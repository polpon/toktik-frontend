<template>

<v-navigation-drawer>
  <aside id="default-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
   <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 bg-zinc-900">
      <ul class="space-y-2 font-medium">
         <li>
            <a href="/" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               
                  <v-icon class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                   icon="mdi-home">
                  </v-icon>
            
               <span class="ml-3">For You</span>
            </a>
         </li>
         <li>
            <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <v-icon class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                   icon="mdi-account-multiple">
                  </v-icon>
               <span class="flex-1 ml-3 whitespace-nowrap">Following</span>
            </a>
         </li>
         <li>
            <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <v-icon class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                   icon="mdi-compass">
                  </v-icon>
               <span class="flex-1 ml-3 whitespace-nowrap">Explore</span>
            </a>
         </li>
         
         
      </ul>
   </div>
</aside>
</v-navigation-drawer>


      <!-- <v-navigation-drawer
        floating
        permanent
        expand-on-hover
        class="sm:w4"
      >
        <v-list
          density="compact"
          nav
        >
          <v-list-item prepend-icon="mdi-view-dashboard" title="Home" value="home"></v-list-item>
          <v-list-item prepend-icon="mdi-forum" title="About" value="about"></v-list-item>
        </v-list>
      </v-navigation-drawer> -->



</template>

<script>
import axios from 'axios';
import Navbar from "@/components/Navbar";
export default {


}
</script>