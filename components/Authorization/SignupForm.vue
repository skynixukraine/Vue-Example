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
            <input class="input input--hidden" type="file" id="degree" name="degree" ref="degree" @change="onDegreeUpload">
            <button class="link link--button link--button-white" type="button" @click="addFileDegree">Add Degree</button>
        </div>
        <div class="form__item">
            <div class="form__title">{{ $t('forms.upload-certification') }}</div>
            <input class="input input--hidden" type="file" id="certification" name="certification" ref="certification" @change="onCertificationUpload">
            <button class="link link--button link--button-white" type="button" @click="addFileCertification">Add Certification</button>
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
import recaptcha from '~/mixins/recaptcha'

export default {
    mixins: [
        validator,
        recaptcha,
    ],
    data() {
        return {
            models: {
                email: '',
                password: '',
                confirmPassword: '',
                phone: '',
                degree: '',
                certification: '',
                accept: false,
            },
        }
    },

    created() {
        this.getRecaptchaToken()
    },

    methods: {
        async onSubmit(event) {
            const isFormValid = await this.validateForm(this.models)
            
            if (!isFormValid) {
                return false
            }

            

            const registerResponse = await store.dispatch('user/REGISTER_USER', registerRequestData).catch((e) => {
                error({ statusCode: e.status, message: e.message })
            })
            console.log('registerResponse: ', registerResponse)
            return true
        },
        async validateForm(models) {
            // check recaptcha token verify respone
            // before send formData
            await this.getTokenVerify(this.recaptchaToken)
            if (!this.isTokenVerify) {
                return false
            }
            // check required fields
            if (!models.email) {
                this.errors['email'] = this.$t('errors.form.required-field')
                return false
            }

            return true
        },
        prepareDataForSending(models) {
            let formData = new FormData()

            formData.append('email', this.email)
            formData.append('password', this.password)
            formData.append('password_confirmation', this.confirmPassword)
            formData.append('phone_number', this.phone)
            formData.append('password', this.password)

            return formData
        },


        // files upload
        addFileDegree() {
            this.$refs.degree.click()
        },
        addFileCertification() {
            this.$refs.certification.click()
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
        onDegreeUpload() {
            this.models.degree = this.$refs.degree.files[0];
        },
        onCertificationUpload() {
            this.models.certification = this.$refs.certification.files[0];
        },
        onAcceptChange(event) {
            this.validateAccept(event, this.models.accept)
        },
    }
}
</script>