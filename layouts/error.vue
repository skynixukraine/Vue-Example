<template>
    <div class="page">
        <h1>{{ error.statusCode}} {{ message }}</h1>
        <nuxt-link :to="$routes.home.path">Home page</nuxt-link>
    </div>
</template>

<script>
export default {
    props: {
        error: {
            type: Object,
            default: null
        }
    },
    computed: {
        statusCode () {
            return (this.error && this.error.statusCode) || 500
        },
        message () {
            return this.error.message || this.$t('errors.default')
        }
    },
}
</script>