// Login form 

<template>
    <div>
        <h1 class="login login--title">Log in</h1>
        <form action class="form form--login" method="POST" @submit.prevent="onSubmit">
            <div class="form__item">
                <div class="form__title form__title--login">{{ $t('forms.enter-email') }}</div>
                <input
                    class="input input--login"
                    type="email"
                    name="email"
                    ref="email"
                    v-model="models.email"
                    @keyup="onEmailChange"
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
                    @keyup="onPasswordChange"
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
import recaptcha from "~/mixins/recaptcha";

export default {
    mixins: [validator, recaptcha],
    components: {
        ForgotPassword
    },

    created() {
        // load reCaptcha token for 'login_doctor' action
        this.loadAndSetRecaptchaToken(this.$recaptchaActions.loginDoctor);
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
                    text: "Форма не прошла предварительную валидацию."
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
                    text:
                        "Рекаптча ТОКЕН не обнаружен. Невозможно отправить форму."
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



<style lang="scss">
@mixin input-field {
    width: 300px;
    height: 40px;
    background: #ffffff;
    border: 1.5px solid #247ee5;
    box-sizing: border-box;
    border-radius: 4px;

    @include phone-big {
        height: 56px;
        width: 400px;
    }
    @include tablet {
        width: 544px;
    }
}

@mixin form__title--text {
    font-family: TheSansB;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 28px;
    color: #7a7d84;
}

.login {
    &--title {
        text-align: center;
        font-family: TheAntiquaB;
        font-style: normal;
        font-weight: 800;
        font-size: 32px;
        line-height: 64px;
        color: #247ee5;

        @include phone-big {
            font-size: 48px;
        }
    }
}

.form {
    &--login {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        .form__item {
            margin: 2% auto;
        }
    }
}

.link {
    &--button {
        width: 300px;
        margin: 2% auto;
        border-radius: 4px;

        @include phone-big {
            height: 56px;
            width: 400px;
        }
        @include tablet {
            width: 544px;
        }
    }

    &--button-blue {
        background: linear-gradient(90deg, #0f44b2 0%, #247ee5 100%);
        border: 1px solid #0f44b2;

        &:hover {
            background: linear-gradient(90deg, #0f44b2 0%, #247ee5 100%);
            border: 1px solid #0f44b2;
        }
    }
}

.input {
    &--login,
    &--password {
        @include input-field;
    }
}

.form__title {
    &--login,
    &--password {
        @include form__title--text;
    }
}
</style>