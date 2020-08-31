<template>
  <div class="main" v-if="baseHeaderState">
    <div class="info">
      <div class="img-box">
        <img src="@/static/images/user.png" alt="" srcset="">
      </div>
      <span>{{userInfo.phone}}</span>
      <ul class="drop-down">
        <li>
          <router-link to='/login'>
            <span>退出</span>
          </router-link>
        </li>
        <li>
          <router-link to='/login'>
            <span>1111</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  name: 'BaseHeader',
  computed:{
    ...mapState(['baseHeaderState','userInfo'])  
  }
}
</script>
<style lang="less" scoped>
.main{
  position: fixed;
  top: 0;
  left: 156px;
  right: 0;
  background-color: #e5eecc;
  z-index: 100;
  .info{
    padding: 16px;
    float: right;
    display: flex;
    margin-right: 20px;
    align-items: center;
    position: relative;
    z-index: 100;
    .img-box{
      width: 25px;
      height: 25px;
      border-radius: 50%;
      overflow: hidden;
      box-sizing: border-box;
      img{
        width: 100%;
        height: 100%;
      }
    }
    >span{
      margin-left: 6px;
      font-size: 14px;
    }
    .drop-down{
      position: absolute;
      bottom: 0;
      width: 100%;
      background-color: #e5eecc;
      transform: translateY(100%);
      max-height: 0;
      transition: 0.5s;
      overflow: hidden;
      li{
        padding: 10px;
        a{
          width: 100%;
        }
      }
    }
    &:hover{
      .drop-down{
        max-height: 400px;
      }
    }
  }
}
</style>