<template>
    <ul>
        <li v-for="(v, index) in news">
            {{v}}
        </li>
    </ul>
</template>

<script>
    export default {
        name: "news",
        data() {
            return {
                news: [
                    'news1',
                    'news2',
                    'news3'
                ]
            }
        }
    }
</script>

<style scoped>

</style>