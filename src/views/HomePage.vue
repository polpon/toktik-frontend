<template>
    <div v-if="dialog" >
        <div class="flex flex-row h-screen hover:flex-row">
            <div class="flex justify-center grid grid-cols-6 grid-rows-14 gap-4" style="width: 70%; height: 100%;">
                <div class="row-start-1 col-start-1 place-self-center" style="height: 100% width: 50%;">
                    <v-btn @click="closeDialog(this.currentVideo)" variant="text" icon style="height: 100% width: 50%;">
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

            <div style="
            display: flex;
            flex-direction: column;
            width: 30%;
            height: 100%;
            background-color: white;"
            >
                <div>
                    <article class="p-6 text-base bg-white" style="min-height: 25vh;  overflow: auto;">
                        <footer class="flex justify-between items-center mb-2">
                            <div class="flex items-center text-xl">
                                <p class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                                    <img
                                        class="mr-2 w-12 h-12 rounded-full"
                                        src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                                        >
                                </p>

                                <p>
                                    {{ this.currentVideo.owner }}
                                </p>
                                <p class="text-base text-gray-500" style="padding: 10px; padding-left: 40px;">
                                    <time pubdate datetime="2022-02-08"
                                        title="February 8th, 2022">
                                        {{ this.time }}
                                    </time>
                                </p>
                            </div>
                        </footer>

                        <div>
                            <h1 class="text-xl" style="padding-top: 18px;">
                            Title: {{ this.currentVideo.title }}
                            </h1>

                        <p class="text-base" style="padding-top: 18px;">
                            Description: {{ this.currentVideo.subtitle }}
                        </p>
                        </div>

                        <div style="
                            border: 2px solid grey;
                            width: 60px;
                            padding: 5px;
                            margin-top: 15px;
                            border-radius: 10px;
                            display: inline-block;" @click="toggleLikeIcon(this.currentVideo)">
                            <v-icon v-if="this.currentVideo.userLiked" icon="mdi-heart" style="padding-left: 5px;" color="red"/>
                            <v-icon v-else icon="mdi-heart-outline" style="padding-left: 5px;"/>

                            <div style="width: 5px; display: inline-block;"></div>
                            {{ this.currentVideo.likeCount }}
                        </div>

                        <div style="
                        border: 2px solid grey;
                        width: 60px;
                        padding: 5px;
                        margin-top: 15px;
                        margin-left: 13px;
                        border-radius: 10px;
                        display: inline-block;"
                        >
                            <v-icon icon="mdi-poll" color="black"/>

                            {{ this.currentVideo.views }}
                        </div>
                    </article>

                    <!-- <v-divider class="border-opacity-75"></v-divider> -->

                    <div style="
                        border: 1px solid rgb(196, 196, 196);
                        border-radius: 10px;
                        margin: 0 24px 0 24px;"
                        >
                        <v-text-field
                        v-model="commentText"
                        :disabled="commentDisable"
                        hide-details
                        class="bg-white"
                        label="Add a comment"
                        variant="plain"
                        append-icon="mdi-send"
                        type="text"
                        clearable
                        style="margin: 0px 24px 13px 24px;"
                        @click:append="sendComment(this.currentVideo)"
                        ></v-text-field>
                    </div>

                    <!-- <v-divider class="border-opacity-75"></v-divider> -->
                </div>
                <div class="bg-white" style="overflow-y: auto;">
                    <div v-for="comment in comments" :key="comment.id">
                        <div class="flex block" style="
                        border: 1px solid rgb(196, 196, 196);
                        border-radius: 5%;
                        margin: 24px;
                        margin-top: 10px;
                        margin-bottom: 0%;
                        padding: 15px;
                        flex-direction: column;"
                        >
                            <div class="flex block" style="
                            display: flex;
                            align-items: center;
                            font-weight: bold;
                            font-size: 15px;
                            margin-bottom: 10px;"
                            >
                                <img src="/src/assets/toktik.png" style="height: 35px; padding-right: 10px; padding-top: 5px;">
                                {{ comment.username }}
                            </div>
                            <div>
                                <p class="break-all" style="">{{ comment.content }}</p>
                            </div>
                        </div>
                    </div>
                    <InfiniteLoading @infinite="infiniteCommentHandler(this.currentVideo.thumbnail)" :distance="700">
                        <template v-slot:spinner>
                            <div style="margin: 24px;"></div>
                        </template>
                    </InfiniteLoading>
                </div>
            </div>
        </div>
    </div>




    <Sidebar v-if="dialog == false"/>




    <div v-if="dialog == false" class="comment-list" style="height: 100%; overflow-y: auto;">
        <div v-if="scrollToMyIndex"></div>

        <div v-for="(content , index) in contents" :key="index">
            <div :ref="index" class="flex items-center justify-center" style="border-radius:2px; ">
                <div class="  p-6 " style="width: 30vw; padding-bottom: 50px;">
                    <div class="px-6 py-4">
                        {{ content.thumbnail }}
                        <div class="font-bold text-xl mb-2">
                            {{ content.title }}
                        </div>
                        <p class="text-slate-300 text-base">
                            {{ content.subtitle }}
                        </p>
                    </div>

                    <div class="justify-center flex items-center justify-center" v-element-visibility="onElementVisibility" @click="handleClick(index, content, contents, $event)">
                        <div class="col-start-2 col-span-4 row-start-1 row-span-14 video-js-responsive-container" style="height: 70vh; position: relative;"
                            v-observe-visibility="{
                            callback: (isVisible, entry) => visibilityChanged(isVisible, entry, index, content),
                            intersection: {
                                threshold: 0.6,
                            },
                            }">
                            <video-player ref="videoPlayer" :options="content.videoOptions" class="video-js vjs-big-play-centered" :key="content.thumbnail" />
                        </div>
                    <!-- <img v-bind:src="'https://toktik-s3-videos.sgp1.digitaloceanspaces.com/' + content.thumbnail + 'thumbnail.png'" class="w-1/2 place-content-center h-128"> this.$refs.videoPlayer[index].play() -->
                    </div>
                </div>
                <div style="display: flex; flex-direction: column; margin-top: 20%;">
                    <div style=
                        "background-color: #cccccc;
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                        display: flex;
                        justify-content: center;
                        align-items: center;"
                        @click="toggleLikeIcon(content)">

                        <v-icon v-if="content.userLiked" icon="mdi-heart" color="red"/>
                        <v-icon v-else icon="mdi-heart-outline" color="black"/>
                        <!-- <v-icon :icon="currentIcon" color="black"/> -->
                    </div>
                    <div style="display: flex;
                        justify-content: center;
                        align-items: center;
                        margin-top: 5px;
                        font-weight: bold;
                        font-size: 12px;">

                        {{ content.likeCount }}
                    </div>

                    <div style="margin: 5px;"></div>

                    <div style=
                        "background-color: #cccccc;
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                        display: flex;
                        justify-content: center;
                        align-items: center;"
                        >

                        <v-icon icon="mdi-message-text-outline" color="black"/>
                    </div>
                    <div style="display: flex;
                        justify-content: center;
                        align-items: center;
                        margin-top: 5px;
                        font-weight: bold;
                        font-size: 12px;">

                        {{ content.commentCount }}
                    </div>

                    <div style="margin: 5px;"></div>

                    <div style=
                        "background-color: #cccccc;
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                        display: flex;
                        justify-content: center;
                        align-items: center;"
                        >

                        <v-icon icon="mdi-poll" color="black"/>
                    </div>
                    <div style="display: flex;
                        justify-content: center;
                        align-items: center;
                        margin-top: 5px;
                        font-weight: bold;
                        font-size: 12px;">

                        {{ content.views }}
                    </div>
                </div>
            </div>
        </div>
        <InfiniteLoading @infinite="infiniteVideoHandler" :distance="700" />
    </div>
