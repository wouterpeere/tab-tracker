<template>
    <panel title="Tabs">
        <textarea
            readonly
            v-model="song.tab"
        ></textarea>
    </panel>
</template>

<script>
export default {
    props: [
        'song'
    ]
}
</script>

<style scoped>
textarea{
    width: 100%;
    font-family: monospace;
    border: none;
    height: 400px;
    border-style: none;
    border-color: transparant;
    overflow: auto;
    padding: 40px;
}
</style>
