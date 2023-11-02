<template>
    <div class="d-flex align-center justify-center" style="height: 100vh">
        <v-sheet width="400" class="mx-auto">
            <div style="margin-bottom: 20px;">
              <v-alert
                v-if="showAlert"
                color="warning"
                closable
              >
              {{this.alertMessage}}
              </v-alert>
            </div>
            <v-form fast-fail @submit.prevent="register">
                <v-text-field
                          v-model="username"
                          name="username"
                          label="Username"
                          type="text"
                          placeholder="username"
                          required
                          :rules="usernameRule"
                        ></v-text-field>

                <v-text-field
                          v-model="password"
                          name="password"
                          label="Password"
                          type="password"
                          placeholder="password"
                          required
                          :rules="passwordRule"
                        ></v-text-field>

                <v-text-field
                          v-model="confirmPassword"
                          name="confirmPassword"
                          label="Confirm Password"
                          type="password"
                          placeholder="cocnfirm password"
                          required
                          :rules="confirmPasswordRule"
                        ></v-text-field>

                <v-btn type="submit" color="primary" block class="mt-2">Create</v-btn>
            </v-form>
        </v-sheet>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
      return {
          username: '',
          password: '',
          confirmPassword: '',
          showAlert: false,
          alertMessage: '',
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
          ],
          confirmPasswordRule: [
            value => {
                if (value == this.password) {
                    return true
                }
                else {
                    return "does not match the password"
                }
            }

          ]
      };
  },
  methods: {
    async register()
    {
      let data = new FormData();

      data.append('username', this.username)
      data.append('password', this.password)

      const customAxiosRequestConfig = { skipAuthRefresh: true };

      await axios.post('/register', data, customAxiosRequestConfig)
      .then((res) => {
        console.log("Success");
        this.$router.push("/");
      }).catch((err) => {
        console.log("its joever");
        const detail = err.response.data.detail;
        this.alertMessage = detail;
        this.showAlert = true;
      })
    }
  }
}
</script>