<template>
    <panel title="Search song">
        <v-text-field
        v-model="search"
        label="Search by title, artist, album or genre."
      ></v-text-field>
    </panel>
</template>

<script>
import _ from 'lodash'
export default {
    data () {
        return {
            search: ''
        }
    },
    watch:
    {
        search: _.debounce(async function (value) { // debounce wrapper so there is 700ms wait time before making a request
            const route = {
                name: 'songs'
            }
            if (this.search !== '') {
                route.query = {
                    search: this.search // change query string (i.e. ? in url)
                }
            }
            this.$router.push(route)
        }, 700),
        '$route.query.search': { // change search box if url is updated
            immediate: true,
            handler (value) {
                this.search = value
            }
        }
    }
}
</script>

<style scoped>
</style>
