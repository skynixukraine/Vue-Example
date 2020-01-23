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
            />
        </div>
        <footer class="single-form-footer" v-if="errors.first_name">{{ errors.first_name }}</footer>
    </form>
</template>

<script>
// mixins
import singleForm from '~/mixins/singleForm'

export default {
    mixins: [
        singleForm,
    ],

    data() {
        return {
            value: '',
        }
    },

    methods: {
        onSubmit() {
            this.setIsFormSending(true)

            if ( !this.validateForm(this.value) ) {
                this.setIsFormSending(false)
                return false
            }

            const formData = this.prepareDataForSending(this.value)

            // this.$store.dispatch('user/UPDATE_USER', { id: response.data.id, token: response.data.access_token, params: formData })
            //     .then(response => {
            //         console.log('UPDATE_USER response: ', response)
            //         this.setIsFormSending(false)
            //     })
            //     .catch(error => {
            //         console.log('UPDATE_USER error: ', error)
            //         this.setIsFormSending(false)
            //     })
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

        prepareDataForSending(value) {
            let formData = new FormData()

            formData.append("first_name", value)

            return formData
        },
    }
}
</script>