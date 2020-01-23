<template>
    <form action class="single-form" method="PATCH" @submit.prevent="onSubmit">
        <header class="single-form-header">
            <div class="single-form-header__item">
                <div class="single-form-header__title">First name</div>
            </div>
            <div class="single-form-header__item">
                <template v-if="!isEditMode">
                    <div class="single-form-nav">
                        <div class="single-form-nav__item">
                            <button type="button">Edit</button>
                        </div>
                    </div>
                </template>
                <template v-if="isEditMode">
                    <div class="single-form-nav">
                        <div class="single-form-nav__item">
                            <button type="submit">Save</button>
                        </div>
                        <div class="single-form-nav__item">
                            <button type="button">Cancel</button>
                        </div>
                    </div>
                </template>
            </div>
        </header>
        <div class="single-form-main">
            <input
                class="input"
                type="text"
                name="first_name"
                ref="first_name"
                v-model="models.first_name"
            />
        </div>
        <footer class="single-form-footer">
            some error
        </footer>
    </form>
</template>

<script>
export default {
    data() {
        return {
            models: {
                first_name: ''
            },
            backupValue: '',
            isFormSending: false,
            isEditMode: false,
        };
    },
}
</script>