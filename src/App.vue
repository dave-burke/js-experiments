<script setup>
import { ref } from 'vue'
import Header from './components/Header.vue'
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'
import Footer from './components/Footer.vue'

const newTodo = ref('')

const todos = ref([])

function handleNewTodo() {
  todos.value.push({ id: Date.now(), text: newTodo.value, status: 'ACTIVE' })
  newTodo.value = ''
}

function handleDelete(e) {
  todos.value = todos.value.filter(item => item.id !== e.id)
}

function handleUpdateStatus(e) {
  todos.value.find(item => item.id === e.todo.id).status = e.newStatus
}

function handleMarkAllDone() {
  if (todos.value.every(item => item.status === 'DONE')) {
    todos.value.forEach(item => (item.status = 'ACTIVE'))
  } else {
    todos.value.forEach(item => (item.status = 'DONE'))
  }
}
</script>

<template>
  <Header />
  <TodoInput v-model="newTodo" @save="handleNewTodo" />
  <button @click="handleMarkAllDone">Toggle all 'Done'</button>
  <TodoList :todos="todos" @delete="handleDelete" @update-status="handleUpdateStatus"></TodoList>
  <Footer :todos="todos"></Footer>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
