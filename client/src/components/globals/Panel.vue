<template>
    <div class="white elevation-2">
        <v-toolbar flat dense dark class="cyan">
            <v-toolbar-title>{{ title }}</v-toolbar-title>
            <slot name="action">
            </slot>
        </v-toolbar>

        <div class="pl-4 pr-2 pt-2 pb-2">
            <slot>
                No slot definied.
            </slot>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'title'
    ]
}

</script>

<style scoped></style>
