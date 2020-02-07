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
        <div class="personal-info__header-title">Languages</div>
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
    <div class="personal-info__main personal-info__main-select">
      <select class="select" name="language_id" ref="language_id" v-model="value">
        <option disabled value>Choose one of the options</option>
        <option></option>
        <option></option>
      </select>
    </div>
  </form>
</template>