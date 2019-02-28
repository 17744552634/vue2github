<template>
    <div>
        <img alt="Vue logo" src="../assets/logo.png" class="logo-img">
        <h2>请发表对于VUE的看法</h2>
        <input type="number" v-model="infor.a"/>
        <div class="left-right-top">
            <add :addComment="addComment"/>
            <list :comments="comments" :deleteComment="deleteComment"/>
        </div>
    </div>

</template>

<script>
    import Add from '../components/Add.vue'
    import List from '../components/List.vue'



    export default {
        name: "home",
        data() {
            return {
                infor: {
                    a: '1'
                },
                repoUrl: '',
                repoName: '',
                comments: [
                    {
                        name: 'Bob',
                        content: 'VUE IS GOOD !!!'
                    },
                    {
                        name: 'Jack',
                        content: 'I like it so much !!!'
                    }
                ]
            }
        },
        watch: {
            'infor.a'(value){
                console.log(this.infor.a)
            }
        },
        methods:{
            addComment(comment){
                this.comments.unshift(comment);
            },
            deleteComment(index){
                this.comments.splice(index, 1)
            }
        },
        components: {
            Add,
            List
        }
    }
</script>

<style scoped>
  html, body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }
  .left-right-center {
    display: -webkit-flex;
    display: flex;
    display: -moz-flex;
    display: -ms-flex;
    display: -o-flex;
    -webkit-align-items: center;
    align-items: center;
    justify-content: space-between;
    -webkit-justify-content: space-between;
  }
  .left-right-top {
    display: -webkit-flex;
    display: flex;
    display: -moz-flex;
    display: -ms-flex;
    display: -o-flex;
    -webkit-align-items: flex-start;
    align-items: flex-start;
    justify-content: space-between;
    -webkit-justify-content: space-between;
  }
</style>
