<template>
    <Navbar/>
        <div class="d-flex align-center justify-center" style="height: 100vh">
            <v-sheet width="400" class="mx-auto">
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
import Navbar from "@/components/Navbar";

export default {
    components: {Navbar},
    data() {
      return {
          username: '',
          password: '',
          confirmPassword: '',
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

      const response = await axios.post('/register', data)
      if (response.status == 200)
      {
        this.$router.push("/");
      } else {
        console.warn(response.data)
        // TODO: Handle error msg
      }
      return response
    }
  }
}
</script>