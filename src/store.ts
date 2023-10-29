import { createStore } from 'vuex'
export interface State {
  logined: boolean,
  username: string,
  videos: { status: string; thumbnail: string; }[]
}

const store = createStore({
    state () {
      return {
        logined: false,
        username: "",
        videos: [
          {
            status: "",
            thumbnail: ""
          }
        ],
      }
    },
    mutations: {
      get_user_data(state, { username, videos }) {
        state.username = username
        const temps_video = []
        for (let i = 0; i < videos.length; i++) {
          const video = videos[i]
          const status: string = video.status
          const thumbnail: string = video.uuid
          const video_data = {
            // title: video.title,
            status: status,
            // description: video.description,
            thumbnail: thumbnail,
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