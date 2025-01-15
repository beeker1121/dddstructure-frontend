import { defineStore } from 'pinia'

export interface Notification {
    type: string
    title: string
    message: string
}

interface State {
    notifications: Notification[]
}

export const useNotificationsStore = defineStore('notifications', {
    state: (): State => {
        return {
            notifications: []
        }
    },
    actions: {
        notify(type: string, title: string, message: string) {
            // Create new notification.
            const notification = {
                type,
                title,
                message
            }

            this.notifications.push(notification)

            setTimeout(() => {
                const index = this.notifications.indexOf(notification)
                if (index !== -1) {
                    this.notifications.splice(0, 1)
                }
            }, 3500)
        }
    }
})