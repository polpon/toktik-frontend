<template>
  <div>
  <div>
    <v-btn @click="updateToDB">
      Reset
    </v-btn>
  </div>
    <div v-for="(test, index) in tests" :key="index">
      <div :ref="index" class="flex items-center justify-center" style="border-radius:2px;">
          <div class="  p-6 " style="width: 30vw; padding-bottom: 50px;">
              <div class="px-6 py-4">
                  <div class="font-bold text-xl mb-2">
                      {{ test.title }}
                  </div>
                  <p class="text-slate-300 text-base">
                      {{ test.subtitle }}
                  </p>
              </div>

              <div class="justify-center flex items-center justify-center" @click="incrementViewCount(index)">
                  <!-- <div class="col-start-2 col-span-4 row-start-1 row-span-14 video-js-responsive-container" style="height: 70vh; position: relative;"> -->
                      <v-img src="../assets/frames-diff-01.png"></v-img>
                  <!-- </div> -->
              </div>

              <div class="px-6 py-4">
                  <div style="background-color: grey; width: 60px; padding: 5px; border-radius: 10px; display: inline-block;" @click="toggleLikeIcon(content)">
                      <v-icon :icon="currentIcon" style="padding-left: 5px;"/>
                      <div style="width: 5px; display: inline-block;"></div>
                      {{ test.likeCount }}
                      
                  </div>
                  
              </div>
              <div>
                  <p>View Count: {{test.viewCount }}</p>
              </div>
              
          </div>
      </div>
    
    </div>

    <!-- <p>View Count: {{initViewCount + viewCount }}</p>
    <button @click="incrementViews">Increment View</button> -->
  </div>
</template>

<script>
// import { ref, onMounted } from 'vue';
import io from 'socket.io-client';
import axios from 'axios';

export default {
  data() {
    return {
      viewCount: 0,
      initViewCount: {

      },
      currentIndex: 0,
      currentIcon: "mdi-thumb-up-outline",

      tests: [
          {
            // change id to file name
            id: 0,
            title: "cool",
            subtitle: "super cool",
            thumbnail: '../assets/toktik.png',
            viewCount: 0,
            likeCount: 0,
          },
          {
            id: 1,
            title: "cool",
            subtitle: "super cool",
            thumbnail: '../assets/toktik.png',
            viewCount: 0,
            likeCount: 0
          },
      
      ],
      // index, count
      update_videos: {},

    };
    
  },
  methods: {
    // incrementViews() {
    //   this.socket.emit('incrementViews');
    // },
    incrementViewCount(index) {
      // use video.id
      this.socket.emit('videoViewed', index)
      // this.socket.on('updateViewCount', (videoId, viewCount, videos) => {

      // console.log(videos)
      // console.log(this.update_videos)
      // this.update_videos = videos
      // console.log(this.update_videos)
      // videos = {}
      // const video = this.tests.find((v) => v.id === videoId);
      // if (video) {
      //   video.viewCount = viewCount;
      // }
      // });
    },
    reset() {
      // console.log("WHAT HAPPEN")
      const whatever = 0
      // this.socket.emit('resetCount', whatever)

      // console.log(this.tests)
      console.log("running test function")
      this.socket.emit('resetCount', whatever)

      // this.socket.on('updateViewCount', (videos) => {
      // console.log(videos)
      // for (let index in videos ) {
      //   console
      //   const video = this.tests.find((v) => v.id === index);
      //   video.viewCount += videos[index]
      // }
      // console.log("Update all the views!!!")

      // const whatever = 0
      // this.socket.emit('resetCount', whatever)





      // console.log(videos)
      // console.log(this.update_videos)
      // this.update_videos = videos
      // console.log(this.update_videos)
      // videos = {}
      // const video = this.tests.find((v) => v.id === videoId);
      // if (video) {
      //   video.viewCount = viewCount;
      // }
      // });
    },
    async updateToDB() {
      console.log("update")
      this.socket.on('updateViewCount', (videos) => {
        this.update_videos = videos
        // console.log(this.update_videos)
      });

      console.log(this.update_videos)
      for (var index in this.update_videos) {
        console.log(index)
        var video = this.tests.find((v) => v.id === index);
        if (video) {
          video.viewCount = this.update_videos[index]
        }
      }
      this.update_videos = {}
      this.reset()
      // this.socket.on('updateViewCount', (videoId, viewCount, videos) => {
      // console.log(videoId)
      // console.log(viewCount)
      // console.log(videos)
      // this.update_videos = videos
      // const video = this.tests.find((v) => v.id === videoId);
      // if (video) {
      //   video.viewCount = viewCount;
      //   }
      // });

      // for (var filename in this.update_videos) {
      //   const viewCount = this.update_videos[filename]
      //   await axios.post("/increment-video-view", {"filename": filename, "views": viewCount})
      // }
      // this.update_videos = {}

      // this.socket.emit('resetCount')

      // await axios.post("/increment-video-view", {"filename": filename, "views": this.viewCount}).then(async res => {
      //   console.log("update view completed");
      //   await axios.post("/get_video_view", {"filename": filename}).then(res => {
      //     this.initViewCount = res.data
      //   })
      // })
    },

  },
  mounted() {
    // to call function every 5s
    // var intervalId = setInterval(function() {
    //   alert("Interval reached every 5s")
    // }, 5000);

    this.socket = io('http://localhost:3030');


    // var intervalId = setInterval(function() {

    //   this.socket.on('updateViewCount', (videos) => {
    //   console.log(videos)
    //   for (let index in videos ) {
    //     console.log(index)
    //     const video = this.tests.find((v) => v.id === index);
    //     if (video) {
    //     video.viewCount += videos[index]
    //     }
    //   }
    //   console.log("Update all the views!!!")

    //   const whatever = 0
    //   this.socket.emit('resetCount', whatever)
    //   console.log("reset socket variable")

    // });
    // }, 5000);




    // this.socket.on('updateViewCount', (videoId, viewCount, videos) => {

    //   console.log(videos)
    //   console.log(this.update_videos)
    //   this.update_videos = videos
    //   console.log(this.update_videos)
    //   videos = {}
    //   const video = this.tests.find((v) => v.id === videoId);
    //   if (video) {
    //     video.viewCount = viewCount;
    //   }
    // });


    


    // this.socket.emit('getViews');

    // this.socket.on('updateViews', (count) => {
    //   this.viewCount = count;
    // });
  },
};
</script>