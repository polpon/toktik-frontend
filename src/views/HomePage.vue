<script setup>
import { ref } from "vue";
import axios from 'axios';
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";
import store from '../store';

const contents = ref([]);
const load = async $state => {
    console.log("loading...");

    await axios.post("/get_random_video").then(res => {
        console.log(res);
        for (let each in res.data) {
            const content = {
                title: res.data[each].title,
                subtitle: res.data[each].description,
                thumbnail: res.data[each].uuid,
                startAt: 0,
                videoOptions: {
                    // autoplay: true,
                    // muted: true,
                    controls: true,
                    responsive: true,
                    fluid: true,
                    fill: true,
                    preload: 'auto',
                    poster: `/api/static/${res.data[each].uuid}/thumbnail.png`,
                    sources: [
                    {
                        src: `/api/m3u8/static/${res.data[each].uuid}/master.m3u8`,
                        type: 'application/vnd.apple.mpegurl'
                    }
                    ]
                }
            }
        contents.value.push(content)
        }
    })
};
</script>

<template>
    <div v-if="dialog" >
        <div class="flex flex-row h-screen hover:flex-row">
            <div class="flex justify-center grid grid-cols-6 grid-rows-14 gap-4" style="width: 70%; height: 100%;">
                <div class="row-start-1 col-start-1 place-self-center" style="height: 100% width: 50%;">
                    <v-btn @click="closeDialog" variant="text" icon style="height: 100% width: 50%;">
                        <v-icon icon="mdi-alpha-x-circle" size=300%></v-icon>
                    </v-btn>
                </div>

                <div class="col-start-2 col-span-4 row-start-1 row-span-14 video-js-responsive-container" style="height: 100vh; padding-top: 250px">
                    <video-player :options="this.currentVideo.videoOptions" class="video-js" :key="this.currentVideo.thumbnail" :autoplay="true" :currenttime="this.currentVideo.startAt"/>
                </div>

                <div v-if="disableButtonUp == false" class="row-start-7 col-start-6  place-self-center" style="height: 100% width: 50%;">
                    <v-btn @click="goUp(contents)" variant="text" icon style="height: 100% width: 50%;">
                        <v-icon icon="mdi-arrow-up-bold-circle" size=300%></v-icon>
                    </v-btn>
                </div>
                <div v-if="disableButtonDown  == false" class="row-start-8 col-start-6 place-self-center" style="height: 100% width: 50%;">
                    <v-btn @click="goDown(contents)" variant="text" icon style="height: 100% width: 50%;">
                        <v-icon icon="mdi-arrow-down-bold-circle" size=300%></v-icon>
                    </v-btn>
                </div>



            </div>

        <v-card style="width: 30%;
                height: 100%;">
                <article class="p-6 text-base bg-white" style="max-height: 25vh;  overflow: auto;">
                    <footer class="flex justify-between items-center mb-2">
                        <div class="flex items-center">
                            <p class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                                <img
                                    class="mr-2 w-12 h-12 rounded-full"
                                    src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                                    >
                            </p>
                            <p>
                                {{ this.username }}
                            </p>
                            <p class="text-xs text-gray-500" style="padding: 10px;">
                                <time pubdate datetime="2022-02-08"
                                    title="February 8th, 2022">
                                    {{ this.time }}
                                </time>
                            </p>
                        </div>
                            <button data-dropdown-toggle="dropdownDotsHorizontal"
                            class="inline-flex
                                items-center
                                p-2 text-sm
                                font-medium
                                text-center
                                text-gray-900
                                bg-white
                                rounded-lg
                                hover:bg-gray-100
                                focus:ring-4
                                focus:outline-none
                                dark:text-white
                                focus:ring-gray-50
                                dark:bg-gray-800
                                dark:hover:bg-gray-700
                                dark:focus:ring-gray-600"
                            type="button">
                            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                            </svg>

                            <v-menu activator="parent">
                            <v-list>
                                <v-list-item
                                v-for="item in itemMenus"
                                :key="item"
                                >
                                <v-list-item-title>
                                <v-btn variant="flat"
                                >
                                {{ item.title }}
                                </v-btn>


                                </v-list-item-title>
                                </v-list-item>
                            </v-list>
                            </v-menu>
                        </button>

                    </footer>
                    <p>
                        {{ this.message }}
                    </p>
                </article>
                <!-- <v-divider class="border-opacity-0"></v-divider> -->

            <div class="bg-white" style="height: 40px">
                <v-btn variant="text"
                @click="trigger_comment"
                style="width: 50%;
                height: 100%;">
                    Comments
                </v-btn>
                <v-btn variant="text"
                @click="trigger_video"
                style="width: 50%;
                height: 100%;">
                    relate video
                </v-btn>
            </div>

            <v-divider class="border-opacity-75"></v-divider>



                <!-- TODO add if-else stagement -->
                <!-- <div>
                    No comments to display.
                </div>  -->


            <div v-if="this.comment_buttons" class="comment-list bg-white" style="height: 100vh; overflow-y: auto;">
                <!-- <v-infinite-scroll overflow-auto :height="300" :items="items" :onLoad="get_videos">
                    <div style="overflow-y: auto;"  v-for="comment in comments" :key="comment">
                        <div class="flex block" style="padding-top: 10px; padding-left: 10px;">
                            <img src="/src/assets/toktik.png" style="height: 55px; width: 70px; padding-left: 10px; padding-right: 10px; padding-top: 5px;">
                            <div>
                                {{ comment.username }}
                                <p class="break-all" style="padding-right: 55px;">{{ comment.comment }}</p>
                            </div>
                        </div>
                    </div>
                </v-infinite-scroll> -->
            </div>

            <div v-else class="comment-list bg-white" style="height: 72vh; overflow-y: auto;">
                <v-infinite-scroll overflow-auto :height="200" :items="items">
                    <v-row>
                    <v-col
                        v-for="(content, index) in contents"
                        :key="index"
                        cols="12"
                        sm="6"
                        md="4"
                        lg="4"
                        style="padding: 10px;"
                    >
                        <v-card  @click="openVideoInRelateVideo(content.thumbnail, index)" style="width: 100%; max-width: 300px; height: 220px; background-color: black; display: flex; align-items: center; justify-content: center;">
                            <v-img :src="'https://toktik-s3-videos.sgp1.digitaloceanspaces.com/' + content.thumbnail + 'thumbnail.png'" aspect-ratio="3/4" style="max-width: 100%; max-height: 100%;"></v-img>
                        </v-card>
                    </v-col>

                    </v-row>
                </v-infinite-scroll>
                </div>

        </v-card>
        </div>
    </div>


    <Sidebar v-if="dialog == false"/>




    <div v-if="dialog == false" class="comment-list" style="height: 100%; overflow-y: auto;">
        <div v-if="scrollToMyIndex"></div>

        <div style="overflow-y: auto;"  v-for="(content , index) in contents" :key="index">
            <div :ref="index" class="flex items-center justify-center" style="border-radius:2px;">
                <div class="max-w-2xl rounded overflow-hidden justify-between p-4 leading-normal">
                    <div class="px-6 py-4">
                        <div class="font-bold text-xl mb-2">
                            {{ content.title }}
                        </div>
                        <p class="text-slate-300 text-base">
                            {{ content.subtitle }}
                        </p>
                    </div>

                    <div class="justify-center flex items-center justify-center" @click="handleClick(index, content, contents)">
                        <div class="col-start-2 col-span-4 row-start-1 row-span-14 video-js-responsive-container" style="height: 100vh; position: relative;">
                            <video-player ref="videoPlayer" :options="content.videoOptions" class="video-js" :key="content.thumbnail" v-observe-visibility="(isVisible, entry) => visibilityChanged(isVisible, entry, this.$refs.videoPlayer[index])"/>
                        </div>
                    <!-- <img v-bind:src="'https://toktik-s3-videos.sgp1.digitaloceanspaces.com/' + content.thumbnail + 'thumbnail.png'" class="w-1/2 place-content-center h-128"> this.$refs.videoPlayer[index].play() -->
                    </div>
                    <div class="px-6 pt-4 pb-2">
                        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                    </div>
                </div>
            </div>
        </div>
        <InfiniteLoading @infinite="load" />
    </div>
