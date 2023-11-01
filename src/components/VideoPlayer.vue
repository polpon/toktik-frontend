<template>
<div>
    <video ref="videoPlayer" class="video-js"></video>
</div>
</template>

<script>
import videojs from 'video.js';

export default {
name: 'VideoPlayer',
props: {
    options: {
    type: Object,
    default() {
        return {};
    }
    },
    autoplay: {
      type: Boolean,
      default: false // Default to not autoplay
    },
    currenttime: {
      type: Number,
      default: 0
    },
    controls: {
        type: Boolean,
        default: true
    }
},
expose: ['play', 'pause', 'test', 'getPlayer'],
methods: {
    test(){
        console.log("bangers")
    },
    play() {
        if (this.player) {
        this.player.play();
        }
    },
    pause() {
        if (this.player) {
        this.player.pause();
        }
    },
    getPlayer() {
        return this.player;
    }
},
data() {
    return {
    player: null,
    localOptions: {} // Create a local copy of options
    }
},
mounted() {
    this.localOptions = Object.assign({}, this.options);

    if (this.autoplay) {
        this.localOptions.autoplay = true;
    }

    this.localOptions.controls = this.controls;

    this.player = videojs(this.$refs.videoPlayer, this.localOptions, () => {
    this.player.log('onPlayerReady', this);
    });


    if (this.currenttime) {
        this.player.currentTime(this.currenttime);
    }
},
beforeUnmount() {
    if (this.player) {
    this.player.dispose();
    }
}
}
</script>