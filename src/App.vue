<script setup>
import { ref } from 'vue'
import Header from './components/Header.vue'
import TodoInput from './components/TodoInput.vue'

const newTodo = ref('')

function handleNewTodo() {
  console.log(`Save '${newTodo.value}`)
}

</script>

<template>
  <Header/>
  <TodoInput v-model="newTodo" @save="handleNewTodo"/>
  <p>"{{newTodo}}"</p>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
