<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <div style="height: 200px"></div>
    <tabbar class="vux-demo-tabbar" icon-class="vux-center" slot="bottom" style="position: fixed">
      <tabbar-item :link="{path:'/home'}">
        <span slot="icon" style="position:relative;top: -2px;" class="iconfont">&#xeb93;</span>
        <span slot="label">Home</span>
      </tabbar-item>
      <tabbar-item :link="{path:'/about'}" badge="9">
        <span class="demo-icon-22" slot="icon">&#xe633;</span>
        <span slot="label"><span class="vux-demo-tabbar-component">About</span></span>
      </tabbar-item>
    </tabbar>
    <!--<div style="height: 100px"></div>-->
    <!--<div class="footer-div left-right-center">-->
    <!--<router-link to="/home" class="foot-link">Home</router-link>-->
    <!--<router-link to="/about" class="foot-link">About</router-link>-->
    <!--</div>-->

  </div>
</template>

<script>
  import axios from 'axios'
  import {Tabbar, TabbarItem} from 'vux'

  export default {
    name: 'app',
    data() {
      return {}
    },

    methods: {
      changeData() {
        this.text1 = '2'
        this.$set(this.infor, 'testText', '=========infor.testText===========')
      },
      destoryApp() {
        this.$destroy();
      }
    },
    beforeCreate() {

    },
    components: {
      Tabbar,
      TabbarItem
    }

  }
</script>

<style lang="less" scoped>
  [v-cloak] {
    display: none;
  }

  html, body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    color: #2c3e50;
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    h2 {
      text-align: center;
    }

    .logo-img {
      display: block;
      background-size: cover;
      width: 100px;
      height: auto;
      margin: auto;
    }
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

  input, textarea {
    outline: none;
    border: 1px solid #eeee;
    text-shadow: none;
    -webkit-appearance: none;
    -webkit-user-select: text;
    box-shadow: none;
  }

  ul {
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 0;
  }

  ul, ol, li {
    list-style-type: none;
  }

  a {
    color: brown;
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
  }

  .footer-div {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    border-top: 1px solid #eee;
  }

  .foot-link {
    width: 50%;
    text-align: center;
    font-size: 20px;
    color: #000;
  }

  .router-link-active {
    color: burlywood !important;
  }
</style>
