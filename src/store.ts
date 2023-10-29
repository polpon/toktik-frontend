import { createStore } from 'vuex'
const store = createStore({
    state () {
      return {
        logined: false,
        username: "",
        videos: [
            // {
            //     status: '',
            //     title: '',
            //     description: '',
            //     name: '',
            //     
            // }
        ],
      }
    },
    mutations: {
      get_user_data(state, { username, videos }) {
        state.username = username
        const temps_video = []
        for (let i = 0; i < videos.length; i++) {
          const video = videos[i]

          const video_data = {
            // title: video.title,
            status: video.status,
            // description: video.description,
            thumbnail: video.uuid,
          }
          temps_video.push(video_data)
        }
        state.videos = temps_video


      },

      login (state) {
        state.logined = true
      },
      logout (state) {
        state.logined = false
        state.username = ''
        state.videos = []
        console.log(state.videos)

      }
    }
  })
  export default store