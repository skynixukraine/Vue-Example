<template lang="html">
    <header class="dashboard-header">
        <div class="dashboard-header__item">
            <h1 class="dashboard-header__title">{{ title }}</h1>
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 8px;
    border-bottom: 1px solid $color-mercury;

    &__title {
        margin-bottom: 0;
        font-size: 24px;
        line-height: 1.25; 
    }
}
</style>