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
    },
    valueFormat: {
        type: String,
        required: false,
        default: 'unmasked'
    },
    id: {
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
const value = ref('');

defineExpose({ value });

// Mounted.

// Computed.
const model = computed({
  get () {
    return props.modelValue
  },
  set () {
    return emit('update:modelValue', value.value)
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
    <div>
        <input
            v-if="props.valueFormat === 'unmasked'"
            v-model="model"
            v-maska:value.unmasked="props.mask"
            :id="props.id"
            type="text"
            :placeholder="props.placeholder"
        />
        <input
            v-if="props.valueFormat === 'masked'"
            v-model="model"
            v-maska:value.masked="props.mask"
            :id="props.id"
            type="text"
            :placeholder="props.placeholder + '2928'"
        />
    </div>
</template>