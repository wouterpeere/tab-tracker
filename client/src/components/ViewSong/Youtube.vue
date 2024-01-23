<template>
    <Panel title="YouTube Video">
        <youtube :video-id="youtubeId">

        </youtube>
    </Panel>
</template>

<script>
import Panel from '@/components/Panel'

export default {
    props: [
        'youtubeId'
    ],
    components: {
        Panel
    }
}
</script>

<style scoped>
</style>
