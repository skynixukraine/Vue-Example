export default {
    data() {
        return {
            errors: {}
        }
    },
    methods: {
        // validators
        validateName(event) {
            const name = event.target.name
            const value = event.target.value

            // empty check
            if (!value) {
                this.errors[name] = this.$t('errors.form.required-field')
                return false
            }

            // clean error if exist
            if (this.errors.hasOwnProperty(name)) {
                delete this.errors[name]
            }

            return true
        },
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

            // clean error if exist
            if (this.errors.hasOwnProperty(name)) {
                delete this.errors[name]
            }

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

            // clean error if exist
            if (this.errors.hasOwnProperty(name)) {
                delete this.errors[name]
            }

            return true
        },
        validateConfirmPassword(event, compareInput) {
            const name = event.target.name
            const value = event.target.value
            const compareName = compareInput.name
            const compareValue = compareInput.value

            // empty check
            if (!value) {
                this.errors[name] = this.$t('errors.form.required-field')
                return false
            }
            // passwords equal check
            if (!this.checkStringEqual(value, compareValue)) {
                this.errors[name] = this.$t('errors.form.passwords-not-equal')
                return false
            }

            // clean error if exist
            if (this.errors.hasOwnProperty(name)) {
                delete this.errors[name]
            }
            if (this.errors.hasOwnProperty(compareName)) {
                delete this.errors[compareName]
            }

            return true
        },
        validatePhone(telInput) {
            // more info about telInput - https://github.com/EducationLink/vue-tel-input
            const name = telInput.name

            // phone format check
            if (!telInput.isValid) {
                this.errors[name] = this.$t('errors.form.invalid-number')
                return false
            }

            // clean error if exist
            if (this.errors.hasOwnProperty(name)) {
                delete this.errors[name]
            }

            return true
        },
        validateAccept(event, value) {
            const name = event.target.name

            // empty check
            if (!value) {
                this.errors[name] = this.$t('errors.form.required-field')
                return false
            }

            // clean error if exist
            if (this.errors.hasOwnProperty(name)) {
                delete this.errors[name]
            }

            return true
        },
        validateFilePDF(event) {
            const name = event.target.name
            const type = event.target.files[0].type
            const sizeMb = event.target.files[0].size/1024/1024

            // type check
            if (!this.checkFileTypePDF(type)) {
                this.errors[name] = 'Invalid type. Must be PDF.'
                return false
            }
            // size check
            if (!this.checkFileSize(sizeMb)) {
                this.errors[name] = 'File size is too large.'
                return false
            }

            // clean error if exist
            if (this.errors.hasOwnProperty(name)) {
                delete this.errors[name]
            }

            return true
        },

        validateFileImage(event) {
            const name = event.target.name
            const type = event.target.files[0].type
            const sizeMb = event.target.files[0].size/1024/1024

            // type check
            if (!this.checkFileTypeImage(type)) {
                this.errors[name] = 'Invalid type. Must be Image.'
                return false
            }
            // size check
            if (!this.checkFileSize(sizeMb)) {
                this.errors[name] = 'File size is too large.'
                return false
            }

            // clean error if exist
            if (this.errors.hasOwnProperty(name)) {
                delete this.errors[name]
            }

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
        checkFileTypeImage(type) {
            const allowedTypes = ['image/png', 'image/jpeg']
            allowedTypes.forEach((element) => {
                if (element === type) {
                    return true
                }
            })
            return false
        },
        checkFileTypePDF(type) {
            const allowedTypes = ['application/pdf']
            allowedTypes.forEach((element) => {
                if (element === type) {
                    return true
                }
            })
            return false
        },
        checkFileSize(sizeMb) {
            const allowedSizeMb = 50
            return sizeMb < allowedSizeMb
        },
    },
}