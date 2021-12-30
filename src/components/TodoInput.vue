<template>
    <div>
        <input type="text" placeholder="What needs to be done?"
            :value="modelValue"
            @input="handleChange"
        />
    </div>
</template>
<script setup>
import { ref } from 'vue'

const props = defineProps({
    modelValue: String,
})

const emit = defineEmits(['update:model-value'])

const handleChange = (e) => {
    emit('update:model-value', e.target.value)
}

</script>
