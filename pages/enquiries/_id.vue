<template>
    <div class="page">
        <div class="section">
            <div class="container">
                <h1>Enquiries ID: {{ $route.params.id }}</h1>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    beforeCreate() {
        this.$store.dispatch('user/AUTOLOGIN_USER')
    },
}
</script>