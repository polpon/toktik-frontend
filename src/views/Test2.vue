<script setup>
  import { ref } from "vue";
  import axios from 'axios';
  import InfiniteLoading from "v3-infinite-loading";
  import "v3-infinite-loading/lib/style.css";

  let contents = ref([]);
  const load = async $state => {
    console.log("loading...");

    await axios.post("/get_random_video").then(res => {
        for (let each in res.data) {
        const content = {title: res.data[each],
        subtitle: res.data[each],
        thumbnail: res.data[each]}

        contents.value.push(content)
        }
    })
  };
</script>

<template>
    <!-- <div class="result" v-for="comment in comments" :key="comment.id">
      <div>{{ comment.email }}</div>
      <div>{{ comment.id }}</div>
    </div> -->
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

                <div class="justify-center flex items-center justify-center" @click="openDialog(index, content.thumbnail)">
                <img v-bind:src="'https://toktik-s3-videos.sgp1.digitaloceanspaces.com/' + content.thumbnail + 'thumbnail.png'" class="w-1/2 place-content-center h-128">
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
</template>

<script>
export default {
    methods: {

        async get_videos() {
            console.log("Getting videos...")
            await axios.post("/get_random_video").then(res => {
                for (let each in res.data) {
                const content = {title: res.data[each],
                subtitle: res.data[each],
                thumbnail: res.data[each]}

                this.contents.push(content)
                }
            })
        },
        trigger_comment() {
            this.comment_buttons = true
        },
        trigger_video() {
            this.comment_buttons = false
        },
        openDialog(index, filename) {
        console.log(this.contents.length)
        this.dialog = true;
        this.currentVideo = filename
        this.currentScrollVideo = index
        this.currentIndex = index
        // this.disableButtonDown = false
        // this.disableButtonUp = false
        this.disableOnOffbuttons()
                // console.log(this.contents)
        // console.log(this.contents[0])
        },
        disableOnOffbuttons() {
        if (this.currentIndex == 0) {
            this.disableButtonUp = true
        } else {
            this.disableButtonUp = false
        }
        if (this.currentIndex == ((this.contents.length) - 1)) {
            this.disableButtonDown = true
        } else {
            this.disableButtonDown = false
        }

        },
        goDown() {
            console.log("goDown")
            console.log(this.currentIndex)
            // handle the out of order video


            if (this.currentIndex < this.contents.length - 1) {
                this.currentIndex = this.currentIndex + 1
                this.currentVideo = this.contents[this.currentIndex].thumbnail
                // this.disableButtonUp = false
            } else {
                // this.disableButtonDown = true
            }
            this.disableOnOffbuttons()
        },
        goUp() {
            console.log("goUp")
            console.log(this.currentIndex)

            if (this.currentIndex > 0) {
                this.currentIndex = this.currentIndex - 1
                this.currentVideo = this.contents[this.currentIndex].thumbnail
                // this.disableButtonDown = false
            } else {
                // this.disableButtonUp = true
            }
            this.disableOnOffbuttons()
        },
        openVideoInRelateVideo(filename, index) {
            this.currentVideo = filename;
            this.dialog = true;
            this.currentIndex = index;
            console.log(this.currentIndex)
            this.disableOnOffbuttons();

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
        // contents: [
        //     // {
        //     //     title: '',
        //     //     subtitle: "",
        //         // thumbnail: "../src/assets/input.mp4",
        //     // },
        // ],

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
    }),
    beforeMount() {
        this.get_videos()
    }
}
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .result {
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-weight: 300;
    width: 400px;
    padding: 10px;
    text-align: center;
    margin: 0 auto 10px auto;
    background: #eceef0;
    border-radius: 10px;
  }
</style>

