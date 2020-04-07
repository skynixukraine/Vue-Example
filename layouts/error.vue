<template>
<div class="layout layout-error">
  <div class="container">
    <h1 v-if="error.statusCode === 404">Seite nicht gefunden</h1>
    <h1 v-else>Error</h1>
    <p><nuxt-link to="/">Back to the home page</nuxt-link></p>
  </div>
  </div>
</template>

<script>
export default {
  head(){
            return {title : this.$t("page-error.head.title")}
        },
  props: ['error']
}
</script>

<style lang="scss" scoped>
.layout-error {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
}
</style>