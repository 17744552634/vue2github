<template>
    <li class="comment-div">
        <div class="handle">
            <a href="javascript:;" class="a-class" @click="deleteItem">删除</a>
        </div>
        <p>{{comment.name}}说：</p>
        <p class="comment-content">{{comment.content}}</p>
    </li>
</template>

<script>
    export default {
        name: "item",
        inject: ['test'],
        props: {
            index: Number,
            comment: Object,
            deleteComment: Function
        },
        data(){
            return {};
        },
      mounted(){
        console.log('-----inject-----', this.test)
      },
        methods: {
            deleteItem(){
                const { comment } = this;
                if (window.confirm(`确定删除${comment.name}的评论么？`)){
                    this.deleteComment(this.index)
                }
            }
        }
    }
</script>

<style scoped>
    .comment-div{
        padding: 10px;
        border-bottom: 1px solid #eeeeee;
    }
    .comment-div:last-child{
        border-bottom: 0px;
    }
    .handle{
        text-align: right;
    }
    .a-class{
        border: 1px solid #eeeeee;
        padding: 2px 5px;
        font-size: 14px;
    }
    .comment-content{
        padding-left: 10px;
        font-size: 14px;
    }
</style>
