<template>
    <form action class="form form--register" method="POST" @submit.prevent="onSubmit">
        <div class="form__item form__item--login">
            <div class="form__title form__title--login">{{ $t('forms.enter-email') }}</div>
            <input
                class="input input--login"
                type="email"
                name="email"
                ref="email"
                v-model="models.email"
                @keyup="onEmailChange"
            />
            <img
                class="check-icon"
                :src="require('~/static/images/icons/check-icon.svg')"
                alt="check-icon"
            />
            <div class="form__message" v-if="errors.email">{{ errors.email }}</div>
        </div>
        <div class="form__item form__item--password">
            <div class="form__title form__title--password">{{ $t('forms.create-password') }}</div>
            <input
                class="input"
                type="password"
                name="password"
                ref="password"
                v-model="models.password"
                @keyup="onPasswordChange"
            />
            <img
                class="eye-icon"
                :src="require('~/static/images/icons/eye-icon.svg')"
                alt="eye-icon"
            />
            <div class="form__message" v-if="errors.password">{{ errors.password }}</div>
        </div>
        <div class="form__item">
            <div class="form__title form__title--password">{{ $t('forms.confirm-password') }}</div>
            <input
                class="input"
                type="password"
                name="password_confirmation"
                ref="password_confirmation"
                v-model="models.password_confirmation"
                @keyup="onConfirmPasswordChange"
            />
            <div
                class="form__message"
                v-if="errors.password_confirmation"
            >{{ errors.password_confirmation }}</div>
        </div>
        <div class="form__item">
            <div class="form__title form__title--phone_number">{{ $t('forms.phone-number') }}</div>
            <vue-tel-input
                id="vue-tel-input"
                name="phone_number"
                v-model="models.phone_number"
                @input="onPhoneChange"
            ></vue-tel-input>
            <div class="form__message" v-if="errors.phone_number">{{ errors.phone_number }}</div>
        </div>
        <div class="form__item">
            <div class="form__title form__title--degree">{{ $t('forms.upload-degree') }}</div>
            <input
                class="input input--hidden"
                type="file"
                name="degree"
                ref="degree"
                @change="onDegreeUpload"
            />

            <button
                class="link link--button link--button-white link--button--upload"
                type="button"
                @click="addFileDegree"
            >
                <img
                    class="paper-fastener-button-image"
                    :src="require('~/static/images/icons/paper-fastener-button-icon.svg')"
                    alt="paper-fastener-button"
                />
                <p>Add Degree</p>
            </button>

            <div class="form__message" v-if="errors.degree">{{ errors.degree }}</div>
        </div>
        <div class="form__item">
            <div
                class="form__title form__title--certification"
            >{{ $t('forms.upload-certification') }}</div>
            <input
                class="input input--hidden"
                type="file"
                name="certification"
                ref="certification"
                @change="onCertificationUpload"
            />
            <button
                class="link link--button link--button-white link--button--upload"
                type="button"
                @click="addFileCertification"
            >
                <img
                    class="paper-fastener-button-image"
                    :src="require('~/static/images/icons/paper-fastener-button-icon.svg')"
                    alt="paper-fastener-button"
                />
                <p>Add Certification</p>
            </button>
            <div class="form__message" v-if="errors.certification">{{ errors.certification }}</div>
        </div>
        <div class="form__item form__item--checkbox">
            <div class="form__title form__title--accepted">{{ $t('forms.i-accept') }}</div>
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
        recaptcha
    ],

    created() {
        if (process.client) {
            this.$recaptchaLoaded()
                .then(() => {
                    this.loadAndSetRecaptchaToken(this.$recaptchaActions.registerDoctor)
                })
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
            isFormSending: false,
        }
    },

    methods: {
        async onSubmit() {
            this.isFormSending = true
            if ( !this.validateForm(this.models) ) {
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
                this.$root.$emit('showNotify', { type: 'error', text: 'Имейл не заполнен' })
                return false
            }
            if (!models.password) {
                this.errors['password'] = this.$t('errors.form.required-field')
                this.$forceUpdate()
                this.$root.$emit('showNotify', { type: 'error', text: 'Пароль не заполнен' })
                return false
            }
            if (!models.password_confirmation) {
                this.errors['password_confirmation'] = this.$t('errors.form.required-field')
                this.$forceUpdate()
                this.$root.$emit('showNotify', { type: 'error', text: 'Конфирм Пароль не заполнен' })
                return false
            }
            if (!models.phone_number) {
                this.errors['phone_number'] = this.$t('errors.form.required-field')
                this.$forceUpdate()
                this.$root.$emit('showNotify', { type: 'error', text: 'Телефон не заполнен' })
                return false
            }
            if (!models.accepted) {
                this.errors['accepted'] = this.$t('errors.form.required-field')
                this.$forceUpdate()
                this.$root.$emit('showNotify', { type: 'error', text: 'Вы должны согласится с правилами сайта' })
                return false
            }

            // check recaptcha token exist
            if (!this.recaptchaToken) {
                this.$root.$emit('showNotify', { type: 'error', text: 'Нет токена рекапчи' })
                return false
            }

            return true
        },

        handleErrorResponse(errors) {
            if (Object.keys(errors).length === 0) {
                return true
            }

            for (let fieldName in errors) {
                this.errors[fieldName] = errors[fieldName][0]
            }
            this.$forceUpdate()
            return true
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