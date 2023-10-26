<template>
    <div v-if="dialog" >
        <v-btn @click="closeDialog">
            close dialog
        </v-btn>
        apisjd;qwe
    </div>


    <Navbar v-if="dialog == false"/>
    <Sidebar v-if="dialog == false"/>

    <v-btn v-if="dialog == false" @click="get_video_name">
        Test
    </v-btn>

    <v-btn v-if="dialog == false"  @click="scrollToMyIndex">Test Scroll </v-btn>
    <!-- <v-btn v-if="dialog == false" @click="openDialog">
        openDialog
    </v-btn> -->


    <div v-if="dialog == false" class="comment-list" style="height: 100vh; overflow-y: auto;">
        <div v-if="scrollToMyIndex"></div>
        <v-infinite-scroll overflow-auto :height="300" :items="items" :onLoad="load">
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

                        <div class="justify-center flex items-center justify-center" @click="openDialog(index)">
                        <img v-bind:src="'https://toktik-s3-videos.sgp1.digitaloceanspaces.com/' + content.thumbnail + '/thumbnail.png'" class="w-1/2 place-content-center h-128">
                        </div>
                        <div class="px-6 pt-4 pb-2">
                            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                        </div>
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
    methods: {
        async get_video_name() {
            const response = await axios.get("/get-video-file")
            const content = {title: '',
                subtitle: "",
                thumbnail: ""}
            console.log(response)
            content.thumbnail = response.data.filename
            
            this.contents.push(content)
        },
        trigger_comment() {
            this.comment_buttons = true
        },
        trigger_video() {
            this.comment_buttons = false
        },
        openDialog(index) {
        this.dialog = true;
        this.currentScrollVideo = index
        },
        closeDialog() {
        this.dialog = false;
        
        // this.scrollToMyIndex()
        },
        // scrollToMyIndex() {
        
        // console.log(this.currentScrollVideo)

        // this.$refs.$refs['index_' + this.currentScrollVideo].value.scrollIntoView({ behavior: 'smooth' })
        // // this.$smoothScroll({
        // // scrollTo: this.currentScrollVideo, // scrollTo is also allowed to be number
        // // hash: '#sampleHash' // required if updateHistory is true
        // // })
        // },
        scrollToMyIndex() {
        console.log(this.currentScrollVideo)
        const [el] = this.$refs[this.currentScrollVideo];
        el.scrollIntoView({ behavior: "smooth" });
        },


    },
    data: () => ({
        dialog: false,
        currentScrollVideo: "", // Initialize scroll position
        contents: [
            // {
            //     title: '',
            //     subtitle: "",
            //     thumbnail: ""
            // },            
        ],

        username: "Michael Gough",
        time: "Feb. 8, 2022",
        message: "You are so cool.",
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
    }),
}
</script>