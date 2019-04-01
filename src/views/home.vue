<template>
  <div>
    <img alt="Vue logo" src="../assets/logo.png" class="logo-img">
    <input v-model="message"/>
    <h1>{{message}}</h1>
    <p class="test1">{{computedTest}}</p>
    <p class="test2-1">{{methodTest()}}</p>
    <p class="test1">{{computedTest}}</p>
    <p class="test2-1">{{methodTest()}}</p>
    <p>click {{$store.state.count}} times, count is {{evenOrOdd}}</p>
    <button @click="increment()">vuex  +</button>
    <button @click="decrement()">vuex  -</button>
    <button @click="testAxiosGet">axion get</button>
    <h2>请发表对于VUE的看法</h2>
    <input type="number" v-model="infor.a" class="watch-input"/>
    <span>{{infor.a}}</span>
    <button @click="showInfor">hi show</button>
    <div class="left-right-top">
      <add :addComment="addComment" @selfDefine="selfDefine" v-show="isShow" :hideInfor="hideInfor"/>
      <list :comments="comments" :deleteComment="deleteComment" v-show="isShow"/>
    </div>
    <div style="display: flex">
      <div class="float-left-div" id="first">
        <div class="sjx"></div>
        <div>12222</div>
      </div>
      <div class="float-right-div"></div>
    </div>
  </div>

</template>

<script>
  import Add from '../components/Add.vue'
  import List from '../components/List.vue'


  export default {
    name: "home",
    provide: {
      test: 'provide test'
    },
    data() {
      return {
        message: 'message',
        infor: {
          a: '100000000000000000000'
        },
        isShow: false,
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
    mounted() {
      console.log('-----provide-----', this.test)
    },
    watch: {
      'infor.a'(value) {
        console.log(this.infor.a)
      }
    },
    computed: {
      evenOrOdd() {
        return this.$store.getters.evenOrOdd;
      },
      computedTest: {
        get(){
          console.log('现在我用的是computed....')
          return this.message + '现在我用的是computed'
        }
      }
    },
    methods: {
      testAxiosGet(){
        this.$http.get('/orion/verify/picVerify.do?md5=3752531FCF2BEDF6946EC2372D78B17B')
          .then(res => {
            console.log('get~~~~~~~~~~~~', res)

          })
          .catch(error => {
            console.log(error)
          })
        // this.$http.post('https://orion.sundai.cn/orion/verify/picVerify.do?md5=3752531FCF2BEDF6946EC2372D78B17B', {})
        //   .then(res => {
        //     console.log('post~~~~~~~~~~~~', res)
        //
        //   })
        //   .catch(error => {
        //     console.log(error)
        //   })
      },
      increment(){
        this.$store.dispatch('increment', 2);
      },
      decrement(){
        this.$store.dispatch('decrement', 1);
      },
      methodTest() {
        console.log('现在我用的是methods...')
        return this.message + '现在我用的是methods'
      },
      hideInfor() {
        this.isShow = false;
      },
      showInfor() {
        this.isShow = true;
      },
      addComment(comment) {
        this.comments.unshift(comment);
        console.log(document.getElementsByClassName('comment-div'))
        this.$nextTick(function () {
          console.log('在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。')
          console.log(document.getElementsByClassName('comment-div'))
        })
        console.log(document.getElementsByClassName('comment-div'))
      },
      deleteComment(index) {
        this.comments.splice(index, 1)
      },
      selfDefine(text) {//自定义事件
        console.log(text)
      }
    },
    beforeUpdate() {
      console.log('更新前')
    },
    updated() {
      console.log('updated')
    },

    components: {
      // Add,
      add: () => import('../components/Add.vue'),
      list: () => import('../components/List.vue')
    }
  }
</script>

<style scoped>
  .sjx {
    width: 0;
    height: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-bottom: 100px solid black;
  }

  .watch-input {
    width: 100px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .float-left-div {
    width: 300px;
    height: 300px;

    border: 1px solid #ff00ff;
    display: block;
    border-top-left-radius: 1px;
    border-top-right-radius: 1px;
  }

  .float-right-div {

    height: 300px;
    flex: 1;
    border: 1px solid #00ff00;
  }

  html, body {
    float: left;
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
