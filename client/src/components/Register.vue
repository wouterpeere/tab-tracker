<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <div class="white elevation-2">
        <v-toolbar flat dense dark class="cyan">
          <v-toolbar-title>Register a new user</v-toolbar-title>
        </v-toolbar>
          <form
          name="tab-tracker-form"
          autocomplete="off">
          <div class="pl-4 pr-2 pt-2 pb-2">
            <v-text-field
              v-model="email"
              label="email"
              clearable
              outlined
            ></v-text-field>
            <v-text-field
            v-model="password"
            type="password"
            label="password"
            autocomplete="new-password"
            ></v-text-field>
            <div class="error" v-html="error"/>
            <br>
            <v-btn
              dark
              class="cyan"
              @click="register">
              Register
            </v-btn>
          </div>
        </form>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register () {
      try {
        await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
      } catch (error) {
        // console.log(error.response.data.error)
        this.error = error.response.data.error
      }
    }
  }
}

</script>

<style scoped>
.error{
  color: red;
}

</style>
