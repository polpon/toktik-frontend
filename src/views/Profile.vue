<template>
    <Sidebar/>
    <div style="height: 30%;">
        <v-card style="width: 100%;">
            <div class="flex justify-center grid grid-cols-12 grid-rows-4 gap-4" style="width: 100%;">

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
    </div>



    <div style="overflow-y: auto; height: 70%;">
        <div v-for="video in videos" :key="video">
            <div class="flex block" style="padding-top: 10px; padding-left: 10px;">
                <img v-bind:src="'api/static/' + video.uuid + '/thumbnail.png'"

                class="place-self-center"
                style="height: 20%; width: 20%; padding-left: 10px; padding-right: 10px; padding-top: 5px;"
                alt="Not Found"
                >
                
                <div style="width: 10px;" class="place-self-center">
                    <v-badge :content="video.likes_count" style="padding-bottom: 10px;">
                        <div style=
                        "background-color: #cccccc;
                        width: 35px;
                        height: 35px;
                        border-radius: 50%;
                        display: flex;
                        justify-content: center;
                        align-items: center;"
                        >
                        <v-icon icon="mdi-heart" color="red"/>
                        </div>
                    </v-badge>

                    <v-badge :content="video.comment_count" style="padding-bottom: 10px;">
                        <div style=
                            "background-color: #cccccc;
                            width: 35px;
                            height: 35px;
                            border-radius: 50%;
                            
                            display: flex;
                            justify-content: center;
                            align-items: center;"
                            >
                            <v-icon icon="mdi-message-text-outline" color="black"/>
                        </div>
                    </v-badge>

                    <v-badge :content="video.view_count" style="padding-bottom: 10px;">
                        <div style=
                        "background-color: #cccccc;
                        width: 35px;
                        height: 35px;
                        border-radius: 50%;
                        display: flex;
                        justify-content: center;
                        align-items: center;"
                        >

                        <v-icon icon="mdi-poll" color="black"/>
                    </div>
                    </v-badge> 
                </div>

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
    </div>
</template>

<script>
import axios from 'axios';
import Sidebar from '@/components/Sidebar';
import { socket } from "@/socket";

export default {
    components: {Sidebar,},

    data: () => ({
        username: "",

        videos: [
            // {
            //     // name: "super cool video",
            //     status: "done",
            //     thumbnail: "./src/assets/frames-diff-01.png"
            // },
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
        // this.videos = res.data;

        console.log(this.videos)
        for (let each in res.data) {
            this.videos.push(res.data[each])
            // this.videos.push(res.data[each])
            console.log(this.videos[each].view_count)
            let videoLike = "getVideoLike";
            let commentText = "getNewComment";
            console.log("Listening to:", this.videos[each].uuid)
            socket.on(this.videos[each].uuid, (views) => {
                console.log(this.videos[each].uuid, views);
                this.videos[each].view_count = views;
            });

            console.log("Listening to:", videoLike.concat(this.videos[each].uuid))
            socket.on(videoLike.concat(this.videos[each].uuid), (like) => {
                console.log(this.videos[each].uuid, like);
                this.videos[each].likes_count = like;
            });

            console.log("Listening to:", commentText.concat(this.videos[each].uuid))
            socket.on(commentText.concat(this.videos[each].uuid), (comment) => {
                console.log(this.videos[each].uuid, "comments", comment);
                this.videos[each].comment_count = this.videos[each].comment_count + 1
                // context.views = views;
            });
        }
        console.log(this.videos)


        }).catch((err) => {
        })
    },
    beforeUnmount() {
        let videoLike = "getVideoLike";
        let commentText = "getNewComment";
        for (let each in this.videos) {
            console.log("Not listening to:", this.videos[each].uuid);
            console.log("Not listening to:", videoLike.concat(this.videos[each].uuid));
            console.log("Not listening to:", commentText.concat(this.videos[each].uuid));
            socket.off(this.videos[each].uuid);
            socket.off(videoLike.concat(this.videos[each].uuid));
            socket.off(commentText.concat(this.videos[each].uuid));
        }
        
    }
}

</script>
