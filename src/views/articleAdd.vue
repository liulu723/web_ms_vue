<template>
  <div class="main">
    <el-form ref="form" :model="form" label-width='80px' class="base-form">
      <p class="p-title">{{info[type].title}}</p>
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="form.author"></el-input>
      </el-form-item>
      <el-form-item label="发布时间">
        <el-date-picker type="date" format='yyyy-MM-dd'  value-format="yyyy-MM-dd" placeholder="选择时间" v-model="form.time" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="简介">
        <el-input type="textarea" v-model="form.intro"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input type="textarea" v-model="form.content" :rows="6"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'ArticleAdd',
  data() {
    return {
      form:{
        title: '',
        author: '',
        intro: '',
        content: '',
        time: ''
      },
      info:[{
        title:'添加文章',
      }, {
        title:'编辑文章',
      }],
      type:0
    }
  },
  mounted(){
    this.type = this.$route.params.type
    if(this.type){
      let article = this.$store.state.editorArticle
      this.form = article
    }else{
      this.form = {
        title: '',
        author: '',
        intro: '',
        content: '',
        time: ''
      }
    }
  },
  methods:{
    onSubmit(){
      if(this.type){
        this.$apis.articleEditor(this.form).then(res => {
          this.$message({
            type:'success',
            message:'编辑成功!!!'
          })
          this.$router.push({
            name:'Article'
          })
        }) 
      }else{
        this.$apis.articleAdd(this.form).then(res => {
          this.$message({
            type:'success',
            message:'添加成功!!!'
          })
          if(!res.data.state){
            this.form.title = ''
            this.form.author = ''
            this.form.intro = ''
            this.form.content = ''
            this.form.time = ''
          }
          this.$router.push({
            name:'Article'
          })
        })       
      }
    }
  }
}
</script>
<style lang="less" scoped>
.top{
  display: flex;
   width: calc(80%);
   margin: 10px auto 0;
   justify-content: space-between;
   .el-input{
     width: 40%;
   }
}
.main{
  margin-left: 156px;
  padding-top: 58px;
}
.content{
  height: 1000px;
}
.base-form{
  width: calc(80%);
  min-width: 800px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
}
.p-title{
  text-align: center;
  margin-bottom: 20px;
}
</style>