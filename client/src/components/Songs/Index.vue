<template>
    <v-layout column>
        <v-flex xs6 offset-xs3>
            <song-search-panel class="mb-2"/>
            <songs-panel />
        </v-flex>
    </v-layout>
</template>

<script>
import SongService from '@/services/SongsService'
import SongsPanel from './SongsPanel'
import SongsSearchPanel from './SongsSearchPanel'

export default {
    components: {
        'songs-panel': SongsPanel,
        'song-search-panel': SongsSearchPanel
    },
    data () {
        return {
            songs: null
        }
    },
    async mounted () {
        // do a request to the backend for all the songs
        this.songs = (await SongService.index()).data // this is how axios returns data
    }
}
</script>

<style scoped>

.song{
    padding: 20px;
    height: 330px;
    overflow: hidden;
}

.song-title{
    font-size:30px
}

.song-artist {
    font-size:24px
}

.song-genre{
    font-size:18px
}

.album-image{
    width: 70%;
    margin: 0 auto;
}
</style>
