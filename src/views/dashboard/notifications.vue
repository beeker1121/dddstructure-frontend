<script setup lang="ts">
import { onMounted } from 'vue'

import { useNotificationsStore } from '../../stores/notifications'

// Constants.

// Props.
// const props = defineProps({
//     prop1: String
// })

// Data.


// Stores.
const notificationsStore = useNotificationsStore()

// Mounted.
onMounted(() => {})

// Computed.

// Watchers.

// Methods.

</script>

<template>
    <div class="notifications">
        <TransitionGroup name="notification" tag="div">
            <template v-for="notification in notificationsStore.notifications" :key="notification">
                <div :class="{'notification': true, 'success': notification.type === 'success'}">
                    <div v-if="notification.title" class="title">{{ notification.title }}</div>
                    <div class="message">{{ notification.message }}</div>
                </div>
            </template>
        </TransitionGroup>
    </div>
</template>

<style scoped>
.notifications {
    position: fixed;
    left: 0;
    right: 0;
    margin: 0 auto;
    max-width: 300px;
    z-index: 1;

    .notification {
        margin: var(--spacing) 0 0 0;
        padding: var(--spacing);
        text-align: center;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 2px 1px 3px 0 rgba(37, 37, 37, 0.2);
        /* animation: slide-down .5s; */

        .title {
            margin: 0 0 var(--spacing) 0;
            font-weight: var(--font-weight-600);
        }

        .message {
            font-size: var(--font-size-small);
            font-weight: var(--font-weight-500);
        }

        &.success {
            color: #fff;
            background-color: #61a839;
        }
    }
}

.notification-enter-active {
        animation: slide-down .5s;
        transition: all 0.5s ease;
    }

.notification-leave-active {
    animation: slide-down .5s reverse;
    transition: all 0.5s ease;
}

.notification-enter-from,
.notification-leave-to {
    opacity: 0;
}

@keyframes slide-down {
    0% {
        transform: translateY(-120%);
    }

    100% {
        transform: translateY(0%);
    }
}
</style>