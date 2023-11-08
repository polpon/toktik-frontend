<template>
    <Sidebar/>

    <div class="d-flex align-center justify-center" style="height: 100%">
        <div style="width: 100vh;">
            <v-sheet class="align-center justify-center mx-auto" width="600" style="padding: 10px; border-radius: 8px;">
              <v-alert
              v-model="showAlert"
              color="warning"
              closable
              style="margin-bottom: 20px;"
            >
            {{this.alertMessage}}
            </v-alert>
            <v-form ref="form" @submit.prevent="submitFrom">
                <v-text-field
                width=""
                clearable
                v-model="title"
                label="title"
                :rules="titleRule"
                @input="validate"
                >
                </v-text-field>

                <v-textarea clearable
                v-model="description"
                :rules="descriptionRule"
                @input="validate"
                label="description"
                >

                </v-textarea>
                <v-file-input
                  ref="file"
                  v-on:change="setfile"
                  accept="video/*"
                  type="file"
                  :rules="videoRules"
                  @change="validate"
                  label="Choose a file"
                ></v-file-input>
                <v-btn type="submit" :disabled="!isFormValid" color="primary" block class="mt-2">
                    Post
                </v-btn>
                <RouterLink
                style="text-decoration: none; color: inherit;"
                :to="{ name: 'profile' }">
                    <v-btn type="submit" color="error" block class="mt-2">
                        Cancel
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
import Sidebar from '@/components/Sidebar';

export default {
    components: {Sidebar,},
    data: () => ({
        file_store: null,
        title: "",
        description: "",
        isFormValid: false,
        showAlert: false,
        alertMessage: '',
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
        descriptionRule: [
          value => {
            if (value) {
              return true
            }
            else {
              return "Enter the description"
            }
          }
        ],
        videoRules: [
          v => (v.some(vs => vs.size < 15728640)) || 'File size should be less than 15 MB!'
        ],
    }),
    methods: {
      async validate() {
        const { valid } = await this.$refs.form.validate()

        if (valid) {this.isFormValid = true}
      },
      setfile() {
        this.file_store = this.$refs.file.files[0];
        console.log(this.file_store)
        console.log(this.file_store["type"])
        console.log(this.file_store["name"])
      },
      async submitFrom() {
        this.test()
        this.$router.push('/profile')
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
          description: this.description
        }).catch((err) => {
          console.log("its joever");
          const detail = err.response.data.detail;
          this.alertMessage = detail;
          this.showAlert = true;
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
              console.log("its joever");
              const detail = err.response.data.detail;
              this.alertMessage = detail;
              this.showAlert = true;
            })

        }
        loader.hide()
      },
    },
}
</script>