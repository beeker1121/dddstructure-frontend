<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { vMaska } from 'maska/vue'

// Props.
const props = defineProps({
    modelValue: {
        type: String,
        required: true
    },
    mask: {
        type: String,
        required: true
    },
    placeholder: {
        type: String,
        required: false
    }
});

// Constants.
const emit = defineEmits(['update:modelValue']);

// NOTE: No idea why this doesn't work, goes with
//       the watcher below, and the v-model on the
//       input was set to this before adding the
//       computed model.
// const maskedValue = ref(props.modelValue);
const unmaskedValue = ref('');

defineExpose({ unmaskedValue });

// Mounted.

// Computed.
const model = computed({
  get () {
    return props.modelValue
  },
  set () {
    return emit('update:modelValue', unmaskedValue.value)
  }
})

// Watchers.
// NOTE: No idea why this doesn't work, but using
//       the computed model does.
// watch(() => unmaskedValue.value, (newValue) => {
//     emit('update:modelValue', newValue);
// });
</script>

<template>
    <input
        v-model="model"
        v-maska:unmaskedValue.unmasked="props.mask"
        type="text"
        :placeholder="props.placeholder"
    />
</template>