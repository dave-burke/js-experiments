<template>
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      <TodoItem
        :todo="todo"
        @delete="emit('delete', todo)"
        @update-status="emit('updateStatus', { todo, newStatus: $event })"
      ></TodoItem>
    </li>
  </ul>
</template>
<script setup>
import TodoItem from './TodoItem.vue'

defineProps({
  todos: {
    type: Array,
    required: true,
  },
})
const emit = defineEmits(['delete', 'updateStatus'])
</script>
