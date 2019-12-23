export default {
    data() {
        return {
            errors: {}
        }
    },
    methods: {
        // validators
        validateEmail(event) {
            const name = event.target.name
            const value = event.target.value

            // empty check
            if (!value) {
                this.errors[name] = this.$t('errors.form.required-field')
                return false
            }
            // name check
            if (!this.checkEmailName(value)) {
                this.errors[name] = this.$t('errors.form.unvalid-email-name')
                return false
            }

            delete this.errors[name]
            return true
        },
        validatePassword(event) {
            console.log('value: ', event.target.value)
            console.log('name: ', event.target.name)
        },


        // checkers
        checkEmailName(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return re.test(email)
        }
    }
}