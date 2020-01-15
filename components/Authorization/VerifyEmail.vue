<template>
    <div class="verify-email">
        <h1>Verify Email</h1>
        <p>{{ message }}</p>
    </div>
</template>

<script>
const DEFAULT_MESSAGE = ''

export default {
    created() {
        this.onVerifyEmail()
    },

    data() {
        return {
            message: DEFAULT_MESSAGE
        }
    },

    methods: {
        validateQueryData(query) {
            return query.hasOwnProperty('expires') && query.hasOwnProperty('id') && query.hasOwnProperty('signature')
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
                if (this.validateQueryData(this.$route.query)) {
                    const requestData = this.prepareDataForSending(this.$route.query)
                    this.$store.dispatch('user/VERIFY_USER_EMAIL', requestData)
                        .then(response => {
                            this.message = response.message
                        })
                        .catch(error => {
                            this.message = error.message
                        })
                } else {
                    this.message = 'Invalid vefiry data for sending.'
                }
            }
        },
    }
}
</script>