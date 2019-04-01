<template>
    <form class="add-div" @submit.prevent>
        <label>用户名</label><br/>
        <input type="text" placeholder="用户名" class="name-input" v-model="name"/><br/><br/>
        <label>评论内容</label><br/>
        <textarea placeholder="评论内容" class="pl-content" v-model="content"></textarea>
        <button @click="add">提交</button>
      <button @click="hideNow">hide</button>
    </form>
</template>

<script>
    export default {
        name: "add",
        data(){
            return {
                name: '',
                content: ''
            }
        },
        props: {
          addComment: Function,
          hideInfor: Function
        },
        methods: {
          hideNow(){
            this.hideInfor();
          },
            add(){
                const name = this.name.trim();
                const content = this.content.trim();
                if(!name || !content){
                    alert('非法输入');
                    return;
                }
                const comment = {
                    name,
                    content
                }
                this.addComment(comment);
                this.name = '';
                this.content = '';
                this.$emit('selfDefine', 'this is a 自定义事件')
            }
        }
    }
</script>

<style scoped>
    .add-div{
        width: 40%;
    }
    .name-input{
        width: 100%;
        box-sizing: border-box;
        padding: 0 10px;
        height: 30px;
    }
    .pl-content{
        padding: 10px;
        box-sizing: border-box;
        width: 100%;
        height: 300px;
    }
</style>
