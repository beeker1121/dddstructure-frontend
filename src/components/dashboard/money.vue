<script setup lang="ts">
import { useCurrencyInput, ValueScaling } from 'vue-currency-input'
import { watch } from 'vue'

// Props.
const props = defineProps({
    modelValue: Number,
    currency: {
        type: String,
        default: 'USD'
    }
})

// Constants.
const { inputRef, formattedValue, setValue } = useCurrencyInput({
    currency: props.currency,
    precision: 2,
    valueRange: { min: 0 },
    valueScaling: ValueScaling.precision
})

// Watchers.
watch(() => props.modelValue, (newValue) => {
    setValue(newValue as number)
})
</script>

<template>
    <input type="text" ref="inputRef" v-model="formattedValue" />
</template>