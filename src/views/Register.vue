<script lang="ts" setup>

</script>

<template>
  <div class="d-flex align-center justify-center" style="height: 100vh">
      <v-sheet width="400" class="mx-auto">
          <v-form fast-fail @submit.prevent="register">
              <v-text-field v-model="username" label="User Name"></v-text-field>

              <v-text-field v-model="password" label="password"></v-text-field>

              <v-btn type="submit" color="primary" block class="mt-2">Ok</v-btn>
              <v-btn
              block
              class="mt-2"
              color="error"
              @click="this.$router.push({ name: 'home' })"
              >
                cancel
          </v-btn>

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
      };
  },
  methods: {
      register() {
          axios.post("/auth", {})
      },
  },
}
</script>