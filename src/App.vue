<script setup>
import { ref } from 'vue'
import Header from './components/Header.vue'
import TodoInput from './components/TodoInput.vue'

const newTodo = ref('')

</script>

<template>
  <Header/>
  <TodoInput v-model="newTodo"/>
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
