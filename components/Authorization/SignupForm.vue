<template>
    <form
        action=""
        class="form"
        method="POST"
        @submit.prevent="onSubmit"
    >
        <div class="form__item">
            <div class="form__title">{{ $t('forms.enter-email') }}</div>
            <input class="input" type="email" name="email" v-model="models.email" @keyup="onEmailChange">
            <div class="form__message" v-if="errors['email']">{{ errors['email'] }}</div>
        </div>
        <div class="form__item">
            <div class="form__title">{{ $t('forms.create-password') }}</div>
            <input class="input" type="text" name="password" v-model="models.password" @keyup="onPasswordChange">
            <div class="form__message" v-if="errors['password']">{{ errors['password'] }}</div>
        </div>
        <div class="form__item">
            <div class="form__title">{{ $t('forms.confirm-password') }}</div>
            <input class="input" type="text" name="confirmPassword" v-model="models.confirmPassword" @keyup="onConfirmPasswordChange">
            <div class="form__message" v-if="errors['confirmPassword']">{{ errors['confirmPassword'] }}</div>
        </div>
        <div class="form__item">
            <div class="form__title">{{ $t('forms.phone-number') }}</div>
             <vue-tel-input v-model="models.phone" name="phone" @input="onPhoneChange"></vue-tel-input>
            <div class="form__message" v-if="errors['phone']">{{ errors['phone'] }}</div>
        </div>
        <div class="form__item">
            <div class="form__title">{{ $t('forms.upload-degree') }}</div>
            <input class="input" type="file" id="degree" name="degree" ref="degree" @change="onDegreeUpload">
        </div>
        <div class="form__item">
            <div class="form__title">{{ $t('forms.upload-certification') }}</div>
            <input class="input" type="file" id="certification" name="certification" ref="certification" @change="onCertificationUpload">
        </div>
        <div class="form__item">
            <div class="form__title">{{ $t('forms.i-accept') }}</div>
            <input type="checkbox" name="accept" v-model="models.accept" @change="onAcceptChange">
            <div class="form__message" v-if="errors['accept']">{{ errors['accept'] }}</div>
        </div>
        <div class="form__item">
            <button class="link link--button link--button-blue" type="submit">{{ $t('links.signup') }}</button>
        </div>
    </form>
</template>

<script>
// mixins
import validator from '~/mixins/validator'

export default {
    mixins: [validator],
    data() {
        return {
            models: {
                email: '',
                password: '',
                confirmPassword: '',
                phone: '',
                degree: '',
                certification: '',
                accept: false
            }
        }
    },
    methods: {
        onSubmit(event) {
            if (!this.validateForm(this.models)) {
                return false
            }

            const requestData = this.prepareDataForSending(this.models)

            // send request...
        },
        validateForm(models) {
            console.log('models: ', models);
            
            // check required fields
            if (!models.email) {
                this.errors['email'] = this.$t('errors.form.required-field')
                return false
            }
            return true
        },
        prepareDataForSending(models) {
            let data = {}

            return data
        },



        // inputs changes
        onEmailChange(event) {
            this.validateEmail(event)
            this.$forceUpdate()
        },
        onPasswordChange(event) {      
            this.validateConfirmPassword(event, { comparePassword: this.models.confirmPassword, compareName: 'confirmPassword' })
            this.$forceUpdate()
        },
        onConfirmPasswordChange(event) {
            this.validateConfirmPassword(event, { comparePassword: this.models.password, compareName: 'password' })
            this.$forceUpdate()
        },
        onPhoneChange(formattedNumber, telInput) {
            this.validatePhone(telInput, 'phone')
        },
        onAcceptChange(event) {
            this.validateAccept(event, this.models.accept)
        },
        onDegreeUpload() {
            this.models.degree = this.$refs.degree.files[0];
        },
        onCertificationUpload() {
            this.models.certification = this.$refs.certification.files[0];
        }
    }
}
</script>