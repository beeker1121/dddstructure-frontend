<script setup lang="ts">
import { onMounted } from 'vue'

import { useModalStore } from '../../stores/modal'

// Constants.

// Props.
// const props = defineProps({
//     prop1: String
// })

// Data.


// Stores.
const modalStore = useModalStore()

// Mounted.
onMounted(() => {})

// Computed.

// Watchers.

// Methods.
const close = () => {
    modalStore.show = false
}

</script>

<template>
    <div v-if="modalStore.show" class="modal-wrapper">
        <div @click="close" class="background"></div>
        <div class="modal">
            <div class="title">{{ modalStore.title }}</div>
            <div class="message">{{ modalStore.message }}</div>
            <button class="green-bg" @click="close">Close</button>
        </div>
    </div>
</template>

<style scoped>
.modal-wrapper {
    position: fixed;
    display: flex;
    place-items: center;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    z-index: 3;

    .background {
        position: absolute;
        top: 0;
        left: 0;
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.1);
    }

    .modal {
        margin: 0 auto;
        padding: 12px var(--spacing-three);
        max-width: 400px;
        min-width: 250px;
        background-color: #fff;
        text-align: center;
        border-radius: 4px;
        box-shadow: var(--box-shadow-container);
        z-index: 3;

        .title {
            margin: 0 0 var(--spacing) 0;
            font-size: var(--font-size-h3);
            font-weight: var(--font-weight-600);
        }
    }
}
</style>