<template>
    <form action="" class="form" method="POST">
        <div class="form__item">
            <div class="form__title">enter email:</div>
            <input type="email">
        </div>
        <div class="form__item">
            <div class="form__title">create password:</div>
            <input type="password">
        </div>
        <div class="form__item">
            <div class="form__title">confirm password:</div>
            <input type="password">
        </div>
        <div class="form__item">
            <div class="form__title">phone number:</div>
            <input type="tel">
        </div>
        <div class="form__item">
            <div class="form__title">Upload medical degree (or add later)</div>
            <input type="file">
        </div>
        <div class="form__item">
            <div class="form__title">Upload board-certification (or add later)</div>
            <input type="file">
        </div>
        <div class="form__item">
            <div class="form__title">I accept Terms and Conditions and Privacy Policy</div>
            <input type="checkbox">
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
                accept: false
            }
        }
    }
}
</script>