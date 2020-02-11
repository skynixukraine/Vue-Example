<template>
    <form
        class="single-form"
        :class="{ 'personal-info__edit-mode': isEditMode }"
        action
        method="PATCH"
        @submit.prevent="onSubmit"
    >
        <header class="personal-info__header">
            <div class="personal-info__header-item">
                <div class="personal-info__header-title">Nachname</div>
            </div>
        </header>
        <div class="personal-info__main">
            <input
                class="input"
                type="text"
                name="last_name"
                ref="last_name"
                v-model="value"
                @blur="onInputChange"
            />
        </div>
        <footer class="personal-info__footer" v-if="errors.last_name">{{ errors.last_name }}</footer>
    </form>
</template>

<script>
// mixins
import singleForm from '~/mixins/singleForm'
import validator from "~/mixins/validator"

export default {

// TODO transfer validation lastname
    mixins: [
        singleForm,
        validator,
    ],

    data() {
        return {
            value: this.$store.getters['user/USER'].last_name,
        }
    },

    methods: {
        async onSubmit() {
            this.setIsFormSending(true)

            if ( !this.validateForm(this.value) ) {
                this.setIsFormSending(false)
                return false
            }

            const searchParams = this.prepareDataForSending('last_name', this.value)
            this.$store.dispatch('user/UPDATE_USER', { id: this.$cookies.get(this.$cookie.names.tokenId), token: this.$cookies.get(this.$cookie.names.token), params: searchParams })
                .then(response => {
                    this.setIsFormSending(false)
                })
                .catch(error => {
                    console.error(error)
                    this.setIsFormSending(false)
                })
        },

        validateForm(value) {
            // check for required
            if (!value) {
                this.errors.last_name = this.$t("errors.form.required-field")
                this.$forceUpdate()

                return false
            }

            return true
        },

        onInputChange(event) {
            this.validateName(event)
            this.$forceUpdate()
        },
    }
}
</script>
