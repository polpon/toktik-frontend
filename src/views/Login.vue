

<template>
<Navbar/>
  <div class="d-flex align-center justify-center" style="height: 100vh">
      <v-sheet width="400" class="mx-auto">
          <v-form fast-fail @submit.prevent="login">
              <v-text-field
              v-model="username"
              label="User Name"
              :rules="usernameRule"
              >
              </v-text-field>

              <v-text-field
              v-model="password"
              label="password"
              :rules="passwordRule"
              >
              </v-text-field>
              <a href="#" class="text-body-2 font-weight-regular">Forgot Password?</a>
              <v-btn type="submit" color="primary" block class="mt-2">
                Sign in
              </v-btn>

          </v-form>
          <div class="mt-2">
            <RouterLink
                style="text-decoration: none; color: inherit;"
                :to="{ name: 'signup' }" id="user">
              <p class="text-body-2">Don't have an account? <a href="#" @click="this.$router.push({ name: 'signup' })">Sign Up</a></p>
            </RouterLink>
          </div>
            <v-btn type="submit" color="error" block class="mt-2" @click="logout">Log out</v-btn>
            <v-btn type="submit" color="error" block class="mt-2" @click="test">test</v-btn>

      </v-sheet>
      <input ref="file" v-on:change="setfile"  type="file">
  </div>
</template>

<script>
import axios from 'axios';
import Navbar from "@/components/Navbar";
import { file } from '@babel/types';

export default {
  components: {Navbar},
  data() {
      return {
          username: '',
          password: '',
          file_store: null,
          loading: true,
          usernameRule: [
            value => {
              if (value) {
                return true
              }
              else {
                return "Enter the username"
              }
            }
          ],
          passwordRule: [
            value => {
              if (value) {
                return true
              }
              else {
                return "Enter the password"
              }
            }
          ]
      };
  },
  methods: {
    async login() {
      let data = new FormData();

      data.append('username', this.username)
      data.append('password', this.password)

      const response = await axios.post('/login', data)
      if (response.status == 200)
      {
        this.$router.push("/");
      } else {
        console.warn(response.data)
        // TODO: Handle error msg
      }
      return response
    },
    setfile() {
        this.file_store = this.$refs.file.files[0];
        console.log(this.file_store)
        console.log(this.file_store["type"])
        console.log(this.file_store["name"])
    },
    logout() {
        axios.delete("/logout")
    },
    async test() {
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
    }
  },
}
</script>