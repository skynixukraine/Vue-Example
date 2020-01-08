<template>
    <div class="page">
        <div class="section">
            <div class="container">
                <Breadcrumbs :breadcrumbs="breadcrumbs" />
            </div>
        </div>
        <div class="section">
            <div class="container">
                <h1>ID: {{ $route.params.id }}</h1>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            breadcrumbs: [{
                text: this.$t('links.home'),
                to: this.$routes.home.path
            },{
                text: this.$t('links.faq'),
                to: this.$routes.faq.path
            },{
                text: this.$route.params.id,
            }],
        }
    }
}
</script>