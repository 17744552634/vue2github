<template>
    <div>
        <h3>ID:{{$route.params.id}}</h3>
        <ul>
            <li>detail id: {{detail.id}}</li>
            <li>detail title: {{detail.title}}</li>
            <li>detail content: {{detail.content}}</li>
        </ul>
    </div>
</template>

<script>
    const allDetail = [
        {
            id: 1,
            title: 'massage1',
            content: 'content1 ...'
        },
        {
            id: 2,
            title: 'massage2',
            content: 'content2 ...'
        },
        {
            id: 3,
            title: 'massage3',
            content: 'content3 ...'
        }
    ]
    export default {
        name: "messages-detail",
        data(){
            return {
                detail: {}
            }
        },
        mounted(){

        },
        watch: {
            $route: function (value) {
                this.detail = allDetail.find(detail => detail.id == this.$route.params.id * 1)
            }
        }
    }
</script>

<style scoped>

</style>