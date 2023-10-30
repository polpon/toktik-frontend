<template>
<!-- <video-player
    src="http://localhost:8000/api/m3u8/static/a98c6b2e-f574-44f6-b492-7e77311ae757/master.m3u8"
    poster="https://toktik-s3-videos.sgp1.cdn.digitaloceanspaces.com/640872bc-85c2-4839-b356-89785156cd10/thumbnail.png"
    controls
    :loop="true"
    :volume="0.6"
    :html5="{vhs: {withCredentials: true}}"
/> -->
<VideoPlayer
      type="default"
      @pause="processPause"
      previewImageLink="/api/static/a98c6b2e-f574-44f6-b492-7e77311ae757/thumbnail.png"
      link="/api/m3u8/static/a98c6b2e-f574-44f6-b492-7e77311ae757/master.m3u8"
      :isMuted="false"
      :isControls="true"
  />
</template>

<script>
// Documentation here Yang:
// https://github.com/LeonidShv/vue-hls-video-player/tree/main
import { defineComponent } from 'vue'
import { VideoPlayer } from 'vue-hls-video-player';

export default defineComponent({
    components: {
    VideoPlayer
    },
})
</script>