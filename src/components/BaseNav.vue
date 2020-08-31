<template>
  <div class="main" v-if="baseNavState">
    <div>
      <p>
        <router-link to='index'> <img src="@/static/images/logo.png" /></router-link>
      </p>
      <ul>
        <li>
          <router-link to='index'>
            <i class="iconfont iconyonghuguanli"></i>
            <span>用户管理</span>
          </router-link>
        </li>
        <li>
           <router-link :to="{
            name: 'Article'}">
             <i class="iconfont iconwenzhang"></i>
             <span>文章管理</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  name: 'BaseNav',
  computed:{
    ...mapState(['baseNavState'])  
  }
}
</script>
<style lang="less" scoped>
.main{
  position: fixed;
  left: 0;
  width: 156px;
  top: 0;
  bottom: 0;
  background-color: #f6f4f0;
  z-index: 10;
  p{
    border-bottom: 1px solid #ccc;
    a{
      padding: 20px;
      img{
        width: 70%;
        padding: 10px 0;
      }
    }
  }
  li{
    border-bottom: 1px solid #ccc;
    a{
      padding: 10px;
      display: block;
      font-size: 14px;
      span{
        // color: white;
      }
      i{
        // color: white;
        margin-right: 6px;
      }
    }   
  }
}
</style>
