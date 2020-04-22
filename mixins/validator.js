export default {
    data(){
        return {
            errors : {}
        }
    },
    methods : {
        // validators
        validateDate(event) {
            const name  = event.target.name;
            let value = event.target.value.trim();
            let dateArr = value.split('-');
            let timeArr = (new Date()).getTime() >= (new Date(dateArr[2], dateArr[1], dateArr[0])).getTime();

            // empty check
            if(!value){
                this.errors[name] = this.$t('errors.form.required-field');
                return false
            }

            if(!this.checkDateFormat(value, dateArr)){
                this.errors[name] = this.$t('errors.form.validation-failed');
                return false;
            }

            if(!timeArr) {
                this.errors[name] = this.$t('errors.form.validation-failed');
                return false;
            }

            this.clearError(name);
            return true;
        },
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
        validateQuest(event, compareInput) {
            const name  = event.target.name;
            const value = parseInt(event.target.value);
            let compareInputVal = parseInt(compareInput);

            // empty check
            if(!value){
                this.errors[name] = this.$t('errors.form.required-field');
                return false
            }
            if(value !== compareInput) {
                this.errors[name] = this.$t('errors.form.error-quest');
                return false;
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
            const value = event.target.value;

            // empty check
            if(!value){
                this.errors[name] = this.$t('errors.form.required-field');
                return false;
            }
            if(!this.checkSmsByNumberType(value)) {
                this.errors[name] = this.$t('errors.form.invalid-number');
                return false;
            }
            return true;
        },
        // checkers
        checkDateFormat(date, dateArr) {
            var re = /^\d{1,2}\-\d{1,2}\-\d{4}$/;
            var regs = re.test(date);
            if (regs) {
                if((dateArr[1] == 0 || dateArr[1] == '00') || dateArr[1] > 12) {
                    return false;
                }
                if(dateArr[0] < 1 || dateArr[0] > 31) {
                    return false;
                }
                if(dateArr[2] < 1902 || dateArr[2] > (new Date()).getFullYear()) {
                    return false;
                }
                return true;
            }
        },
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