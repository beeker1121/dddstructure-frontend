import { defineStore } from 'pinia'

import apiUser from '../api-user'

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            user: {} as any
        }
    },
    actions: {
        getUser() {
            // Call the API.
            apiUser.getUser()
            .then(res => res.json()).then((res) => {
                // Handle errors.
                if (res.errors) {
                    return
                }

                // Set user.
                this.user = res.data
            }).catch((err) => {
                console.log('error: ' + err)
            })
        }
    }
})