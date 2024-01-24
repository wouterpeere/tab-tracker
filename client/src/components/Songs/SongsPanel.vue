<template>
    <panel title="Songs"> <!--This is the panel component. title isdefined in script of panel.-->
        <v-btn
        slot="action"
        fab
        class="cyan accent-2"
        light
        medium
        absolute
        right
        middle
        :to="{
            name: 'songs-create'
        }"
        >
            <v-icon>add</v-icon>
        </v-btn>
        <div v-for="song in songs"
        :key="song.id"
        class="song"> <!--Dit genereert deze div voor elke song in songs (zie scripts)-->
        <v-layout>
            <v-flex xs6> <!--Columns 12 breed-->
                <div class="song-title">
                    {{ song.title }}
                </div>
                <div class="song-artist">
                    {{ song.artist }}
                </div>
                <div class="song-genre">
                    {{ song.genre }}
                </div>

                <v-btn
                dark
                class="cyan"
                :to="{
                    name: 'song',
                    params:{
                        songId: song.id
                }
                }">
                View
                </v-btn>
            </v-flex>
            <v-flex xs6>
                <img class="album-image" :src="song.albumImageUrl">
            </v-flex>
        </v-layout>
        </div>
    </panel>
</template>

<script>
import SongService from '@/services/SongsService'
export default {
    data () {
        return {
            songs: null
        }
    },
    watch: {
        '$route.query.search': {
            immediate: true,
            async handler (value) {
                this.songs = (await SongService.index(value)).data
            }
        }
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
