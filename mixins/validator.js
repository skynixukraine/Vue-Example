export default {
    data(){
        return {
            errors : {}
        }
    },
    methods : {
        // validators
        validateName(event){
            const name  = event.target.name;
            const value = event.target.value;

            // empty check
            if(!value){
                this.errors[name] = this.$t('errors.form.required-field');
                return false
            }

            this.clearError(name);
            return true;
        },
        validateEmail(event){
            const name  = event.target.name;
            const value = event.target.value;
            // empty check
            if(!value){
                this.errors[name] = this.$t('errors.form.required-field');
                return false;
            }
            // name check
            if(!this.checkEmailLength(value)){
                this.errors[name] = this.$t('errors.form.unvalid-email-length');
                return false;
            }
            // length check
            if(!this.checkEmailName(value)){
                this.errors[name] = this.$t('errors.form.unvalid-email-name');
                return false;
            }

            this.clearError(name);
            return true;
        },
        validatePassword(event){
            const name     = event.target.name;
            const value    = event.target.value;

            // empty check
            if(!value){
                this.errors[name] = this.$t('errors.form.required-field');
                return false;
            }
            if(!this.checkPassword(value)){
                this.errors[name] = this.$t('errors.form.password-has-problem');
                return false;
            }

            this.clearError(name);
            return true;
        },
        validateConfirmPassword(event, compareInput){
            const name         = event.target.name;
            const value        = event.target.value;
            const compareValue = compareInput.value;

            // empty check
            if(!value){
                this.errors[name] = this.$t('errors.form.required-field');
                return false;
            }
            // passwords equal check
            if(!this.checkStringEqual(value, compareValue)){
                this.errors[name] = this.$t('errors.form.passwords-not-equal');
                return false;
            }

            this.clearError(name);
            return true;
        },
        validateConfirmEmail(event, compareInput){
            const name         = event.target.name;
            const value        = event.target.value;
            const compareValue = compareInput.value;

            // empty check
            if(!value){
                this.errors[name] = this.$t('errors.form.required-field');
                return false;
            }

            // emails equal check
            if(!this.checkStringEqual(value, compareValue)){
                this.errors[name] = this.$t('errors.form.emails-not-equal');
                return false;
            }

            this.clearError(name);
            return true;
        },
        validatePhone(eventValue, telInput){
            // more info about telInput - https://github.com/EducationLink/vue-tel-input
            const name = 'phone_number';

            // empty check
            if(eventValue.length === 0){
                if(!telInput.isValid){
                    delete this.errors[`${name}_invalid`];
                }
                this.errors[name] = this.$t('errors.form.required-field');
                return false;
            } else{
                delete this.errors[name];
            }
            // phone format check
            if(!telInput.isValid){
                this.errors[`${name}_invalid`] = this.$t('errors.form.invalid-number');
                return false;
            } else{
                delete this.errors[`${name}_invalid`];
                return true;
            }
        },
        validateAccept(event, value){
            const name = event.target.name;

            // empty check
            if(!value){
                this.errors[name] = this.$t('errors.form.required-field');
                return false;
            }

            this.clearError(name);
            return true;
        },
        validateFileExtension(event){
            const name   = event.target.name;
            const type   = event.target.files[0].type;
            const sizeMb = event.target.files[0].size / 1024 / 1024;

            // type check
            if(!this.checkFileType(type)){
                this.errors[name] = this.$t('errors.form.file-type');
                return false;
            }
            // size check
            if(!this.checkFileSize(sizeMb)){
                this.errors[`${name}_size`] = this.$t('errors.form.file-size');
                return false;
            }

            if(this.errors.hasOwnProperty(`${name}_size`)){
                delete this.errors[`${name}_size`];
            }

            this.clearError(name);
            return true;
        },
        validateVerifyCode(event, name) {
            console.log('validatefunc')
            const value = event.target.value;

            // empty check
            if(!value){
                console.log(888)
                this.errors[name] = this.$t('errors.form.required-field');
                return false;
            }
            if(!this.checkSmsByNumberType(value)) {
                console.log(999)
                this.errors[name] = this.$t('errors.form.invalid-number');
                return false;
            }
            return true;
        },
        // checkers
        checkSmsByNumberType(value) {
            return (typeof parseInt(value) === 'number')
        },
        checkEmailName(email){
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        checkPassword(pass){
            var re = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*.])(?!.*[\s]).{6,100})/;
            return re.test(pass);
        },
        checkEmailLength(email){
            return (email.length < 76);
        },
        checkStringEqual(stringOne, stringTwo){
            return stringOne === stringTwo;
        },
        checkFileTypeImage(type) {
            let result = false;
            const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];

            allowedTypes.forEach((element) => {
                if (element === type) {
                    result = true;
                }
            });

            return result;
        },
        checkFileType(type) {
            const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];
            return allowedTypes.includes(type);
        },
        checkFileSize(sizeMb){
            const allowedSizeMb = 10;
            return sizeMb < allowedSizeMb;
        },

        clearError(name){
            if(this.errors.hasOwnProperty(name)){
                delete this.errors[name];
            }
        }
    },
}