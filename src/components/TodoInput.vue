<template>
    <div>
        <input type="text" placeholder="What needs to be done?"
            :value="modelValue"
            @input="emit('update:model-value', $event.target.value)"
            @keypress.enter="emit('save')"
        />
    </div>
</template>
<script setup>
import { ref } from 'vue'

const props = defineProps({
    modelValue: String,
})

const emit = defineEmits(['update:model-value', 'save'])

</script>
