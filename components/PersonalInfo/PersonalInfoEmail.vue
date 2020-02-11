<template>
    <form class="single-form"
        :class="{ 'personal-info__edit-mode': isEditMode }"
        action
        method="PATCH"
        @submit.prevent="onSubmit">
        <header class="personal-info__header">
            <div class="personal-info__header-item">
                <div class="personal-info__header-title">E-Mail Adresse</div>
            </div>
        </header>
        <div class="personal-info__main">
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
    </form>
</template>

<script>
// mixins
import singleForm from '~/mixins/singleForm'
import validator from "~/mixins/validator"

export default {
    // TODO transfer validation email
    mixins: [
        singleForm,
        validator,
    ],

    data() {
        return {
            models: {
                email: '',
            },
            isFormSending: false,
        }
    },

    methods: {
         validateForm(models) {
            // check for required
            if (!models.email) {
                this.errors["email"] = this.$t("errors.form.required-field");
                this.$forceUpdate()
                this.$root.$emit('showNotify', { type: 'error', text: 'Имейл не заполнен' })
                return false;
            }
        },
        prepareDataForSending(models) {
            let formData = new FormData()

            formData.append("email", models.email);
        }
    },

    onEmailChange(event) {
            this.validateEmail(event);
            this.$forceUpdate();
        },
}
</script>
