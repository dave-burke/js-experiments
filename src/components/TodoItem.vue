<template>
    <div>
        {{todo.text}} ({{todo.status}})
        <button @click="emit('delete')">X</button>
    </div>
</template>
<script setup>
const props = defineProps({
    todo: Object,
})

const emit = defineEmits(['delete'])
</script>