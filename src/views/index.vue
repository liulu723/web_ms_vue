<template>
  <div class="main">
    <div class="top">
      <el-input v-model="searchContent" autocomplete="off" placeholder="请输入搜索内容" @keyup.enter.native="search"></el-input>
      <el-button @click="addClick">添加用户</el-button>
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
          prop="phone"
          label="账号"
          width="280">
        </el-table-column>
         <el-table-column
          prop="password"
          label="密码">
        </el-table-column>
        <el-table-column
          prop="time"
          label="创建日期"
          width="200">
        </el-table-column>
        <el-table-column 
          label="操作"
          align='center'>  
          <template slot-scope="scope">
             <el-button type="text" size="small" @click="editorClick(scope.row, scope.$index)">编辑</el-button>
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
  name: 'Index',
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
    this.getUserList(this.searchContent,this.currentPage)
  },
  methods: {
    handleCurrentChange(val) {
      this.getUserList(this.searchContent,val-1)
    },
    editorClick(val,index){
      this.userForm.phone = val.phone
      this.dialogFormVisible = true
      this.dialogTypeNum = 1
      this.editorIndex = index
    },
    deleteClick(val,index){
      this.$confirm(`确定删除用户${val.phone}?`,'提示',{
        confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() =>{
        this.$apis.deleteUser({phone: val.phone}).then(res =>{
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
      this.dialogFormVisible = true
      this.dialogTypeNum = 0
    },
    confirmClick(){
      if(this.dialogTypeNum == 0){
        this.confirmAddUser()
      }else{
        this.confirmEditorUser(this.editorIndex)
      }
    },
    confirmAddUser(){
      if(!this.checkPhone(this.userForm.phone)){
        alert('手机号格式错误')
        return 
      }
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
      this.getUserList(this.searchContent, this.currentPage)
    },
    dialogClose(){
      this.userForm.phone = ""
      this.userForm.password = ""
    },
    checkPhone(phone){
      return /^1[3456789]\d{9}$/.test(phone)
    },
    getUserList(val,pageNo){
      this.$apis.userCount({val:val.trim()}).then(res => {
        if(res.code == 200){
          this.tableDataTotal =parseInt(res.data.msg)
        }
      })
      this.$apis.queryUserList({val: val.trim(),'pageNo':pageNo,}).then(res => {
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
</style>