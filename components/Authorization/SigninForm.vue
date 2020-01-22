<template>
    <div>
        <form action class="form form--login" method="POST" @submit.prevent="onSubmit">
            <div class="form__item">
                <div class="form__title form__title--login">{{ $t('forms.enter-email') }}</div>
                <input
                    class="input input--login"
                    type="email"
                    name="email"
                    ref="email"
                    v-model="models.email"
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
                    @blur="onPasswordChange"
                />
                <div class="form__message" v-if="errors.password">{{ errors.password }}</div>
            </div>
            <div class="form__item">
                <button
                    class="link link--button link--button-blue"
                    type="submit"
                >{{ $t('links.signin') }}</button>
            </div>
            <ForgotPassword />
        </form>
    </div>
</template>

<script>
import ForgotPassword from "./ForgotPassword";

// mixins
import validator from "~/mixins/validator";

export default {
    mixins: [validator],

    components: {
        ForgotPassword
    },

    data() {
        return {
            models: {
                email: "",
                password: ""
            }
        };
    },

    methods: {
        onSubmit() {
            if (!this.validateForm(this.models)) {
                this.$root.$emit("showNotify", {
                    type: "error",
                    text: $t('errors.form.validation-failed')
                });
                return false;
            }

            const formData = this.prepareDataForSending(this.models);

            this.$store.dispatch("user/LOGIN_USER", formData).then(token => {
                this.$store.dispatch("user/LOAD_USER", {
                    id: token.data.doctor_id,
                    token: token.data.access_token
                });
            });
        },

        async validateForm(models) {
            // check required fields
            if (!models.email) {
                this.errors["email"] = this.$t("errors.form.required-field");
                this.$forceUpdate();
                return false;
            }
            if (!models.password) {
                this.errors["password"] = this.$t("errors.form.required-field");
                this.$forceUpdate();
                return false;
            }

            // check recaptcha token exist
            if (!this.recaptchaToken) {
                this.$root.$emit("showNotify", {
                    type: "error",
                    text: $t('errors.forms.invalid-recaptcha-tocken'), 
                });
                return false;
            }

            return true;
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
        onPasswordChange(event) {
            this.validatePassword(event);
            this.$forceUpdate();
        }
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
        // font-family: TheSansB;
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

    .input {
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

    }


}
</style>