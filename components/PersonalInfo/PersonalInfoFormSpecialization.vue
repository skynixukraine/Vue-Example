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
                <div class="single-form-header__title">Last name</div>
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
            <select
                class="select"
                name="specialization_id"
                ref="specialization_id"
                v-model="value"
            >
                <option disabled value="">Choose one of the options</option>
                <option v-for="(option, index) in $store.getters['specializations/SPECIALIZATIONS']" :key="index" :value="option.id">{{ option.name }}</option>
            </select>
        </div>
        <footer class="single-form-footer" v-if="errors.specialization_id">{{ errors.specialization_id }}</footer>
    </form>
</template>

<script>
// mixins
import singleForm from '~/mixins/singleForm'
import validator from '~/mixins/validator'

export default {
    mixins: [
        singleForm,
        validator,
    ],

    data() {
        return {
            value: this.$store.getters['user/USER'].specialization.id,
        }
    },

    methods: {
        async onSubmit() {
            this.setIsFormSending(true)
            const searchParams = this.prepareDataForSending('specialization_id', this.value)
            this.$store.dispatch('user/UPDATE_USER', { id: this.$cookies.get(this.$cookie.names.tokenId), token: this.$cookies.get(this.$cookie.names.token), params: searchParams })
                .then(response => {
                    this.setIsFormSending(false)
                })
                .catch(error => {
                    console.error(error)
                    this.setIsFormSending(false)
                })
        },
    }
}
</script>