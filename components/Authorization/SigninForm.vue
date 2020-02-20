<template>
    <form action class="form form--login" method="POST" @submit.prevent="onSubmit">
        <div class="form__item">
            <div class="form__title form__title--login">{{ $t('forms.enter-email') }}</div>
            <input
                class="input input--login"
                type="email"
                name="email"
                ref="email"
                v-model="models.email"
                :placeholder="$t('forms.enter-email')"
                @blur="onEmailChange"
            />
            <div class="form__message" v-if="errors.email">{{ errors.email }}</div>
        </div>
        <div class="form__item">
            <div class="form__title form__title--password">{{ $t('forms.enter-password') }}</div>
            <input
                class="input input--password"
                type="password"
                name="password"
                ref="password"
                v-model="models.password"
                :placeholder="$t('forms.enter-password')"
            />
            <div class="form__message" v-if="errors.password">{{ errors.password }}</div>
        </div>
        <div class="form__item">
            <button
                class="link link--button link--button-full-width link--button-blue link--button-gradient"
                type="submit"
            >{{ $t('links.signin') }}</button>
        </div>
    </form>
</template>

<script>
// mixins
import validator from "~/mixins/validator"
import recaptcha from '~/mixins/recaptcha'

export default {
    mixins: [
        validator,
        recaptcha,
    ],

    created() {
        if (process.client) {
            this.$recaptchaLoaded()
                .then(() => {
                    this.loadAndSetRecaptchaToken(this.$recaptchaActions.loginDoctor)
                })
        }
    },

    data() {
        return {
            models: {
                email: "",
                password: ""
            },
            isFormSending: false,
        };
    },

    methods: {
        onSubmit() {
            this.isFormSending = true
            if ( !this.validateForm(this.models) ) {
                this.isFormSending = false
                return false
            }

            const formData = this.prepareDataForSending(this.models)

            this.$store.dispatch('user/LOGIN_USER', formData)
                .then((response) => {
                    // set user cookie (login user)
                    const endDate = new Date(response.data.expires_at.date.replace(' ', 'T'))
                    this.$cookies.set(this.$cookie.names.token, response.data.access_token, {
                        path: this.$cookie.path.root,
                        maxAge: this.$cookie.getSecondsBetweenTwoData(new Date(), endDate)
                    })
                    this.$cookies.set(this.$cookie.names.tokenId, response.data.id, {
                        path: this.$cookie.path.root,
                        maxAge: this.$cookie.getSecondsBetweenTwoData(new Date(), endDate)
                    })

                    // load user in state
                    this.$store.dispatch('user/LOAD_USER', { id: response.data.id, token: response.data.access_token })
                        .then((response) => {
                            this.isFormSending = false
                            this.$router.push({ path: this.$routes.home.path })
                        })
                })
                .catch((response) => {
                    this.$root.$emit('showNotify', { type: 'error', text: response.message })
                    this.handleErrorResponse(response.errors)
                    this.loadAndSetRecaptchaToken(this.$recaptchaActions.loginDoctor)
                    this.isFormSending = false
                })
        },

        validateForm(models) {
            // check required fields
            if (!models.email) {
                this.errors["email"] = this.$t("errors.form.required-field");
                this.$forceUpdate()
                this.$root.$emit('showNotify', { type: 'error', text: 'Имейл не заполнен' })
                return false;
            }
            if (!models.password) {
                this.errors["password"] = this.$t("errors.form.required-field");
                this.$forceUpdate()
                this.$root.$emit('showNotify', { type: 'error', text: 'Пароль не заполнен' })
                return false;
            }

            // check recaptcha token exist
            if (!this.recaptchaToken) {
                this.$root.$emit('showNotify', { type: 'error', text: 'Recaptcha not exist.' })
                return false
            }

            return true;
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
            let formData = new FormData();

            // required fields
            formData.append("email", models.email);
            formData.append("password", models.password);

            // recaptcha token for action 'login_doctor'
            formData.append("recaptcha", this.recaptchaToken);

            return formData;
        },

        // input changes
        onEmailChange(event) {
            this.validateEmail(event);
            this.$forceUpdate();
        },
    }
};
</script>


<style lang="scss" scoped>
.form {
    &--login {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}

.form__item {
    margin: 2% auto;
    width: 100%;

    .form__title {
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 28px;
        color: $color-rolling-stone;

        @include phone-big {
            font-size: 16px;
        }

        @include tablet-big {
            font-size: 18px;
        }
}

    .form__message {
        color: $color-alert-red;
        padding-left: 10px;
    }
}
</style>