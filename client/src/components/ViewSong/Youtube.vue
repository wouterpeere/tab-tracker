<template>
    <panel title="YouTube Video">
        <youtube :video-id="youtubeId">

        </youtube>
    </panel>
</template>

<script>
export default {
    props: [
        'youtubeId'
    ]
}
</script>

<style scoped>
</style>
