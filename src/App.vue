<template>
  <div id="app">
    <base-nav></base-nav>
    <base-header></base-header>
    <router-view/>
  </div>
</template>
<script>
import BaseNav from '@/components/BaseNav'
import BaseHeader from '@/components/BaseHeader'
export default {
  name:'App',
  //刷新缓存vuex
  created(){
     if (sessionStorage.getItem("store") ) {
        this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
    }
    window.addEventListener("beforeunload",()=>{
        sessionStorage.setItem("store",JSON.stringify(this.$store.state))
    })
  },
  components:{
    BaseNav,
    BaseHeader
  }
}
</script>
<style lang="less">
@import url('//at.alicdn.com/t/font_1985922_vjzfgrlvlm.css');
@import './assets/css/global.css';
</style>
