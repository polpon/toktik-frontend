<template>
    <Navbar/>
    <Sidebar/>

    <div class="d-flex align-center justify-center" style="height: 100vh">
        <div style="width: 30vh;">
            <input ref="file" v-on:change="something"  type="file">
        </div>
        <div style="width: 80vh;">
            <v-sheet width="400" class="mx-auto">
            <v-form fast-fail>
                <v-text-field
                clearable 
                v-model="titile"
                label="titile"
                :rules="titileRule"
                >
                </v-text-field>

                <v-textarea clearable 
                v-model="subtitile"
                label="subtitile"
                
                >

                </v-textarea>                
                <v-btn type="submit" color="primary" block class="mt-2">
                    Post
                </v-btn>
                <RouterLink
                style="text-decoration: none; color: inherit;"
                :to="{ name: 'profile' }">
                    <v-btn type="submit" color="error" block class="mt-2">
                        Cancal
                    </v-btn>
                </RouterLink>

            </v-form>
            <div class="mt-2">
                
            </div>
                
        </v-sheet>
        </div>

        
        
    </div>
</template>

<script>
import axios from 'axios';
import Navbar from "@/components/Navbar";
import Sidebar from '@/components/Sidebar';

export default {
    components: {Navbar, Sidebar,},
    data: () => ({
        titileRule: [
            value => {
              if (value) {
                return true
              }
              else {
                return "Enter the title"
              }
            }
          ],
          videoRule: [
            value => {
              if (value) {
                return true
              }
              else {
                return "upload the videoRule"
              }
            }
          ]
    }),
}
</script>