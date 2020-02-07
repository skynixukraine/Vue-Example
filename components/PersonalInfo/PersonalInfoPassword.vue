<template>
    <form class="single-form"
        :class="{ 'personal-info__edit-mode': isEditMode }"
        action
        method="PATCH"
        @submit.prevent="onSubmit">
        <header class="personal-info__header">
            <div class="personal-info__header-item">
                <div class="personal-info__header-title">Password</div>
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
                type="password"
                name="password"
                ref="password"
                v-model="models.password"
                :placeholder="$t('forms.enter-password')"
                @blur="onPasswordChange"
            />
            <div class="form__message" v-if="errors.password">{{ errors.password }}</div>
        </div>
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
            models: {
                password: '',
            },
            isFormSending: false,
        }
    },

    methods: {
         validateForm(models) {
            // check for required
            if (!models.password) {
                this.errors["password"] = this.$t("errors.form.required-field");
                this.$forceUpdate()
                this.$root.$emit('showNotify', { type: 'error', text: 'Пароль не заполнен' })
                return false;
            }
        },
        prepareDataForSending(models) {
            let formData = new FormData()

            formData.append("password", models.password);
        }
    },

    onPasswordChange(event) {
            this.validatePassword(event);
            this.$forceUpdate();
        }
}
</script>
