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
            <!-- <input
                class="input"
                type="text"
                name="first_name"
                ref="first_name"
                v-model="value"
                @blur="onInputChange"
            /> -->
            <input
                class="input input--hidden"
                type="file"
                name="certification"
                ref="certification"
                @change="onCertificationUpload"
            />
            <button
                class="link link--button link--button-white link--button-upload"
                type="button"
                @click="addFileCertification"
            >
                <p>
                    Add file
                </p>
            </button>
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
            value: '',
        }
    },

    methods: {
        addFileCertification() {
            this.$refs.certification.click()
        },

        onCertificationUpload(event) {
            this.value = event.target.files[0]
        },













        async onSubmit() {
            this.setIsFormSending(true)

            // if ( !this.validateForm(this.value) ) {
            //     this.setIsFormSending(false)
            //     return false
            // }

            const searchParams = await this.prepareDataForSending(this.value)

            this.$store.dispatch('user/UPDATE_USER', { id: this.$cookies.get(this.$cookie.names.tokenId), token: this.$cookies.get(this.$cookie.names.token), params: { photo: searchParams }})
                .then(response => {
                    console.log('UPDATE_USER response success: ', response)
                    // load user in state
                    this.$store.dispatch('user/LOAD_USER', { id: this.$cookies.get(this.$cookie.names.tokenId), token: this.$cookies.get(this.$cookie.names.token) })
                        .then((response) => {
                            this.setIsFormSending(false)
                        })
                    this.setIsFormSending(false)
                })
                .catch(error => {
                    console.log('UPDATE_USER response error: ', error)
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

        async prepareDataForSending(value) {
            return new Promise ((resolve, reject) => {
                let reader = new FileReader();

                reader.readAsBinaryString(value);

                reader.onload = function() {
                    console.log(reader.result);
                    resolve(reader.result)
                };

                reader.onerror = function() {
                    console.log(reader.error);
                    reject(reader.error)
                };
            })
        },

        onInputChange(event) {
            this.validateName(event)
            this.$forceUpdate()
        },
    }
}
</script>