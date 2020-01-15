<template>
    <div class="verify-email">
        <h1>Verify Email</h1>
        <p>{{ message }}</p>
        <p><NuxtLink :to="$routes.home.path" class="link link--button link--button-blue" exact>Back to Home Page</NuxtLink></p>
    </div>
</template>

<script>
const DEFAULT_MESSAGE = ''

export default {
    mounted() {
        setTimeout(() => {
            this.onVerifyEmail()
        }, 0)
    },

    data() {
        return {
            message: DEFAULT_MESSAGE
        }
    },

    methods: {
        validateQueryData(query) {
            if (query.hasOwnProperty('expires') && query.hasOwnProperty('id') && query.hasOwnProperty('signature')) {
                return true
            } else {
                this.message = 'Invalid vefiry data for sending.'
                return false
            }
        },

        validateCurrentUser(user, token, query) {
            if (!Object.keys(user).length || !token.access_token) {
                this.message = 'You must has same browser.'
                return false
            }
            if (parseInt(token.doctor_id) !==  parseInt(query.id)) {
                this.message = 'Inappropriate user.'
                return false
            }
            return true
        },

        prepareDataForSending(query) {
            const data = {
                expires: query.expires,
                id: query.id,
                signature: query.signature,
            }

            return data
        },

        onVerifyEmail() {
            if (process.client) {
                if (this.validateQueryData(this.$route.query) && this.validateCurrentUser(this.$store.getters['user/USER'], this.$store.getters['user/TOKEN'], this.$route.query)) {
                    const requestData = this.prepareDataForSending(this.$route.query)
                    this.$store.dispatch('user/VERIFY_USER_EMAIL', requestData)
                        .then(response => {
                            this.message = response.message
                            this.$store.dispatch('user/LOAD_USER', {
                                id: this.$store.getters['user/TOKEN'].doctor_id,
                                token: this.$store.getters['user/TOKEN'].access_token
                            })
                        })
                        .catch(error => {
                            this.message = error.message
                        })
                }
            }
        },
    }
}
</script>