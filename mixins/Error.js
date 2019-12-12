export default {
    methods: {
        fireDefaultError ({ statusCode, message }) {
            alert(message)
        },
        fireCriticalError ({ statusCode, message }) {
            this.$nuxt.error({ statusCode, message })
        },
    }
}