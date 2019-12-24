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
            const name = event.target.name
            const value = event.target.value

            // empty check
            if (!value) {
                this.errors[name] = this.$t('errors.form.required-field')
                return false
            }

            delete this.errors[name]
            return true
        },
        validateConfirmPassword(event, { comparePassword, compareName }) {
            const name = event.target.name
            const value = event.target.value

            // empty check
            if (!value) {
                this.errors[name] = this.$t('errors.form.required-field')
                return false
            }
            // passwords equal check
            if (!this.checkStringEqual(value, comparePassword)) {
                this.errors[name] = this.$t('errors.form.passwords-not-equal')
                return false
            }

            delete this.errors[name]
            delete this.errors[compareName]
            return true
        },
        validatePhone(telInput, name) {
            // more info about telInput - https://github.com/EducationLink/vue-tel-input

            if (!telInput.isValid) {
                this.errors[name] = this.$t('errors.form.invalid-number')
                return false
            }

            delete this.errors[name]
            return true
        },
        validateAccept(event, value) {
            const name = event.target.name

            // empty check
            if (!value) {
                this.errors[name] = this.$t('errors.form.required-field')
                return false
            }

            delete this.errors[name]
            return true
        },



        // checkers
        checkEmailName(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return re.test(email)
        },
        checkStringEqual(stringOne, stringTwo) {  
            return stringOne === stringTwo
        },
    }
}