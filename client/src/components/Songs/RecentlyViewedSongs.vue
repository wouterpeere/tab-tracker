<template>
    <panel title="Recently viewed songs">
        <v-data-table
        :headers="headers"
        :pagination.sync="pagination"
        :items="songs">
        <template slot="items" scope="props">
            <td class="text-xs-right">
                {{ props.item.title }}
            </td>
            <td class="text-xs-right">
                {{ props.item.artist }}
            </td>
        </template>
        </v-data-table>
    </panel>
</template>

<script>
import {mapState} from 'vuex'
import SongHistoryService from '@/services/SongHistoryService'

export default {
    data () {
        return {
            headers: [
                {
                    text: 'Title',
                    value: 'title'
                },
                {
                    text: 'Artist',
                    value: 'artist'
                }
            ],
            pagination: {
                sortBy: 'createdAt',
                descending: true
            },
            songs: []
        }
    },
    computed: { // so $store.state.userLoggedIn is not needed everywhere
        ...mapState([
            'isUserLoggedIn',
            'user'
        ])
    },
    async mounted () {
        if (this.isUserLoggedIn) {
            this.songs = (await SongHistoryService.index({
                userId: this.user.id
            })).data
        }
    }
}
</script>

<style scoped>
</style>
