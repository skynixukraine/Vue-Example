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
        <div class="personal-info__header-title">Facharztbezeichnung</div>
      </div>
    </header>
    <div class="personal-info__main personal-info__main-select">
      <select class="select" name="specialization_id" ref="specialization_id" v-model="value">
        <option disabled value>Choose one of the options</option>
        <option
          v-for="(option, index) in $store.getters['specializations/SPECIALIZATIONS']"
          :key="index"
          :value="option.id"
        >{{ option.name }}</option>
      </select>
    </div>
    <footer
      class="personal-info__footer"
      v-if="errors.specialization_id"
    >{{ errors.specialization_id }}</footer>
  </form>
</template>

<script>
// mixins
import singleForm from "~/mixins/singleForm";
import validator from "~/mixins/validator";

export default {
  // TODO transfer validation specialization
  mixins: [singleForm, validator],

  data() {
    return {
      value: this.$store.getters["user/USER"].specialization.id
    };
  },

  methods: {
    async onSubmit() {
      this.setIsFormSending(true);
      const searchParams = this.prepareDataForSending(
        "specialization_id",
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