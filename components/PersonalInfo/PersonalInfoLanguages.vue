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