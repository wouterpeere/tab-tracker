<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <panel title="Register">
          <form
          name="tab-tracker-form"
          autocomplete="off">
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
        </form>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import Panel from '@/components/Panel'

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
    },
    components: {
        Panel
    }
}

</script>

<style scoped>
.error{
  color: red;
}

</style>
