<template>
    <form class="single-form"
        :class="{ 'personal-info__edit-mode': isEditMode }"
        action
        method="PATCH"
        @submit.prevent="onSubmit">
        <header class="personal-info__header">
            <div class="personal-info__header-item">
                <div class="personal-info__header-title">Bio Short</div>
            </div>
        </header>
        <div class="personal-info__main">
               <textarea
                class="input textarea"
                type="textarea"
                name="textarea"
                ref="textarea"
                placeholder="Bio Short"
               ></textarea>
        </div>
    </form>
</template>