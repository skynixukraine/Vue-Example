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
                <div class="personal-info__header-title">Vorname</div>
            </div>
            <div class="personal-info__header-item">
                <template v-if="!isEditMode && !isFormSending">
                    <div class="personal-info__nav personal-info__nav--default">
                        <div class="personal-info__nav-item">
                            <button class="personal-info__nav-buttom" type="button" @click="onClickEdit">Edit</button>
                        </div>
                    </div>
                </template>
                <template v-if="isEditMode && !isFormSending">
                    <div class="personal-info__nav personal-info__nav--active">
                        <div class="personal-info__nav-item">
                            <button class="personal-info__nav-buttom" type="submit">Save</button>
                        </div>
                        <div class="personal-info__nav-item">
                            <button class="personal-info__nav-buttom" type="button" @click="onClickCancel">Cancel</button>
                        </div>
                    </div>
                </template>
                <template v-if="isEditMode && isFormSending">
                    <div class="personal-info__loading">loading...</div>
                </template>
            </div>
        </header>
        <div class="personal-info__main">
            <input
                class="input"
                type="text"
                name="first_name"
                ref="first_name"
                v-model="value"
                @blur="onInputChange"
            />
             <img v-if="!errors.email"
                class="check-icon"
                :src="require('~/static/images/icons/check-icon.svg')"
                alt="check-icon"
            />
        </div>
        <footer class="personal-info__footer" v-if="errors.first_name">{{ errors.first_name }}</footer>
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