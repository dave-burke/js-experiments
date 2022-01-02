<template>
  <div>
    <input type="checkbox" :checked="isDone" @input="handleCheckboxClick" />
    {{ todo.text }} ({{ todo.status }})
    <button @click="emit('delete')">X</button>
  </div>
</template>
<script setup>
import { computed } from 'vue'

const props = defineProps({
  todo: Object,
})

const emit = defineEmits(['delete', 'updateStatus'])

const isDone = computed(() => props.todo.status === 'DONE')

function handleCheckboxClick(e) {
  e.preventDefault()
  if (isDone.value) {
    emit('updateStatus', 'ACTIVE')
  } else {
    emit('updateStatus', 'DONE')
  }
}
</script>
