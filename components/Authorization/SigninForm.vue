<template>
    <form
        action=""
        class="form"
        method="POST"
        @submit.prevent="onSubmit"
    >
        <div class="form__item">
            <div class="form__title">{{ $t('forms.enter-email') }}</div>
            <input class="input" type="email" name="signinEmail" v-model="models.email" @keyup="onEmailChange">
            <div class="form__message" v-if="errors['signinEmail']">{{ errors['signinEmail'] }}</div>
        </div>
        <div class="form__item">
            <div class="form__title">{{ $t('forms.enter-password') }}</div>
            <input class="input" type="password" name="signinPassword" v-model="models.password" @keyup="onPasswordChange">
            <div class="form__message" v-if="errors['signinPassword']">{{ errors['signinPassword'] }}</div>
        </div>
        <div class="form__item">
            <button class="link link--button link--button-blue" type="submit">{{ $t('links.signin') }}</button>
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
                signin: {
                    email: '',
                    password: '',
                }
            }
        }
    },
    methods: {
        onSubmit(event) {
            if (this.validateForm()) {
                return true
            }
        },
        validateForm() {
            return true
        },


        // input changes
        onEmailChange(event) {
            this.validateEmail(event)
            this.$forceUpdate()
        },
        onPasswordChange(event) {
            this.validatePassword(event)
            this.$forceUpdate()
        }
    }
}
</script>