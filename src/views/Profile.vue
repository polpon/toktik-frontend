<template>
    <Navbar/>
    <Sidebar/>
    <v-card style="width: 100%;
            height: 30vh;">
        <div class="flex justify-center grid grid-cols-12 grid-rows-6 gap-4" style="width: 100%; height: 100%;">
    
            <div class="col-start-1 col-span-2 row-start-1 row-span-4 place-self-center" style="width: 55%; height: 70%;">
                <img
                    class="mr-2 w-6 h-6 rounded-full"
                    style="width: 100%; height: 100%;"
                    src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                    >
            </div>

            <div class="col-start-3 col-end-6 row-start-2 row-end-2 relative">
                <h1>
                    <strong class="text-2xl">
                        {{ this.username }}
                    </strong>
                    
                </h1>
            </div>
            <div class="col-start-3 col-span-2 row-start-3 row-span-2 pt-6" style="width: auto; height: auto;">
            
                <v-btn style="font-size: 12px;">
                    Edit Profile
                </v-btn>
            </div>

            <div class="row-start-5 row-span-2 col-span-4 pl-6 pb-6">
                following follower like ?
            </div>
        </div>
        
    </v-card>

    <v-divider class="border-opacity-50"></v-divider>

    <div style="height: 5vh">
        <v-btn variant="text" style="width: 50%;
        height: 100%;">
            <p style="height: auto; width: auto;">
                My Videos List
            </p>
            
        </v-btn>
        <RouterLink
            style="text-decoration: none; color: inherit;"
            :to="{ name: 'upload' }">

        <v-btn variant="text" style="width: 50%;
        height: 100%;">
            <p style="height: auto; width: auto;">
                Upload
            </p>
        </v-btn>
        </RouterLink>
    </div>

    <v-divider class="border-opacity-50"></v-divider>
    <div class="comment-list" style="height: 100vh; overflow-y: auto;">
            <v-infinite-scroll overflow-auto :height="300" :items="items">

                
                <div style="overflow-y: auto;"  v-for="video in videos" :key="video">
                    
                    <div class="flex block" style="padding-top: 10px; padding-left: 10px;">
                        <img v-bind:src="'https://toktik-s3-videos.sgp1.digitaloceanspaces.com/' + video.thumbnail + '/thumbnail.png'"
                        
                        class="place-self-center"
                        style="height: 20%; width: 20%; padding-left: 10px; padding-right: 10px; padding-top: 5px;"
                        >
                        <!-- <div class="place-self-center" style="font-size: 2.2vh;">
                            {{ video.name }}    
                        </div>      -->
                        <v-spacer></v-spacer>
                        <div class="place-self-center" style="font-size: 2.2vh;">
                            <p class="break-all" style="padding-right: 55px;">Status: {{ video.status }}</p>
                        </div>  
                        <v-spacer></v-spacer>
                        <div class="place-self-center"  style="padding-right: 10px;">

                            <v-btn >
                                Delete
                            </v-btn>  
                        </div>
                    
                    </div>         
        
                </div>
            </v-infinite-scroll>
        </div>




</template>

<script>
import axios from 'axios';
import Navbar from "@/components/Navbar";
import Sidebar from '@/components/Sidebar';

export default {
    components: {Navbar, Sidebar,},

    data: () => ({
        username: "",
        
        videos: [
            {
                // name: "super cool video",
                status: "done",
                thumbnail: "./src/assets/frames-diff-01.png"
            },
        ],
    }),
    beforeMount() {
      this.username = this.$store.state.username
      this.videos = this.$store.state.videos
      
    }
}

</script>
