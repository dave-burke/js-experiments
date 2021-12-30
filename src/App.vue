<script setup>
import { ref } from 'vue'
import Header from './components/Header.vue'
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'

const newTodo = ref('')

const todos = ref([])

function handleNewTodo() {
  console.log(`Save '${newTodo.value}`)
  todos.value.push({id: new Date().getDate(), text: newTodo.value, status: 'ACTIVE'})
  newTodo.value = ''
}

</script>

<template>
  <Header/>
  <TodoInput v-model="newTodo" @save="handleNewTodo"/>
  <TodoList :todos="todos"></TodoList>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
