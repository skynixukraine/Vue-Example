<template>
    <div class="verify-email">
        <h1>Verify Email</h1>
        <p>{{ message }}</p>
        <p><NuxtLink :to="$routes.home.path" class="link link--button link--button-blue link--button-gradient" exact>Back to Home Page</NuxtLink></p>
    </div>
</template>

<script>
const DEFAULT_MESSAGE = ''

export default {
    created() {
         if (process.client) {
             this.verifyEmail()
         }
    },

    data() {
        return {
            message: DEFAULT_MESSAGE
        }
    },

    methods: {
        validateQuery(query) {
            if (query.hasOwnProperty('expires') && query.hasOwnProperty('id') && query.hasOwnProperty('signature')) {
                return true
            } else {
                this.message = 'Invalid vefiry data for sending.'
                return false
            }
        },

        validateToken(token) {
            if (!token) {
                this.message = 'You must has same browser.'
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

        verifyEmail() {
            if (this.validateQuery(this.$route.query) ) {
                const requestData = this.prepareDataForSending(this.$route.query)
                
                this.$store.dispatch('user/VERIFY_USER_EMAIL', requestData)
                    .then(response => {
                        this.message = response.message
                        // need this code for new component
                        // this.$store.dispatch('user/LOAD_USER', {
                        //     id: this.$cookies.get(this.$cookie.names.tokenId),
                        //     token: this.$cookies.get(this.$cookie.names.token)
                        // })
                    })
                    .catch(error => {
                        this.message = error.message
                    })
            }
        },
    }
}
</script>