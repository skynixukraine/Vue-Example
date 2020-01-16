<template>
    <form
        action=""
        class="form"
        method="POST"
        @submit.prevent="onSubmit"
    >
        <div class="form__item">
            <div class="form__title">{{ $t('forms.enter-email') }}</div>
            <input
                class="input"
                type="email"
                name="email"
                ref="email"
                v-model="models.email"
                @keyup="onEmailChange"
            />
            <div class="form__message" v-if="errors.email">{{ errors.email }}</div>
        </div>
        <div class="form__item">
            <div class="form__title">{{ $t('forms.create-password') }}</div>
            <input
                class="input"
                type="text"
                name="password"
                ref="password"
                v-model="models.password"
                @keyup="onPasswordChange"
            />
            <div class="form__message" v-if="errors.password">{{ errors.password }}</div>
        </div>
        <div class="form__item">
            <div class="form__title">{{ $t('forms.confirm-password') }}</div>
            <input
                class="input"
                type="text"
                name="password_confirmation"
                ref="password_confirmation"
                v-model="models.password_confirmation"
                @keyup="onConfirmPasswordChange"
            />
            <div class="form__message" v-if="errors.password_confirmation">{{ errors.password_confirmation }}</div>
        </div>
        <div class="form__item">
            <div class="form__title">{{ $t('forms.phone-number') }}</div>
            <vue-tel-input 
                name="phone_number"
                v-model="models.phone_number"
                @input="onPhoneChange"
            ></vue-tel-input>
            <div class="form__message" v-if="errors.phone_number">{{ errors.phone_number }}</div>
        </div>
        <div class="form__item">
            <div class="form__title">{{ $t('forms.upload-degree') }}</div>
            <input
                class="input input--hidden"
                type="file"
                name="degree"
                ref="degree"
                @change="onDegreeUpload"
            />
            <button class="link link--button link--button-white" type="button" @click="addFileDegree">Add Degree</button>
            <div class="form__message" v-if="errors.degree">{{ errors.degree }}</div>
        </div>
        <div class="form__item">
            <div class="form__title">{{ $t('forms.upload-certification') }}</div>
            <input
                class="input input--hidden"
                type="file"
                name="certification"
                ref="certification"
                @change="onCertificationUpload"
            />
            <button class="link link--button link--button-white" type="button" @click="addFileCertification">Add Certification</button>
            <div class="form__message" v-if="errors.certification">{{ errors.certification }}</div>
        </div>
        <div class="form__item">
            <div class="form__title">{{ $t('forms.i-accept') }}</div>
            <input
                type="checkbox"
                name="accepted"
                ref="accepted"
                v-model="models.accepted"
                @change="onAcceptChange"
            />
            <div class="form__message" v-if="errors.accepted">{{ errors.accepted }}</div>
        </div>
        <div class="form__item">
            <button
                class="link link--button link--button-blue"
                type="submit"
                :disabled="isFormSending"
            >{{ isFormSending ? 'loading...'  : $t('links.signup') }}</button>
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

    created() {
        if (process.client) {
            // load and set reCaptcha token for 'register_doctor' action
            this.loadAndSetRecaptchaToken(this.$recaptchaActions.registerDoctor)
        }
    },

    data() {
        return {
            models: {
                email: '',
                password: '',
                password_confirmation: '',
                phone_number: '',
                degree: '',
                certification: '',
                accepted: false,
            },
            isFormSending: false
        }
    },

    methods: {
        async onSubmit() {
            this.isFormSending = true
            if ( !this.validateForm(this.models) ) {
                this.$root.$emit('showNotify', { type: 'error', text: 'Форма не прошла предварительную валидацию.' })
                this.isFormSending = false
                return false
            }

            const formData = this.prepareDataForSending(this.models)

            this.$store.dispatch('user/REGISTER_USER', formData)
                .then((response) => {
                    this.$store.dispatch('user/LOAD_USER', { id: response.data.doctor_id, token: response.data.access_token })
                        .then((response) => {
                            this.$modal.show('register-success')
                            // re request captcha (need update after each form send)
                            this.loadAndSetRecaptchaToken(this.$recaptchaActions.registerDoctor)
                            this.isFormSending = false
                        })
                })
                .catch((response) => {
                    this.handleErrorResponse(response.errors)
                    // re request captcha (need update after each form send)
                    this.loadAndSetRecaptchaToken(this.$recaptchaActions.registerDoctor)
                    this.isFormSending = false
                })
        },

        validateForm(models) {
            // check required fields
            if (!models.email) {
                this.errors['email'] = this.$t('errors.form.required-field')
                this.$forceUpdate()
                return false
            }
            if (!models.password) {
                this.errors['password'] = this.$t('errors.form.required-field')
                this.$forceUpdate()
                return false
            }
            if (!models.password_confirmation) {
                this.errors['password_confirmation'] = this.$t('errors.form.required-field')
                this.$forceUpdate()
                return false
            }
            if (!models.phone_number) {
                this.errors['phone_number'] = this.$t('errors.form.required-field')
                this.$forceUpdate()
                return false
            }
            if (!models.accepted) {
                this.errors['accepted'] = this.$t('errors.form.required-field')
                this.$forceUpdate()
                return false
            }

            // check recaptcha token exist
            if (!this.recaptchaToken) {
                this.$root.$emit('showNotify', { type: 'error', text: 'Рекаптча ТОКЕН не обнаружен. Невозможно отправить форму.' })
                return false
            }

            return true
        },

        handleErrorResponse(errors) {
            for (let fieldName in errors) {
                this.errors[fieldName] = errors[fieldName][0]
            }
            this.$forceUpdate()
        },

        prepareDataForSending(models) {
            let formData = new FormData()

            // required fields
            formData.append('email', models.email)
            formData.append('phone_number', models.phone_number)
            formData.append('password', models.password)
            formData.append('password_confirmation', models.password_confirmation)
            formData.append('accepted', models.accepted)

            // unrequired fields
            if (models.degree) {
                formData.append('medical_degree', models.degree)
            }
            if (models.certification) {
                formData.append('medical_degree', models.certification)
            }

            // recaptcha token for action 'register_doctor'
            formData.append('recaptcha', this.recaptchaToken)

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
            this.validateConfirmPassword(event, this.$refs.password_confirmation)
            this.$forceUpdate()
        },
        onConfirmPasswordChange(event) {
            this.validateConfirmPassword(event, this.$refs.password)
            this.$forceUpdate()
        },
        onPhoneChange(formattedNumber, telInput) {
            this.validatePhone(telInput)
        },
        onDegreeUpload(event) {
            if (this.validateFilePDF(event)) {
                this.models.degree = event.target.files[0]  
            }
        },
        onCertificationUpload(event) {
            if (this.validateFilePDF(event)) {
                this.models.certification = event.target.files[0]  
            }
        },
        onAcceptChange(event) {
            this.validateAccept(event, this.models.accepted)
        },
    }
}
</script>