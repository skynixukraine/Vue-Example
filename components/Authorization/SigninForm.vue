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



<style lang="scss" scoped>

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

.form__item {
    .form__title {
        font-family: TheSansB;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 28px;
        color: #7a7d84;
        padding-left: 10px;

        @include phone-big {
            font-size: 16px;
        }

        @include tablet-big {
            font-size: 18px;
        }
}


  
    .form__message {
        color: red;
        padding-left: 10px;
    }

    .input {
        width: 295px;
        height: 40px;
        background: #ffffff;
        border: 2px solid #247ee5;
        box-sizing: border-box;
        border-radius: 4px;
        padding-left: 2%;

        @media (min-width: #{$screen-phone-big-min}) {
                    width: 350px;
                }

                @include phone-big {
                    height: 56px;
                    width: 400px;
                }
                @include desktop {
                    width: 544px;
                }
    }

    .link {
        &--button {
            width: 295px;
            margin: 2% auto;
            border-radius: 4px;

            @media (min-width: #{$screen-phone-big-min}) {
                    width: 350px;
                }

            @include phone-big {
                height: 56px;
                width: 400px;
            }
            @include desktop {
            width: 544px;
            }
        }

        &--button-blue {
            color: $color-white;
            background: linear-gradient(90deg, #0f44b2 0%, #247ee5 100%);
            border: 1px solid #0f44b2;

            &:hover {
                background: linear-gradient(90deg, #0f44b2 0%, #247ee5 100%);
                border: 1px solid #0f44b2;
            }
        }
    }

}










</style>