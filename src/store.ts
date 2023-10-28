import { createStore } from 'vuex'
const store = createStore({
    state () {
      return {
        logined: false,
        username: '',
        videos: [
            // {
            //     status: '',
            //     title: '',
            //     description: '',
            //     name: '',

            // }
        ],
      }
    },
    mutations: {
      login (state) {
        state.logined = true
      },
      logout (state) {
        state.logined = false
      }
    }
  })
  export default store