<template>
    <div class="page">
        <div class="section">
            <div class="container">
                <h1>Impressum</h1>
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