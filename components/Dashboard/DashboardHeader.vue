<template lang="html">
    <header class="dashboard-header">
        <div class="dashboard-header__item">
            <h1>{{ title }}</h1>
        </div>
        <div class="dashboard-header__item">
            <slot></slot>
        </div>
    </header>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true,
            default: ''
        }
    }
}
</script>

<style lang="scss" scoped>
.dashboard-header {
    border-bottom: 1px solid $color-mercury;
}
</style>