</template>

<script>
import axios from 'axios';
import Sidebar from '@/components/Sidebar';
import VideoPlayer from '@/components/VideoPlayer.vue';
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";
import debounce from 'lodash.debounce';
import { socket } from "@/socket";

const updateLike = debounce((like, name) => {
    console.log("Updated like to :", name)

    if(like){
        axios.post("/increment-video-like", {"filename":name})
    } else {
        axios.post("/unlike-video", {"filename": name})
    }
}, 1000)


const playdebouncer = debounce((player) => {
    player.play();
}, 2000)


export default {
    components: {Sidebar, VideoPlayer, InfiniteLoading},

    data: () => ({
        contents: [],
        dialog: false,
        currentScrollVideo: "",
        currentVideo: "",
        currentIndex: "",
        forcePause: false,
        disableButtonUp: false,
        disableButtonDown: false,
        time: "Feb. 8, 2022",
        comment_buttons: true,
        commentDisable: false,
        commentText: "",
        comments: [
            // {
            //     id: 1,
            //     username: "Andrew Alfred",
            //     comment: 'This is super coolas doask;djs;ka kq;lwj dqwkdpoajkck;asjdk;ajsdkjaskldjaklsdjsaldksajkldasjdklasjdalksjdskdjaksldjasdjaksllk;dhf wabkufhbew;fblsadasdasdass ad;ljbjhfk asdh;fudasjfl;kasdfj ialsdfjfklasdfk;sdjflaskd;fasdklfklasdjfksjf;kasjfsjadfjsadfjsdlkfjakdsl',
            //     time: "2 min"
            // },
        ],
    }),
    methods: {
        async infiniteVideoHandler($state) {
            console.log("loading...");

            await axios.post("/get_random_video").then(async res => {
                console.log(res);
                for (let each in res.data) {
                    const content = {
                        title: res.data[each].title,
                        subtitle: res.data[each].description,
                        thumbnail: res.data[each].uuid,
                        owner: res.data[each].owner_uuid,
                        views: res.data[each].view_count,
                        likeCount: res.data[each].likes_count,
                        commentCount: res.data[each].comment_count,
                        userLiked: (await axios.post("/check_like", {'filename': res.data[each].uuid})).data,
                        startAt: 0,
                        videoOptions: {
                            // autoplay: true,
                            // muted: true,
                            controls: true,
                            responsive: true,
                            fluid: true,
                            fill: true,
                            preload: 'none',
                            poster: `/api/static/${res.data[each].uuid}/thumbnail.png`,
                            sources: [
                            {
                                src: `/api/m3u8/static/${res.data[each].uuid}/master.m3u8`,
                                type: 'application/vnd.apple.mpegurl'
                            }
                            ]
                        }
                    }
                    this.contents.push(content)
                }
            })
        },
        async infiniteCommentHandler(filename) {
            console.log("loading...", filename);

            console.log("getting comment from - ", this.comments.length > 0 ? this.comments[(this.comments.length)-1].id : 0);
            await axios.post("/get-comment-number-by-ten", {"filename": filename, "start_from": this.comments.length > 0 ? this.comments[(this.comments.length)-1].id : 0})
            .then(res => {
                console.log(res);
                // const set = new Set(this.comments);
                for (let each in res.data) {
                    this.comments.push(res.data[each])
                }

                this.comments.sort((a, b) => b.id - a.id);
            })

            console.log("Comment", this.comments)
        },
        async sendComment(context) {
            console.log("Sent Comment: ,", this.commentText)
            this.commentDisabled = true;

            await axios.post("/add-comment-video", {"filename": context.thumbnail, "comment": this.commentText})
            .then(() => {
                this.commentText = "";
            })
            .catch(() => {
            })
            .finally(() => {
                this.commentDisabled = false;
            })
            await axios.post("/notification-all-relate-user", {"filename": context.thumbnail,"user_uuid": this.$store.state.username, "type": "comment"})
        },
        async toggleLikeIcon(context) {
            context.userLiked = context.userLiked ? false : true;

            context.likeCount = context.userLiked ? context.likeCount + 1 : context.likeCount - 1;

            updateLike(context.userLiked, context.thumbnail);

            if (context.userLiked == true) {
                await axios.post("/notification-all-relate-user", {"filename": context.thumbnail, "user_uuid": this.$store.state.username, "type": "like"})
            }
        },
        toggleVideoSocket(fromContext, toContext) {
            // Open new socket, close old one
            this.comments = [];

            // Opening New Socket
            let videoLike = "getVideoLike";
            let commentText = "getNewComment";

            // console.log("Listening to:", toContext.thumbnail)
            socket.on(toContext.thumbnail, (views) => {
                console.log(toContext.thumbnail, views);
                toContext.views = views;
            });

            // console.log("Listening to:", videoLike.concat(toContext.thumbnail))
            socket.on(videoLike.concat(toContext.thumbnail), (like) => {
                console.log(toContext.thumbnail, like);
                toContext.likeCount = like;
            });

            // console.log("Listening to:", commentText.concat(toContext.thumbnail))
            socket.on(commentText.concat(toContext.thumbnail), (comment) => {
                console.log(toContext.thumbnail, "comments", comment);
                this.comments.push(comment);
                this.comments.sort((a, b) => b.id - a.id);
                // context.views = views;
            });

            this.infiniteCommentHandler(toContext.thumbnail)

            // Close Old Socket
            // console.log("Not listening to:", fromContext.thumbnail);
            // console.log("Not listening to:", videoLike.concat(fromContext.thumbnail));
            // console.log("Not listening to:", commentText.concat(fromContext.thumbnail));
            socket.off(fromContext.thumbnail);
            socket.off(videoLike.concat(fromContext.thumbnail));
            socket.off(commentText.concat(fromContext.thumbnail));
        },
        visibilityChanged(isVisible, entry, index, context) {
            const player = this.$refs.videoPlayer[index];

            console.log("Visibility:", context.thumbnail, isVisible)

            let text1 = "getVideoLike";

            if (isVisible) {
                // console.log("Listening to:", context.thumbnail)
                socket.on(context.thumbnail, (views) => {
                    console.log(context.thumbnail, views);
                    context.views = views;
                });
                console.log("Listening to:", text1.concat(context.thumbnail))
                socket.on(text1.concat(context.thumbnail), (like) => {
                    console.log(context.thumbnail, like);
                    context.likeCount = like;
                });
            } else {
                // console.log("Not listening to:", context.thumbnail)
                // console.log("Not listening to:", text1.concat(context.thumbnail))
                socket.off(context.thumbnail);
                socket.off(text1.concat(context.thumbnail))
            }

            // console.log(isVisible)
            if (!this.$refs.videoPlayer[index].getClientPause()) {
                isVisible ? playdebouncer(player) : player.pause();
            }
        },
        handleClick(index, content, contents, event) {
            // console.log(event.target.className)

            const player = this.$refs.videoPlayer[index].getPlayer();

            if (event.target.className === "vjs-icon-placeholder")
            {
                // Pause
                this.$refs.videoPlayer[index].toggleClientPause();
                console.log(this.$refs.videoPlayer[index].getClientPause())
            }
            else
            {
                this.openDialog(index, content, contents, player.currentTime());
            }
        },
        trigger_comment() {
            this.comment_buttons = true
        },
        trigger_video() {
            this.comment_buttons = false
        },
        openDialog(index, context, contents, curTime = 0) {
            context.startAt = curTime;
            this.dialog = true;
            this.$route.meta.hideNavbar = this.dialog;
            this.currentVideo = context
            // console.log(this.currentVideo)
            this.currentScrollVideo = index
            this.currentIndex = index
            this.comments = [];

            let text1 = "getVideoLike";
            let text2 = "getNewComment";

            console.log("Listening to:", context.thumbnail)
            socket.on(context.thumbnail, (views) => {
                console.log(context.thumbnail, views);
                context.views = views;
            });
            console.log("Listening to:", text1.concat(context.thumbnail))
            socket.on(text1.concat(context.thumbnail), (like) => {
                console.log(context.thumbnail, like);
                context.likeCount = like;
            });

            console.log("Listening to:", text2.concat(context.thumbnail))
            socket.on(text2.concat(context.thumbnail), (comment) => {
                console.log(context.thumbnail, "comments", comment);
                this.comments.push(comment)
                this.comments.sort((a, b) => b.id - a.id)
                // context.views = views;
            });
            // this.disableButtonDown = false
            // this.disableButtonUp = false
            this.disableOnOffbuttons(contents)
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
                this.toggleVideoSocket(this.currentVideo, contents[this.currentIndex])
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
                this.toggleVideoSocket(this.currentVideo, contents[this.currentIndex])
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
        closeDialog(context) {
            let text1 = "getVideoLike";
            let text2 = "getNewComment";

            console.log("Not listening to:", context.thumbnail)
            console.log("Not listening to:", text1.concat(context.thumbnail))
            console.log("Not listening to:", text2.concat(context.thumbnail))
            socket.off(context.thumbnail);
            socket.off(text1.concat(context.thumbnail))
            socket.off(text2.concat(context.thumbnail))

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
    beforeMount() {
      this.username = this.$store.state.username
    },
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