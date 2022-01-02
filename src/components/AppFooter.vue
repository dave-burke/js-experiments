<template>
  <footer>
    {{ nIncomplete }} active items.
    <button v-if="hasCompletedItems" @click="emit('clear-complete')">Clear Complete</button>
    {{ hasCompletedItems }}
  </footer>
</template>
<script setup>
import { computed } from 'vue'

const props = defineProps({
  todos: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['clear-complete'])

const hasCompletedItems = computed(() => props.todos.includes(item => item.status === 'DONE'))
const nIncomplete = computed(() => props.todos.filter(item => item.status === 'ACTIVE').length)
</script>
