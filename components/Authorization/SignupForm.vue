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
                @blur="onEmailChange"
            />

            <img v-if="!errors.email"
                class="check-icon"
                :src="require('~/static/images/icons/check-icon.svg')"
                alt="check-icon"
            />
            <div class="form__message" v-if="errors.email">{{ errors.email }}</div>
        </div>
        <div class="form__item form__item--password">
            <div class="form__title form__title--password">{{ $t('forms.create-password') }}</div>
            <input
                class="input input--password"
                type= "password"
                name="password"
                ref="password"
                v-model="models.password"
                @blur="onPasswordChange"
            />
            <img
                class="eye-icon"
                :src="require('~/static/images/icons/eye-icon.svg')"
                alt="eye-icon"
                @click="togglePasswordVisibility"
            />
            <div class="form__message" v-if="errors.password">{{ errors.password }}</div>
        </div>
        <div class="form__item">
            <div class="form__title form__title--password">{{ $t('forms.confirm-password') }}</div>
            <input
                class="input input--password"
                type="password"
                name="password_confirmation"
                ref="password_confirmation"
                v-model="models.password_confirmation"
                @blur="onConfirmPasswordChange"
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
                class="link link--button link--button-white link--button-upload"
                type="button"
                @click="addFileDegree"
            >
                <img
                    class="paper-fastener-button-image"
                    :src="require('~/static/images/icons/paper-fastener-button-icon.svg')"
                    alt="paper-fastener-button"
                />
                <p>
                    {{ models.degree ? models.degree.name :  $t('forms.add-degree') }}
                </p>
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
                class="link link--button link--button-white link--button-upload"
                type="button"
                @click="addFileCertification"
            >
                <img
                    class="paper-fastener-button-image"
                    :src="require('~/static/images/icons/paper-fastener-button-icon.svg')"
                    alt="paper-fastener-button"
                />
                <p>
                    {{ models.certification ? models.certification.name :  $t('forms.add-certification') }}
                </p>
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
            >{{ isFormSending ? $t('states.loading') : $t('links.signup') }}</button>
        </div>
    </form>
</template>

<script>
// mixins
import validator from '~/mixins/validator'
import recaptcha from '~/mixins/recaptcha'
import modal from '~/mixins/modal'

export default {
    mixins: [
        validator,
        recaptcha,
        modal,
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
            fieldTypePassword: true
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
                    this.openModal(this.$modals.registerSuccess)
                    this.loadAndSetRecaptchaToken(this.$recaptchaActions.registerDoctor)
                    this.isFormSending = false
                })
                .catch((response) => {
                    this.$root.$emit('showNotify', { type: 'error', text: response.message })
                    this.handleErrorResponse(response.errors)
                    this.loadAndSetRecaptchaToken(this.$recaptchaActions.registerDoctor)
                    this.isFormSending = false
                })
        },

        validateForm(models) {
            // check required fields
            if (!models.email) {
                this.errors['email'] = this.$t('errors.form.required-field')
                this.$forceUpdate()
                this.$root.$emit('showNotify', { type: 'error', text: this.$t('errors.form.email-is-empty') })
                return false
            }
            if (!models.password) {
                this.errors['password'] = this.$t('errors.form.required-field')
                this.$forceUpdate()
                this.$root.$emit('showNotify', { type: 'error', text: this.$t('errors.form.password-is-empty') })
                return false
            }
            if (!models.password_confirmation) {
                this.errors['password_confirmation'] = this.$t('errors.form.required-field')
                this.$forceUpdate()
                this.$root.$emit('showNotify', { type: 'error', text: this.$t('errors.form.сonfirmation-password-is-empty') })
                return false
            }
            if (!models.phone_number) {
                this.errors['phone_number'] = this.$t('errors.form.required-field')
                this.$forceUpdate()
                this.$root.$emit('showNotify', { type: 'error', text: this.$t('errors.form.phone-is-empty') })
                return false
            }
            if (!models.accepted) {
                this.errors['accepted'] = this.$t('errors.form.required-field')
                this.$forceUpdate()
                this.$root.$emit('showNotify', { type: 'error', text: this.$t('errors.form.accept-terms-and-conditions') })
                return false
            }

            // check recaptcha token exist
            if (!this.recaptchaToken) {
                this.$root.$emit('showNotify', { type: 'error', text: 'Нет токена рекапчи' })
                return false
            }

            return true
        },

        validateFilePDF(event){
            if  ( event.target.files[0].type === 'application/pdf' ){
                return this;
            }
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
            this.validatePhone(telInput);
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

        togglePasswordVisibility(){
            if ( this.$refs.password.type === 'password') {
                this.$refs.password.type = 'text'
            } else {
                this.$refs.password.type = 'password'
            }
        }
    }
}
</script>


<style lang="scss" scoped>

.form {
    &--register {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
}

.form__item {
    margin: 2% auto;
    width: 100%;

    .form__title {
        // font-family: TheSansB;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 28px;
        color: $color-rolling-stone;

        @include phone-big {
            font-size: 16px;
        }

        @include desktop {
            font-size: 18px;
        }

    }

    .form__message {
        color: $color-alert-red;
        padding-left: 10px;
        text-align: left;
    }

    &--login,
    &--password {
        position: relative;
    }

    &--checkbox {
        display: flex;
        flex-direction: column-reverse;
        justify-content: center;
        align-items: center;

        @include tablet {
            flex-direction: row-reverse;
        }

        .form__title--accepted {
            font-size: 14px;
            text-align: center;
            padding-left: 10px;

            @include tablet {
                text-align: left;

            }
        }
    }

    .input, #vue-tel-input  {
        width: 100%;
        height: 40px;
        background: $color-white;
        border: 2px solid $color-curious-blue;
        box-sizing: border-box;
        border-radius: 4px;
        padding-left: 2%;

        @include phone-big {
            height: 56px;
        }

        @include desktop {
            width: 544px;
        }
    }

        .vti__input{
            max-width: 150px;

            @include phone-big {
                max-width: 250px;
            }
        }
    }

    input[type="checkbox"] {
        order: 1;
    }

    .form__message {
        padding-left: 15px;
        text-align: left;

        @include phone-big {
            padding-left: 15px;
        }
    }

    .check-icon,
    .eye-icon {
        position: absolute;
        top: 40px;
        right: 20px;
        cursor: pointer;

        @include phone-big {
            top: 48px;
        }
    }

</style>