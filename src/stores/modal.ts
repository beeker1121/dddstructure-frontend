import { defineStore } from 'pinia'

export interface Modal {
    type: string
    title: string
    message: string
    show: boolean
}

export const useModalStore = defineStore('modal', {
    state: (): Modal => {
        return {
            type: '',
            title: '',
            message: '',
            show: false
        }
    },
    actions: {
        modal(type: string, title: string, message: string) {
            this.$state.type = type
            this.$state.title = title
            this.$state.message = message
            this.$state.show = true
        },
        closeModal() {
            this.type = ''
            this.title = ''
            this.message = ''
            this.show = false
        }
    }
})