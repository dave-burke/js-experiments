<template>
    <ul>
        <li v-for="todo in todos" :key="todo.id">
            <TodoItem :todo="todo" @delete="emit('delete', todo)"></TodoItem>
        </li>
    </ul>
</template>
<script setup>
import TodoItem from './TodoItem.vue';
const props = defineProps({
    todos: Array,
})
const emit = defineEmits(['delete'])
</script>