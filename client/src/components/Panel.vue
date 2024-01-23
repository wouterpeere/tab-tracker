<template>
    <div class="white elevation-2">
        <v-toolbar flat dense dark class="cyan">
            <v-toolbar-title>{{ title }}</v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-2 pt-2 pb-2">
            <slot name="first">
                No slot content defined.
            </slot>
            <slot name="second">
                No slot content defined.
            </slot>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            title: 'hello world'
        };
    }
};
</script>

<style scoped></style>
