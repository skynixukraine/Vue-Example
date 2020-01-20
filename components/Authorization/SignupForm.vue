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
                class="input input--password"
                type="text"
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
                class="input input--password"
                type="text"
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
            >{{ isFormSending ? 'loading...' : $t('links.signup') }}</button>
        </div>
    </form>
</template>

<script>
// mixins
import validator from "~/mixins/validator";

export default {
    mixins: [validator],

    mounted() {
        grecaptcha.ready(() => {
            grecaptcha
                .execute("6LdevsYUAAAAANMMWGDy7h5SPUc9knsvAwe-28bI", {
                    action: "register_doctor"
                })
                .then(token => {
                    this.recaptchaToken = token;
                });
        });
    },

    data() {
        return {
            models: {
                email: "",
                password: "",
                password_confirmation: "",
                phone_number: "",
                degree: "",
                certification: "",
                accepted: false
            },
            isFormSending: false,
            recaptchaToken: ""
        };
    },

    methods: {
        async onSubmit() {
            this.isFormSending = true;
            if (!this.validateForm(this.models)) {
                this.$root.$emit("showNotify", {
                    type: "error",
                    text: "Форма не прошла предварительную валидацию."
                });
                this.isFormSending = false;
                return false;
            }

            const formData = this.prepareDataForSending(this.models);

            this.$store
                .dispatch("user/REGISTER_USER", formData)
                .then(response => {
                    this.$store
                        .dispatch("user/LOAD_USER", {
                            id: response.data.doctor_id,
                            token: response.data.access_token
                        })
                        .then(response => {
                            this.$modal.show("register-success");
                            // re request captcha (need update after each form send)
                            console.log("r: ", grecaptcha, window.grecaptcha);

                            this.isFormSending = false;
                        });
                })
                .catch(response => {
                    this.handleErrorResponse(response.errors);
                    // re request captcha (need update after each form send)
                    console.log("r: ", grecaptcha, window.grecaptcha);
                    this.isFormSending = false;
                });
        },

        validateForm(models) {
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
            if (!models.password_confirmation) {
                this.errors["password_confirmation"] = this.$t(
                    "errors.form.required-field"
                );
                this.$forceUpdate();
                return false;
            }
            if (!models.phone_number) {
                this.errors["phone_number"] = this.$t(
                    "errors.form.required-field"
                );
                this.$forceUpdate();
                return false;
            }
            if (!models.accepted) {
                this.errors["accepted"] = this.$t("errors.form.required-field");
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

        handleErrorResponse(errors) {
            for (let fieldName in errors) {
                this.errors[fieldName] = errors[fieldName][0];
            }
            this.$forceUpdate();
        },

        prepareDataForSending(models) {
            let formData = new FormData();

            // required fields
            formData.append("email", models.email);
            formData.append("phone_number", models.phone_number);
            formData.append("password", models.password);
            formData.append(
                "password_confirmation",
                models.password_confirmation
            );
            formData.append("accepted", models.accepted);

            // unrequired fields
            if (models.degree) {
                formData.append("medical_degree", models.degree);
            }
            if (models.certification) {
                formData.append("medical_degree", models.certification);
            }

            // recaptcha token for action 'register_doctor'
            formData.append("recaptcha", this.recaptchaToken);

            return formData;
        },

        // files upload
        addFileDegree() {
            this.$refs.degree.click();
        },
        addFileCertification() {
            this.$refs.certification.click();
        },

        // inputs changes
        onEmailChange(event) {
            this.validateEmail(event);
            this.$forceUpdate();
        },
        onPasswordChange(event) {
            this.validateConfirmPassword(
                event,
                this.$refs.password_confirmation
            );
            this.$forceUpdate();
        },
        onConfirmPasswordChange(event) {
            this.validateConfirmPassword(event, this.$refs.password);
            this.$forceUpdate();
        },
        onPhoneChange(formattedNumber, telInput) {
            this.validatePhone(telInput);
        },
        onDegreeUpload(event) {
            if (this.validateFilePDF(event)) {
                this.models.degree = event.target.files[0];
            }
        },
        onCertificationUpload(event) {
            if (this.validateFilePDF(event)) {
                this.models.certification = event.target.files[0];
            }
        },
        onAcceptChange(event) {
            this.validateAccept(event, this.models.accepted);
        }
    }
};
</script>



<style lang="scss">
@mixin input-field {
    width: 295px;
    height: 40px;
    background: #ffffff;
    border: 2px solid #247ee5;
    box-sizing: border-box;
    border-radius: 4px;
 
    @include phone-big {
        height: 56px;
        width: 400px;
    }

    @include desktop {
        width: 544px;
    }
}

@mixin form__title--text {
    font-family: TheSansB;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 28px;
    color: #7a7d84;

    @include phone-big {
        font-size: 16px;
    }

    @include desktop {
        font-size: 18px;
    }
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
    &--register {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .form__item {
            margin: 2% auto;
        }
    }
}

.check-icon,
.eye-icon {
    position: absolute;
    top: 40px;
    right: 20px;
    @include phone-big {
        top: 48px;
    }
}

.link {
    &--button {
        width: 300px;
        margin: 2% auto;
        border-radius: 4px;

        @include phone-big {
            height: 56px;
            width: 335px;
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
    &--login {
        @include input-field;

        ::after {
            content: "Test";
        }
    }
    &--password {
        @include input-field;
    }
    &--phone {
        @include input-field;
    }
}

// Phone field input
#vue-tel-input {
    @include input-field;
    font-size: 15px;
}

.form__title {
    &--login,
    &--password,
    &--phone_number,
    &--degree,
    &--certification,
    &--accepted {
        @include form__title--text;
    }
}

.form__item {
    &--login,
    &--password {
        position: relative;
    }

    &--checkbox {
        display: flex;
        flex-direction: column-reverse;
        justify-content: center;
        align-items: center;

        @include phone-big {
            flex-direction: row-reverse;
        }

        .form__title--accepted {
            font-size: 14px;
            text-align: center;

            @include phone-big {
                flex-direction: left;
            }
        }
    }

    input[type="checkbox"] {
        order: 1;
    }

    .form__title{
        padding-left: 5px;
    }
   
    .form__message {
        padding-left: 15px;
        
        @include phone-big {
            padding-left: 15px;
        }
    }

    .link {
        &--button {
            width: 295px;
            margin: 2% auto;
            border-radius: 4px;

            @include phone-big {
                height: 56px;
                width: 400px;
            }

            @include desktop {
                width: 544px;
            }

            &--upload {
                position: relative;
                text-align: left;

                p {
                    padding-left: 12px;
                }
                img {
                    position: absolute;
                    top: 12px;
                    left: 11px;
                }
                font-family: TheSansB;
                background: #ffffff;
                border: 2px solid #247ee5;
                box-sizing: border-box;
                border-radius: 4px;
                color: rgba(122, 125, 132, 0.5);
                font-size: 18px;
                text-transform: lowercase;
                line-height: 18px;

                ::first-letter {
                    text-transform: uppercase;
                }
            }
        }
    }
}
</style>