<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <div class="white elevation-2">
        <v-toolbar flat dense dark class="cyan">
          <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-2 pt-2 pb-2">
          <v-text-field
            v-model="email"
            label="email"
            clearable
            outlined
          ></v-text-field>
          <v-text-field
          v-model="password"
          label="password"
          type="password"
          clearable
          ></v-text-field>
          <div class="error" v-html="error"/>
          <br>
          <v-btn
            dark
            class="cyan"
            @click="login">
            Login
        </v-btn>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService';

export default {
    data () {
        return {
            email: '',
            password: '',
            error: null
        };
    },
    methods: {
        async login () {
            try {
                const response = await AuthenticationService.login({
                    email: this.email,
                    password: this.password
                });
                this.$store.dispatch('setToken', response.data.token);
                this.$store.dispatch('setUser', response.data.token);
            } catch (error) {
                this.error = error.response.data.error;
            }
        }
    }
};

</script>

<style scoped>
.error{
  color: red;
}

</style>
