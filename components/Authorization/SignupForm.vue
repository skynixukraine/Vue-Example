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
                name="confirmPassword"
                ref="confirmPassword"
                v-model="models.confirmPassword"
                @keyup="onConfirmPasswordChange"
            />
            <div class="form__message" v-if="errors.confirmPassword">{{ errors.confirmPassword }}</div>
        </div>
        <div class="form__item">
            <div class="form__title">{{ $t('forms.phone-number') }}</div>
            <vue-tel-input 
                name="phone"
                v-model="models.phone"
                @input="onPhoneChange"
            ></vue-tel-input>
            <div class="form__message" v-if="errors.phone">{{ errors.phone }}</div>
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
                name="accept"
                ref="accept"
                v-model="models.accept"
                @change="onAcceptChange"
            />
            <div class="form__message" v-if="errors.accept">{{ errors.accept }}</div>
        </div>
        <div class="form__item">
            <button
                class="link link--button link--button-blue"
                type="submit"
            >{{ $t('links.signup') }}</button>
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
        // load reCaptcha token for 'register_doctor' action
        this.loadAndSetRecaptchaToken(this.$recaptchaActions.registerDoctor)
    },
    methods: {

        async onSubmit(event) {
            if ( !this.validateForm(this.models) ) {
                this.$root.$emit('showNotify', { type: 'error', text: 'Форма не прошла предварительную валидацию.' })
                return false
            }

            const formData = this.prepareDataForSending(this.models)

            this.$store.dispatch('user/REGISTER_USER', formData)
                .then((token) => {
                    this.$store.dispatch('user/LOAD_USER', { id: token.data.doctor_id, token: token.data.access_token })
                })
        },


        async validateForm(models) {
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
            if (!models.confirmPassword) {
                this.errors['confirmPassword'] = this.$t('errors.form.required-field')
                this.$forceUpdate()
                return false
            }
            if (!models.phone) {
                this.errors['phone'] = this.$t('errors.form.required-field')
                this.$forceUpdate()
                return false
            }
            if (!models.accept) {
                this.errors['accept'] = this.$t('errors.form.required-field')
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


        prepareDataForSending(models) {
            let formData = new FormData()

            // required fields
            formData.append('email', models.email)
            formData.append('phone_number', models.phone)
            formData.append('password', models.password)
            formData.append('password_confirmation', models.confirmPassword)
            formData.append('accepted', models.accept)

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
            this.validateConfirmPassword(event, this.$refs.confirmPassword)
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
            this.validateAccept(event, this.models.accept)
        },
    }
}
</script>