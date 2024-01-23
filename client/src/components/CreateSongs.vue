<template>
    <v-layout>
        <v-flex xs4>
            <panel title="Song metadata">
                <v-text-field
                v-model="song.title"
                label="Title"
                required
                :rules="[required]"
            ></v-text-field>
            <v-text-field
                v-model="song.artist"
                label="Artist"
                required
                :rules="[required]"
            ></v-text-field>
            <v-text-field
                v-model="song.genre"
                label="Genre"
                required
                :rules="[required]"
            ></v-text-field>
            <v-text-field
                v-model="song.album"
                label="Album"
                required
                :rules="[required]"
            ></v-text-field>
            <v-text-field
                v-model="song.albumImageUrl"
                label="Album image URL"
                required
                :rules="[required]"
            ></v-text-field>
            <v-text-field
                v-model="song.youtubeId"
                label="YouTube ID"
                required
                :rules="[required]"
            ></v-text-field>
            </panel>
        </v-flex>
        <v-flex xs8>
            <panel title="Song Structure" class="ml-2">
            <v-text-field
                    multi-line
                    v-model="song.lyrics"
                    label="Lyrics"
                    required
                    :rules="[required]"
                ></v-text-field>
                <v-text-field
                    multi-line
                    v-model="song.tabs"
                    label="Tabs"
                    required
                    :rules="[required]"
                ></v-text-field>
            </panel>
            <div class="danger-alert" v-if="error"> <!--Only display if error is definied-->
                {{ error }}
            </div>
            <v-btn
            dark
            class="cyan"
            @click="create">
            Create song
            </v-btn>

        </v-flex>
    </v-layout>
</template>

<script>
import Panel from '@/components/Panel'
import SongsService from '@/services/SongsService'

export default {
    data () {
        return {
            song: {
                title: null,
                artist: null,
                genre: null,
                album: null,
                albumImageUrl: null,
                youtubeId: null,
                lyrics: null,
                tab: null
            },
            error: null,
            required: (value) => !!value || 'Required.'
        }
    },
    methods: {
        async create () {
            this.error = null
            const areAllFieldsFilledIn = Object
                .keys(this.song)
                .every(key => !!this.song[key])
            if (!areAllFieldsFilledIn) {
                this.error = 'Please fill in all the required fields.'
                return
            }

            try {
            // call API
                await SongsService.post(this.song)
                this.$router.push({
                    name: 'songs'
                })
            } catch (err) {
                console.log(err)
            }
        }
    },
    components: {
        Panel
    }
}
</script>

<style scoped>
</style>
