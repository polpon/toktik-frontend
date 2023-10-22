<template>
    <div class="flex flex-row h-screen hover:flex-row">
        <video
            controls
            type="video/mp4"
            playsinline=""
            preload="auto"
            src="@/assets/input.mp4"
            rossorigin="use-credentials"
            style="width: 50%;
            height: 100%;">
        </video>
        
    <v-card style="width: 50%;
            height: 100%;">
        <article class="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
                <footer class="flex justify-between items-center mb-2">
                    <div class="flex items-center">
                        <p class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                            <img
                                class="mr-2 w-6 h-6 rounded-full"
                                src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                                alt="Michael Gough">
                                {{ this.username }}
                        </p>

                        <p class="text-sm text-gray-600 dark:text-gray-400">
                            <time pubdate datetime="2022-02-08"
                                title="February 8th, 2022">
                                {{ this.time }}
                            </time>
                        </p>
                        
                    </div>
                        <button data-dropdown-toggle="dropdownDotsHorizontal"
                         class="inline-flex
                            items-center
                            p-2 text-sm
                            font-medium
                            text-center
                            text-gray-900
                            bg-white
                            rounded-lg
                            hover:bg-gray-100
                            focus:ring-4
                            focus:outline-none
                            dark:text-white
                            focus:ring-gray-50
                            dark:bg-gray-800
                            dark:hover:bg-gray-700
                            dark:focus:ring-gray-600"
                         type="button"> 
                        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                        </svg>

                        <v-menu activator="parent">
                        <v-list>
                            <v-list-item
                            v-for="item in itemMenus"
                            :key="item"
                            >
                            <v-list-item-title>
                            <v-btn variant="flat"
                            >
                            {{ item.title }}
                            </v-btn>


                            </v-list-item-title>
                            </v-list-item>
                        </v-list>
                        </v-menu>
                    </button>

                </footer>
                <p class="text-gray-500 dark:text-gray-400">
                    {{ this.message }}
                </p>
            </article>
        
        <v-divider class="border-opacity-50"></v-divider>

        <div>
            comment and whatever
        </div>

        <v-divider class="border-opacity-50"></v-divider>



        <v-infinite-scroll :height="300" :items="items" :onLoad="load">
            <template v-for="comment in comments" :key="comment">
                <div class="container mx-auto">
                    <v-img src="/src/assets/toktik.png" height="50px" width="120px"></v-img>
                    {{ comment.username }}: 
                </div>
                
            </template>
        </v-infinite-scroll>
    </v-card>
    </div>

</template>

<script>
export default {
    data: () => ({
        username: "Michael Gough",
        time: "Feb. 8, 2022",
        message: "You are so cool.",
        itemMenus: [
            {
                title: 'Edit',
            },
            {
                title: 'Remove',
            },
        ],
        comments: [
            {
                username: "A",
                comment: 'This is super cool',
                time: "2 min"
            },
            {
                username: "B",
                comment: 'No You are more cooler',
                time: "now"
            },
        ],
  }),
  
}

</script>