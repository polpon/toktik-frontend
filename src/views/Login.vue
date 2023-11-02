<template>
  <div class="d-flex align-center justify-center rounded-md" style="display: flex; height: 100%;">
      <v-sheet width="450" class="mx-auto rounded-md" style="padding: 10px; border-radius: 8px;">
          <v-alert
            v-model="showAlert"
            color="warning"
            closable
            style="margin-bottom: 20px;"
          >
          {{this.alertMessage}}
          </v-alert>
          <v-form ref="form" class="rounded-md">
              <v-text-field
              v-model="username"
              label="User Name"
              @input="validate"
              :rules="usernameRule"
              >
              </v-text-field>

              <v-text-field
              v-model="password"
              label="password"
              type="password"
              @input="validate"
              :rules="passwordRule"
              >
              </v-text-field>
              <a href="#" class="text-body-2 font-weight-regular">Forgot Password?</a>

          </v-form>
          <v-btn type="submit" :disabled="!isFormValid" @click="login" color="primary" block class="mt-2">
              Sign in
          </v-btn>
          <div class="mt-2">
            <RouterLink
                style="text-decoration: none; color: inherit;"
                :to="{ name: 'signup' }" id="user">
              <p class="text-body-2">Don't have an account? <a href="#" @click="this.$router.push({ name: 'signup' })">Sign Up</a></p>
            </RouterLink>
          </div>
            <!-- <v-btn type="submit" color="error" block class="mt-2" @click="logout">Log out</v-btn>
            <v-btn type="submit" color="error" block class="mt-2" @click="test">test</v-btn> -->

      </v-sheet>
      <!-- <input ref="file" v-on:change="setfile"  type="file"> -->
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
      return {
          username: '',
          password: '',
          file_store: null,
          loading: true,
          isFormValid: false,
          showAlert: false,
          alertMessage: '',
          usernameRule: [
            value => {
              if (value?.length > 5) return true

              return 'Must be at least 6 characters.'
            }
          ],
          passwordRule: [
            value => {
              if (value?.length > 7) return true

              return 'Must be at least 8 characters.'
            }
          ]
      };
  },
  methods: {
    async validate() {
        const { valid } = await this.$refs.form.validate()

        if (valid) {this.isFormValid = true}
      },
    async login() {
      let data = new FormData();

      data.append('username', this.username)
      data.append('password', this.password)

      const customAxiosRequestConfig = { skipAuthRefresh: true };

      await axios.post('/login', data, customAxiosRequestConfig).then((res) => {
        console.log("Success");
        this.$router.push("/");
      }).catch((err) => {
        console.log("its joever");
        const detail = err.response.data.detail;
        this.alertMessage = detail;
        this.showAlert = true;
      })
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