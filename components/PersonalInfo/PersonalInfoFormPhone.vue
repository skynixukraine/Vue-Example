<template>
    <form class="single-form"
        :class="{ 'personal-info__edit-mode': isEditMode }"
        action
        method="PATCH"
        @submit.prevent="onSubmit">
        <header class="personal-info__header">
            <div class="personal-info__header-item">
                <div class="personal-info__header-title">Telefonnummer</div>
            </div>
        </header>
        <div class="personal-info__main">
             <vue-tel-input
                id="vue-tel-input"
                name="phone_number"
                v-model="models.phone_number"
                @input="onPhoneChange"
            ></vue-tel-input>
            <div class="form__message" v-if="errors.phone_number">{{ errors.phone_number }}</div>
        </div>
        <footer class="personal-info__footer" v-if="errors.first_name">{{ errors.first_name }}</footer>
    </form>
</template>

<script>
// mixins
import singleForm from '~/mixins/singleForm'
import validator from "~/mixins/validator"

export default {
    // TODO transfer validation phone
    mixins: [
        singleForm,
        validator,
    ],

    data() {
        return {
            models: {
                phone_number: '',
            },
            isFormSending: false,
        }
    },

    methods: {
         validateForm(models) {
            // check for required
            if (!models.phone_number) {
                this.errors['phone_number'] = this.$t('errors.form.required-field')
                this.$forceUpdate()
                this.$root.$emit('showNotify', { type: 'error', text: this.$t('errors.form.phone-is-empty') })
                return false
            }
        },
        prepareDataForSending(models) {
            let formData = new FormData()
            formData.append('phone_number', models.phone_number)
        }
    },

    onPhoneChange(formattedNumber, telInput) {
            this.validatePhone(telInput);
        },
}
</script>

<style lang="scss" scoped>
.vue-tel-input {
    width: 100%;
    height: 40px;
    background: $color-white;
    border: 2px solid $color-curious-blue;
    box-sizing: border-box;
    border-radius: 4px;

    @include phone-big {
        height: 56px;
    }
}
</style>