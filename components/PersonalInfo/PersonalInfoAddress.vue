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
        <div class="personal-info__header-title">Straße/Hausnummer</div>
      </div>
    </header>
    <div class="personal-info__main">
      <input
        class="input"
        type="text"
        name="address"
        ref="address"
        v-model="value"
        @blur="onInputChange"
      />
    </div>
  </form>
</template>