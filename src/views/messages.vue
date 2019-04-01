<template>
  <div>
    <h1>messages</h1>
    <label>{{text1}}</label>
    <label>{{infor.testText}}</label>
    <button @click="changeData">改变数据</button>
    <button @click="destoryApp">销毁组件</button>
    <ul>
      <li v-for="v in messages">
        <router-link :to="`/about/messages/${v.id}`" class="">{{v.content}}</router-link>
        <button @click="go(v.id)">push查看</button>
      </li>
    </ul>
    <div class="parent1-box">
      <div class="child1-box">块级元素水平居中</div>
    </div>
    <hr/>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "messages",
    data() {
      return {
        text1: '1',
        infor: {
          testText: '数据   '
        },
        messages: [
          {
            id: 1,
            content: 'message1'
          },
          {
            id: 2,
            content: 'message2'
          },
          {
            id: 3,
            content: 'message3'
          }
        ]
      }
    },
    beforeCreate: function () {
      console.log('beforeCreate---------------------------------------------------------------')
      console.log('el:',this.$el)
      console.log('data',this.$data)
      console.log('data--testText',this.infor)
    },
    created(){
      console.log('created-------init events && observe data----------------------------------')
      console.log('el:',this.$el)
      console.log('data',this.$data)
      console.log('data--testText',this.infor.testText)
      this.infor.testText = 'test....'
      // axios.get('https://api.github.com/search/repositories?q=v&sort=stars').then(res => {
      //   console.log(res)
      //   this.infor.testText = res.status;
      // }).catch(function () {
      //   console.log('请求失败')
      // })
    },
    beforeMount(){
      console.log("beforeMount--------------has 'el'? && has 'template'?-----------------------")
      console.log('el:',this.$el)
      console.log('data',this.$data)
      console.log('data--testText',this.infor.testText)
    },
    mounted() {
      console.log('mounted---------------------挂载------------------------------------------')
      console.log('el:',this.$el)
      console.log('data',this.$data)
      console.log('data--testText',this.infor.testText)


      var one=document.getElementById('one');
      var two=document.getElementById('two');
      var three=document.getElementById('three');
      var four=document.getElementById('four');

    },
    beforeUpdate(){
      console.log('beforeUpdate---------------------------------------------------------------')
      console.log('el:',this.$el)
      console.log('data',this.$data)
      console.log('data--testText',this.infor.testText)
    },
    updated(){
      console.log('updated---------------------------------------------------------------')
      console.log('el:',this.$el)
      console.log('data',this.$data)
      console.log('data--testText',this.infor.testText)
    },
    beforeDestroy(){
      console.log('beforeDestroy-----------------vm.$destroy()-----------------------------')
      console.log('el:',this.$el)
      console.log('data',this.$data)
      console.log('data--testText',this.infor.testText)
    },
    destroyed(){
      console.log('destroyed---------------------------------------------------------------')
      console.log('el:',this.$el)
      console.log('data',this.$data)
      console.log('data--testText',this.infor.testText)
    },
    beforeRouteEnter (to, from, next) {
      // 在渲染该组件的对应路由被 confirm 前调用
      // 不能获取组件实例 `this`
      // 因为当钩子执行前，组件实例还没被创建
      console.log('-------------beforeRouteEnter-------------------')
      next();
    },
    beforeRouteUpdate (to, from, next) {
      // 在当前路由改变，但是该组件被复用时调用
      // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
      // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
      // 可以访问组件实例 `this`
      console.log('beforeRouteUpdate-------------------')
      next()
    },
    beforeRouteLeave (to, from, next) {
      // 导航离开该组件的对应路由时调用
      // 可以访问组件实例 `this`
      console.log('--------------beforeRouteLeave-------------------')
      next()
    },
    render(){
      console.log('***************render*******************************')
    },
    methods: {
      changeData(){
        this.text1 = '2'
        this.$set(this.infor, 'testText',  '=========infor.testText===========')
      },
      destoryApp(){
        this.$destroy();
      },
      go(id) {
        this.$router.push(`/about/messages/${id}`)
      }

    }
  }
</script>

<style scoped>

  .parent1-box {
    width: 200px;
    height: 200px;
    background-color: #f00;
  }
  .child1-box {
    position: relative;
    top: 50%;
    left: 50%;
    width: 150px;
    height: 150px;
    background-color: #f54;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
  }

</style>
