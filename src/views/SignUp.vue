<template>
    <div class="d-flex align-center justify-center" style="height: 100vh">
        <v-sheet width="400" class="mx-auto" style="padding: 10px; border-radius: 8px;">
            <v-alert
              v-model="showAlert"
              color="warning"
              closable
              style="margin-bottom: 20px;"
            >
            {{this.alertMessage}}
            </v-alert>
            <v-form ref="form" @submit.prevent="register">
                <v-text-field
                          v-model="username"
                          name="username"
                          label="Username"
                          type="text"
                          placeholder="username"
                          required
                          @input="validate"
                          :rules="usernameRule"
                        ></v-text-field>

                <v-text-field
                          v-model="password"
                          name="password"
                          label="Password"
                          type="password"
                          placeholder="password"
                          required
                          @input="validate"
                          :rules="passwordRule"
                        ></v-text-field>

                <v-text-field
                          v-model="confirmPassword"
                          name="confirmPassword"
                          label="Confirm Password"
                          type="password"
                          placeholder="confirm password"
                          required
                          @input="validate"
                          :rules="confirmPasswordRule"
                        ></v-text-field>

                <v-btn type="submit" color="primary" block class="mt-2" :disabled="!isFormValid">Create</v-btn>
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
          ],
          confirmPasswordRule: [
            value => {
                if (value == this.password && this.password?.length > 7) {
                    return true
                }
                else {
                    return "Password does not match"
                }
            }

          ]
      };
  },
  methods: {
    async validate() {
        const { valid } = await this.$refs.form.validate()

        if (valid) {this.isFormValid = true}
      },
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