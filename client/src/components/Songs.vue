<template>
    <v-layout column>
        <v-flex xs6 offset-xs3>
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
                @click="navigateTo({name: 'songs-create'})"
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
                        @click="navigateTo({
                            name: 'song',
                            params:{
                                songId: song.id
                        }
                    })">
                        View
                        </v-btn>
                    </v-flex>
                    <v-flex xs6>
                        <img class="album-image" :src="song.albumImageUrl">
                    </v-flex>
                </v-layout>
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
    methods: {
        navigateTo (route) {
            this.$router.push(route)
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
