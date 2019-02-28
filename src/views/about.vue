<template>
    <div>
        <div v-if="!goFlag">
          <h2>About</h2>
          <span style="display: block">撑开</span>
          <router-link to="/about/news" class="link-style">News</router-link>
          <router-link to="/about/messages" class="link-style">Message</router-link>
          <a href="javascript:;" @click="go(1)">跳转News</a>
          <a href="javascript:;" @click="go(2)">跳转Messages</a>
        </div>
        <div>
            <router-view></router-view>
        </div>

    </div>
</template>

<script>

    export default {
        name: "about",
      data(){
          console.log('.....')
          return {
            goFlag: false
          }
      },

      methods: {
        go(num){
          // this.goFlag = true
          if (num === 1){
            this.$router.push({ name: 'news' })
          }else if (num === 2){
            this.$router.push({ name: 'messages' })
          }
        }
      },
      updated(){
          console.log('flag == ' + this.goFlag)
      }
    }
</script>

<style scoped>
    .link-style{
        padding-right: 20px;
        color: #000;
    }
    .router-link-active{
        color: burlywood !important;
    }
  .z-position{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
  }

</style>
