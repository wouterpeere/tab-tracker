<template>
    <v-toolbar dark fixed class="cyan">
        <v-toolbar-title class="mr-4">
            <span
                class="home"
                @click="navigateTo({name: 'root'})">
                TabTracker
            </span>
        </v-toolbar-title>

        <!-- <v-toolbar-items>
            <v-btn flat>
                Browse
            </v-btn>
        </v-toolbar-items> -->
        <v-spacer></v-spacer>
        <v-toolbar-items v-if="$store.state.isUserLoggedIn">
            <v-btn v-if="$store.state.isUserLoggedIn" flat dark to="login">
                Login
            </v-btn>
            <v-btn v-if="$store.state.isUserLoggedIn" flat dark to="register">  <!--This 'to' keyword works register page -->
                Sign up
            </v-btn>
        </v-toolbar-items>

    </v-toolbar>
</template>

<script>

export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}

</script>

<style scoped>
.home {
    cursor: pointer;
}
.home:hover {
    color: pink;
}
</style>
