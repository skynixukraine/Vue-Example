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
        <div class="personal-info__header-title">Region</div>
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
      <select class="select" name="region_id" ref="region_id" v-model="value">
        <option disabled value>Choose one of the options</option>
        <option
          v-for="(option, index) in $store.getters['regions/REGIONS']"
          :key="index"
          :value="option.id"
        >{{ option.name }}</option>
      </select>
    </div>
    <footer
      class="personal-info__footer"
      v-if="errors.region_id"
    >{{ errors.region_id }}</footer>
  </form>
</template>

<script>
// mixins
import singleForm from "~/mixins/singleForm";
import validator from "~/mixins/validator";

export default {
  mixins: [singleForm, validator],

  data() {
    return {
      value: this.$store.getters["user/USER"].region.id
    };
  },

  methods: {
    async onSubmit() {
      this.setIsFormSending(true);
      const searchParams = this.prepareDataForSending(
        "region_id",
        this.value
      );
      this.$store
        .dispatch("user/UPDATE_USER", {
          id: this.$cookies.get(this.$cookie.names.tokenId),
          token: this.$cookies.get(this.$cookie.names.token),
          params: searchParams
        })
        .then(response => {
          this.setIsFormSending(false);
        })
        .catch(error => {
          console.error(error);
          this.setIsFormSending(false);
        });
    }
  }
};
</script>