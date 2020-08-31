<template>
  <div class="main">
    <div class="top">
      <el-input v-model="searchContent" autocomplete="off" placeholder="请输入搜索内容" @keyup.enter.native="search"></el-input>
      <el-button @click="addClick">添加文章</el-button>
    </div>
    <div class="base-table">
      <el-table
        :data="tableData">
        <el-table-column
          prop="date"
          label="序号"
          width="80"
          type="index"
          align='center'>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          width="200"
          show-overflow-tooltip>
        </el-table-column>
         <el-table-column
          prop="author"
          label="作者"
          width="90">
        </el-table-column>
         <el-table-column
          prop="intro"
          label="简介"
          width='400'
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="time"
          label="发布日期"
          width="120">
        </el-table-column>
        <el-table-column 
          label="操作"
          fixed="right"
          width="100">  
          <template slot-scope="scope">
             <el-button type="text" size="small" @click="editorClick(scope.row)">编辑</el-button>
             <el-button type="text" size="small" @click="deleteClick(scope.row,scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
        <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        layout="total, prev, pager, next, jumper"
        :total="this.tableDataTotal">
      </el-pagination>
    </div>
    <el-dialog :title="dialogType[dialogTypeNum].title" :visible.sync="dialogFormVisible" @close="dialogClose">
      <el-form :model="userForm">
        <el-form-item label="用户名">
          <el-input v-model="userForm.phone" autocomplete="off" :readonly="dialogType[dialogTypeNum].readonly" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="userForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmClick">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'Article',
  data() {
    return {
      isboolean:true,
      searchContent:' ',
      tableDataTotal:0,
      tableData: [],
      currentPage: 0,
      userForm:  {
        phone: '',
        password: ''
      },
      dialogFormVisible: false,
      dialogType:[{
        title:'添加用户',
        readonly:false,
      }, {
        title: "修改密码",
        readonly: true
      }],
      dialogTypeNum: 0,
      editorIndex: 0
    }
  },
  created(){
    this.getArticleList(this.searchContent,this.currentPage)
  },
  methods: {
    handleCurrentChange(val) {
      this.getArticleList(this.searchContent,val-1)
    },
    editorClick(val){
      console.log(val);
      this.$store.commit('editorArticle',val)

      this.$router.push({
        name: "ArticleAdd",
        params:{
          type:1
        }
      })
    },
    deleteClick(val,index){
      this.$confirm(`确定删除文章  ${val.title}?`,'提示',{
        confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() =>{
        this.$apis.articleDelete({id: val.id}).then(res =>{
          if(res.data.state){
            this.$message({
              type:'success',
              message:'删除成功'
            })
            this.tableData.splice(index,1)
          }
        })
      }).catch(() =>{
          this.$message({
              type: 'info',
              message: '已取消删除'
            }); 
        })
    },
    addClick(){
      // let routeData = this.$router.resolve({
      //   name: "ArticleAdd",
      //   params:{
      //     type:0
      //   }
      // });
      // window.open(routeData.href, '_blank');
      this.$router.push({
        name: "ArticleAdd",
        params:{
          type:0
        }
      })
    },
    confirmClick(){
      if(this.dialogTypeNum == 0){
        this.confirmAddUser()
      }else{
        this.confirmEditorUser(this.editorIndex)
      }
    },
    confirmAddUser(){
      this.$apis.addUser(this.userForm).then(() => {
        this.$message('添加成功')
        this.dialogFormVisible = false
      })
    },
    confirmEditorUser(index){
      let password = this.userForm.password
        this.$apis.editorUser(this.userForm).then(res => {
         if(res.data.state){
            this.$message({
              type:'success',
              message:'编辑成功'
            })
            this.tableData[index].password = password
         }
        })
       this.dialogFormVisible = false
    },
    search(){
      this.currentPage = 0
      this.getArticleList(this.searchContent, this.currentPage)
    },
    dialogClose(){
      this.userForm.phone = ""
      this.userForm.password = ""
    },
    getArticleList(val,pageNo){
      this.$apis.articleCount({val:val.trim()}).then(res => {
        if(res.code == 200){
          this.tableDataTotal =parseInt(res.data.msg)
        }
      })
      this.$apis.articleQueryAll({val: val.trim(),'pageNo':pageNo,}).then(res => {
        if(res.code == 200){
          if(res.data.msg.length >= 0){
            this.tableData = res.data.msg
          }
        }
      })
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
.base-table{
  width: calc(80%);
  min-width: 800px;
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.el-pagination{
  margin-top: 20px;
}
/deep/ .el-table td, .el-table th{
  padding: 8px 0;
}
/deep/ .el-table .el-table_1_column_4>div, /deep/.el-table .el-table_1_column_2 >div{
  overflow: hidden;  
  text-overflow: ellipsis;  
  display:block;  
  -webkit-line-clamp: 1;  
  white-space:nowrap;  
  -webkit-box-orient: vertical;
}
</style>