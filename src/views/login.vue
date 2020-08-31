<template>
  <div class="main">
    <div>
      <div class="bg">
        <p>中翰税务官网后台管理系统</p>
        <el-form ref='elForm' v-model="info" class="base-form" >
          <el-form-item>
           <el-input v-model="info.phone" placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item>
           <el-input v-model="info.password" placeholder="密码" type='password'></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="onSubmit(info)" class="submit">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data() {
    return {
      info: {
        phone: '',
        password:''
      }
    }
  },
  methods:{
    onSubmit(info){
      this.$apis.login(info).then(res =>{
        let data = res.data
        if(data.state){
          let {phone} = data.msg
          this.$store.commit('userInfo',{phone})
          this.$router.push({
            name:'Index'
          })
        }else{
           this.$message('账号或密码错误')
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.main{
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #1489e2;
}
.bg{
  width: 300px;
  margin: 140px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 30px 10px;
  border: 1px solid #eeeeee;
  background-color: white;
  box-shadow: 3px 3px 13px 0 rgba(0, 0, 0, 0.3);
}
.base-form{
  width: 100%;

}
.submit{
  margin-left: 50%;
  transform: translateX(-50%);
}
</style>