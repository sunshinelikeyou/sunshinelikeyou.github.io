<!--
 * @Description: 
 * @Author: theman
 * @Date: 2019-06-10 20:34:46
 * @LastEditTime: 2019-06-12 23:51:01
 * @LastEditors: theman
 -->
<template>
  <div id="app">
    <el-container>
      <el-header style="height:auto">
        <el-row type="flex" justify="center">
          <el-breadcrumb type="flex" justify="center" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }" :xs="12">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path:'todo' }" :xs="12">ToDoList</el-breadcrumb-item>
            <el-input maxlength="15" show-word-limit clearable v-model="input" placeholder="input todo for your search" style="width:auto;"></el-input>
            <el-button type="primary" :xs="12">Search</el-button>
            <el-button type="success" :xs="12">Add ToDo</el-button>
          </el-breadcrumb>
        </el-row>
      </el-header>
      <router-view></router-view>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  data(){
    return{
      input:''
    }
  },
  created() {
    console.log(this.$uuid.v4());
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.el-breadcrumb__item {
  font-size: 20px;
  line-height: 40px;
}
.el-breadcrumb .el-breadcrumb__item :last-child .el-breadcrumb__separator {
  display: none;
}
@media (max-width: 767px) {
    .el-input{
      width: 100%!important;
    }
   .el-breadcrumb .el-button{
      width: 50%;
    }
    .el-button+.el-button{
      margin-left: 0!important;
    }
}
</style>
