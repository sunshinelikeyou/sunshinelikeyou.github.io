<!--
 * @Description: 
 * @Author: theman
 * @Date: 2019-06-10 20:34:46
 * @LastEditTime: 2019-06-12 23:54:54
 * @LastEditors: theman
 -->
<template>
  <div class="todo">
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :lg="6" :sm="12" :xs="24" v-for="(todo,index) in todos" :key="todo.id" style="margin-top:10px;">
            <el-card class="box-card" shadow="hover" :class="{isCompleted:todo.completed}"  @dblclick="alert(111)">
              <div slot="header" class="clearfix">
                <el-button style="float: left; padding:5 px" icon="el-icon-edit" circle></el-button>
                <span>{{ todo.title | slice10 }}</span>
                <el-button style="float: right; padding:5 px" icon="el-icon-delete" circle @click="deleteTodo(index)"></el-button>
              </div>
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="input your todo" v-model="todo.userId"></el-input>
            </el-card>
          </el-col>
        </el-row>
      </el-header>
    </el-container>
  </div>
</template>
<script>
// import axios from 'axios'
// import data from '../api/todos.js'
export default {
  data() {
    return {
      textarea:''
    };
  },
  computed: {
    todos() {
      return this.$store.state.todos;
    }
  },
  methods:{
     getTodos(){
        this.$store.commit('getTodos')
     },
     deleteTodo(index){
       this.$store.commit('deleteTodo',index)
     },
     changeStatus(){
        alert(111)
     }
  },
  filters: {
    // 限制标题的长度
    slice10(val) {
      return val.length > 30 ? val.slice(0, 20) + "..." : val;
    }
  },
  // 获取数据
  created(){
   axios.get('http://jsonplaceholder.typicode.com/todos?_limit=10')
        .then(res =>{
           this.$store.dispatch('getTodos',res.data)
        }) 
   
  }
};
</script>
<style scoped>
.box-card {
  background: #909399;
  color: #fff;
  border-radius: 10px;
}
.isCompleted {
  background: #67c23a;
  color: #fff;
  border-radius: 10px;
}
.el-button {
  margin-top: -10px;
}
</style>


