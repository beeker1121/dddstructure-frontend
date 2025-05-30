import { defineStore } from 'pinia'

import apiUser from '../api-user'
import { useModalStore } from './modal'

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            user: {} as any
        }
    },
    actions: {
        getUser() {
            // Call the API.
            return apiUser.getUser()
            .then(res => res.json()).then((res) => {
                // Handle errors.
                if (res.errors) {
                    return
                }

                // Set user.
                this.user = res.data
            }).catch((err) => {
                const modalStore = useModalStore()
                modalStore.modal('error', 'Error', 'Error getting user')
                return
            })
        }
    }
})