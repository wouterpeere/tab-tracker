<template>
    <v-layout column>
        <v-flex xs6 offset-xs3>
            <panel title="Songs"> <!--This is the panel component. title isdefined in script of panel.-->
                <div v-for="song in songs"
                :key="song.id"> <!--Dit genereert deze div voor elke song in songs (zie scripts)-->
                    {{ song.title }}
                    {{ song.artist }}
                    {{ song.album }}
                </div>
            </panel>
        </v-flex>
    </v-layout>
</template>

<script>
import SongService from '@/services/SongsService'
import Panel from '@/components/Panel'
export default {
    components: {
        Panel
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

<style scoped></style>
