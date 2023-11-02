<template>
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
                        <img v-bind:src="'api/static/' + video.uuid + '/thumbnail.png'"

                        class="place-self-center"
                        style="height: 20%; width: 20%; padding-left: 10px; padding-right: 10px; padding-top: 5px;"
                        >
                        <v-spacer></v-spacer>
                        <div class="place-self-center" style="font-size: 2.2vh;">
                            Title: {{ video.title }}
                        </div>
                        <v-spacer></v-spacer>
                        <div class="place-self-center" style="font-size: 2.2vh;">
                            <p class="break-all" style="padding-right: 55px;">Status: {{ video.status }}</p>
                        </div>
                        <v-spacer></v-spacer>
                        <div class="place-self-center"  style="padding-right: 10px;">

                            <v-btn @click="delete_video(video.uuid)">
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
import Sidebar from '@/components/Sidebar';

export default {
    components: {Sidebar,},

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
    methods: {
        async delete_video(filename) {
            let data = new FormData();

            console.log(filename)

            data.append("filename", filename)

            await axios.post('/delete_video', {"filename": filename}).then(async (res) => {
                console.log("delete successful");
                await axios.get('/get_user_videos').then((res) => {
                    this.videos = res.data;
                    }).catch((err) => {
                    })
            }).catch((err) => {
                console.log("its joever")
            })
        }
    },
    async beforeMount() {
      this.username = this.$store.state.username

      await axios.get('/get_user_videos').then((res) => {
        this.videos = res.data;
        }).catch((err) => {
        })
    }
}

</script>
