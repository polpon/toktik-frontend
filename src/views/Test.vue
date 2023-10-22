<template>
<video-player
    src="https://toktik-s3-videos.sgp1.cdn.digitaloceanspaces.com/test2/master.m3u8"
    poster="/your-path/poster.jpg"
    controls
    :loop="true"
    :volume="0.6"
/>
</template>

<script>
// Documentation here Yang:
// https://github.com/surmon-china/videojs-player
import { defineComponent } from 'vue'
import { VideoPlayer } from '@videojs-player/vue'
import 'video.js/dist/video-js.css'

export default defineComponent({
    components: {
    VideoPlayer
    }
})
</script>