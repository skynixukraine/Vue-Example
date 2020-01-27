<template>
    <form
        class="single-form"
        :class="{ 'single-form--edit-mode': isEditMode }"
        action
        method="PATCH"
        @submit.prevent="onSubmit"
    >
        <header class="single-form-header">
            <div class="single-form-header__item">
                <div class="single-form-header__title">First name</div>
            </div>
            <div class="single-form-header__item">
                <template v-if="!isEditMode && !isFormSending">
                    <div class="single-form-nav single-form-nav--default">
                        <div class="single-form-nav__item">
                            <button type="button" @click="onClickEdit">Edit</button>
                        </div>
                    </div>
                </template>
                <template v-if="isEditMode && !isFormSending">
                    <div class="single-form-nav single-form-nav--active">
                        <div class="single-form-nav__item">
                            <button type="submit">Save</button>
                        </div>
                        <div class="single-form-nav__item">
                            <button type="button" @click="onClickCancel">Cancel</button>
                        </div>
                    </div>
                </template>
                <template v-if="isEditMode && isFormSending">
                    <div class="single-form-loading">loading...</div>
                </template>
            </div>
        </header>
        <div class="single-form-main">
            <input
                class="input"
                type="text"
                name="first_name"
                ref="first_name"
                v-model="value"
                @blur="onInputChange"
            />
        </div>
        <footer class="single-form-footer" v-if="errors.first_name">{{ errors.first_name }}</footer>
    </form>
</template>

<script>
// mixins
import singleForm from '~/mixins/singleForm'
import validator from "~/mixins/validator"

export default {
    mixins: [
        singleForm,
        validator,
    ],

    data() {
        return {
            value: this.$store.getters['user/USER'].first_name,
        }
    },

    methods: {
        async onSubmit() {
            this.setIsFormSending(true)

            if ( !this.validateForm(this.value) ) {
                this.setIsFormSending(false)
                return false
            }

            const searchParams = this.prepareDataForSending('first_name', this.value)
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
                this.errors.first_name = this.$t("errors.form.required-field")
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