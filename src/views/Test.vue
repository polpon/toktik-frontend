<template>
  <div>
    <video-player :options="videoOptions" />
  </div>
</template>

<script>
// Documentation here Yang:
// https://videojs.com/getting-started
import VideoPlayer from '@/components/VideoPlayer.vue';

export default {
  name: 'VideoExample',
  components: {
    VideoPlayer
  },
  data() {
    return {
      videoOptions: {
        autoplay: true,
        controls: true,
        preload: 'auto',
        poster: '/api/static/a98c6b2e-f574-44f6-b492-7e77311ae757/thumbnail.png',
        sources: [
          {
            src:
              '/api/m3u8/static/a98c6b2e-f574-44f6-b492-7e77311ae757/master.m3u8',
              type: 'application/vnd.apple.mpegurl'
          }
        ]
      }
    };
  }
};
</script>