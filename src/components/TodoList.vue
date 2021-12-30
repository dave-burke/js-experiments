<template>
    <li>
        <ul v-for="todo in todos">{{todo.text}}</ul>
    </li>
</template>
<script setup>
const props = defineProps({
    todos: Array,
})
</script>