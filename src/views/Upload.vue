<template>
    <Navbar/>
    <Sidebar/>

    <div class="d-flex align-center justify-center" style="height: 100vh">
        <div style="width: 100vh;">
            <v-sheet class="align-center justify-center mx-auto" width="600">
            <v-form fast-fail @submit.prevent="submitFrom">
                <v-text-field
                width=""
                clearable 
                v-model="title"
                label="title"
                :rules="titleRule"
                >
                </v-text-field>

                <v-textarea clearable 
                v-model="subtitle"
                label="subtitle"
                
                >

                </v-textarea>   
                <v-file-input
                  ref="file"
                  v-on:change="setfile"  
                  type="file"
                  v-model="file_store"
                  :rules="fileRules"
                  label="Choose a file"
                ></v-file-input>             
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
        file_store: null,
        title: "",
        subtitle: "",
        fileRules: [
          value => {
                if (value) {
                  return true
                }
                else {
                  return "Enter the file"
                }
              }
        ],
        titleRule: [
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
    methods: {
      setfile() {
        this.file_store = this.$refs.file.files[0];
        console.log(this.file_store)
        console.log(this.file_store["type"])
        console.log(this.file_store["name"])
      },
      async submitFrom() {
        this.test()
      },
      async test() {
        console.log("Upload file")
        let loader = this.$loading.show({
                    // Optional parameters
                    container: this.fullPage ? null : this.$refs.formContainer,
                    canCancel: false,
                    onCancel: this.onCancel,
                });

        // console.log(this.file_store["bname "])


        const res = await axios.post("/get-presigned-url", {
          uuid: this.file_store["name"],
          size: this.file_store["size"],
          filetype: this.file_store["type"],
          title: this.title,
          subtitle: this.subtitle
        });

        console.log(this.file_store);
        if (res.status == 200 && this.file_store != null)
        {
            let config = {
            method: 'put',
            url: res.data['url'],
            headers: {
                'Content-Type': this.file_store['type']
            },
            data : this.file_store
            };

            await axios.request(config)
            .then((response) => {
            console.log(JSON.stringify(response.data));

            if (response.status == 200) {
                axios.post("/upload-completed", {
                  uuid: res.data['filename'],
                  filename: res.data['filename'].concat(".",res.data['extension']),
                  size: this.file_store['size'],
                  filetype: this.file_store['type'],
                  extension: res.data['extension'],
                  owner_uuid: res.data['owner_uuid'],
                })
            }
            })
            .catch((error) => {
            console.log(error);
            })

        }
        loader.hide()
      },
    },
}
</script>