</template>

<script>
import Sidebar from '@/components/Sidebar';
import VideoPlayer from '@/components/VideoPlayer.vue';

export default {
    components: {Sidebar, VideoPlayer},
    methods: {
        visibilityChanged (isVisible, entry, context) {
            // this.isVisible = isVisible
            console.log(isVisible)
            isVisible ? context.play() : context.pause();
        },
        handleClick(index, content, contents) {
            const player = this.$refs.videoPlayer[index].getPlayer();
            console.log(player.currentTime());

            this.openDialog(index, content, contents, player.currentTime());
        },
        // async get_videos() {
        //     console.log("Getting videos...")
        //     await axios.post("/get_random_video").then(res => {
        //         for (let each in res.data) {
        //         const content = {title: res.data[each],
        //         subtitle: res.data[each],
        //         thumbnail: res.data[each]}

        //         this.contents.push(content)


        //         // this.contents.push(res)
        //         // console.log(res)
        //         }
        //     })
        // },
        trigger_comment() {
            this.comment_buttons = true
        },
        trigger_video() {
            this.comment_buttons = false
        },
        openDialog(index, context, contents, curTime = 0) {
        // console.log(this.contents.length)
        context.startAt = curTime;
        console.log(contents)
        this.dialog = true;
        this.$route.meta.hideNavbar = this.dialog;
        this.currentVideo = context
        this.currentScrollVideo = index
        this.currentIndex = index
        // this.disableButtonDown = false
        // this.disableButtonUp = false
        this.disableOnOffbuttons(contents)
                // console.log(this.contents)
        // console.log(this.contents[0])
        },
        disableOnOffbuttons(contents) {
        if (this.currentIndex == 0) {
            this.disableButtonUp = true
        } else {
            this.disableButtonUp = false
        }
        if (this.currentIndex == ((contents.length) - 1)) {
            this.disableButtonDown = true
        } else {
            this.disableButtonDown = false
        }

        },
        goDown(contents) {
            console.log("goDown")
            console.log(contents)
            console.log(this.currentIndex)
            // handle the out of order video


            if (this.currentIndex < contents.length - 1) {
                this.currentIndex = this.currentIndex + 1
                this.currentVideo = contents[this.currentIndex]
                console.log(this.currentVideo)
                // this.disableButtonUp = false
            } else {
                // this.disableButtonDown = true
            }
            this.disableOnOffbuttons(contents)

            // VideoPlayer.value.bangers;
        },
        goUp(contents) {
            console.log("goUp")
            console.log(this.currentIndex)

            if (this.currentIndex > 0) {
                this.currentIndex = this.currentIndex - 1
                this.currentVideo = contents[this.currentIndex]
                // this.disableButtonDown = false
            } else {
                // this.disableButtonUp = true
            }
            this.disableOnOffbuttons(contents)
        },
        openVideoInRelateVideo(filename, index, contents) {
            this.currentVideo = filename;
            this.dialog = true;
            this.$route.meta.hideNavbar = this.dialog;
            this.currentIndex = index;
            console.log(this.currentIndex)
            this.disableOnOffbuttons(contents);

            // this.dialog = true;
            // this.currentVideo = filename
            // this.currentScrollVideo = index
            // this.currentIndex = index
            // // this.disableButtonDown = false
            // // this.disableButtonUp = false
            // this.disableOnOffbuttons()
        },
        closeDialog() {
        this.dialog = false;
        this.$route.meta.hideNavbar = this.dialog;
        setTimeout(() => this.scrollToMyIndex(), 1000);
        },

        scrollToMyIndex() {
        console.log(this.currentScrollVideo)
        const [el] = this.$refs[this.currentScrollVideo];
        el.scrollIntoView({ behavior: "smooth" });
        },


    },
    data: () => ({
        dialog: false,
        currentScrollVideo: "",
        currentVideo: "",
        currentIndex: "",
        disableButtonUp: false,
        disableButtonDown: false,

        username: "Michael Gough",
        time: "Feb. 8, 2022",
        message: "This is super coolas doask;djs;ka kq;lwj dqwkdpoajkck;asjdk;ajsdkjaskldjaklsdjsaldksajkldasjdklasjdalksjdskdjaksldjasdjaksllk;dhf wabkufhbew;fblsadasdasdass ad;ljbjhfk asdh;fudasjfl;kasdfj ialsdfjfklasdfk;sdjflaskd;fasdklfklasdjfksjf;kasjfsjadfjsadfjsdlkfjakdsl",
        comment_buttons: true,
        itemMenus: [
            {
                title: 'Edit',
            },
            {
                title: 'Remove',
            },
        ],
        videos: [
            {
                thumbnail: "./src/assets/toktik.png",
                link: ""
            },
        ],
        comments: [
            {
                username: "Andrew Alfred",
                comment: 'This is super coolas doask;djs;ka kq;lwj dqwkdpoajkck;asjdk;ajsdkjaskldjaklsdjsaldksajkldasjdklasjdalksjdskdjaksldjasdjaksllk;dhf wabkufhbew;fblsadasdasdass ad;ljbjhfk asdh;fudasjfl;kasdfj ialsdfjfklasdfk;sdjflaskd;fasdklfklasdjfksjf;kasjfsjadfjsadfjsdlkfjakdsl',
                time: "2 min"
            },
        ],
        videoOptionsCheck: {
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        preload: 'auto',
        poster: "/api/static/a98c6b2e-f574-44f6-b492-7e77311ae757/thumbnail.png",
        sources: [
          {
            src:
              '/api/m3u8/static/a98c6b2e-f574-44f6-b492-7e77311ae757/master.m3u8',
              type: 'application/vnd.apple.mpegurl'
          }
        ]
      }
    }),
}
</script>

<style>
.video-js-responsive-container {
    width: 100%;
    position: relative;
    background-color: black;
}
.video-js {
    height: 100%;
    width: 100%;

    top: 50%;
    transform: translateY(-50%);
    position: absolute;
}
</style>