<template>
    <div class="list">
        <label class="list-title">评论内容</label>
        <ul class="comments-div">
            <p v-show="!comments || comments.length == 0">暂无内容</p>
            <Item v-for="(comment, index) in comments" :key="index"
                  :comment="comment" :deleteComment="deleteComment" :index="index"/>
        </ul>
    </div>
</template>

<script>
    import Item from './Item.vue'
    export default {
        name: "list",
        components: {
            Item
        },
        props: {
            comments: Array,
            deleteComment: Function
        },
        data(){
            return {};
        }
    }
</script>

<style scoped>
    .list{
        width: 56%;
    }
    .comments-div{
        border: 1px solid #eeeeee;
    }
    .list-title{
        font-size: 20px;
        padding-bottom: 20px;
        display: block;
    }
</style>