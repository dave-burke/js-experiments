<template>
  <footer>{{ nIncomplete }} active items.</footer>
</template>
<script setup>
import { computed } from 'vue'

const props = defineProps({
  todos: {
    type: Array,
    required: true,
  },
})

const nIncomplete = computed(() => props.todos.filter(item => item.status === 'ACTIVE').length)
</script>
