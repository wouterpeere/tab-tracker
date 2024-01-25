<template>
    <div>
        <v-layout>
            <v-flex xs6>
                <song-metadata :song="song"/>
            </v-flex>

            <v-flex xs6 class="ml-2">
                <youtube :youtubeId="song.youtubeId"/>
            </v-flex>
        </v-layout>

        <v-layout>
            <v-flex xs6 class="mt-2">
                <tab :song="song"/>
            </v-flex>

            <v-flex xs6 class="ml-2 mt-2">
                <lyrics :song="song"/>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import SongsService from '@/services/SongsService'
import SongMetaData from './SongMetadata'
import Youtube from './Youtube'
import Lyrics from './Lyrics'
import Tabs from './Tab'
import SongHistoryService from '@/services/SongHistoryService'
import {mapState} from 'vuex'

export default {
    data () {
        return {
            song: {}
        }
    },
    computed: { // so $store.state.userLoggedIn is not needed everywhere
        ...mapState([
            'isUserLoggedIn',
            'user',
            'route'
        ])
    },
    async mounted () {
        const songId = this.route.params.songId // route is synced to store (see main.js)
        this.song = (await SongsService.show(songId)).data

        if (this.isUserLoggedIn) {
            SongHistoryService.post({ // push to history db
                songId: songId,
                userId: this.user.id
            })
        }
    },
    components: {
        'song-metadata': SongMetaData,
        'youtube': Youtube,
        'lyrics': Lyrics,
        'tab': Tabs
    }
}

</script>
<style scoped>

</style>
