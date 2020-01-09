<template>
    <button
        class="navigation-toggler"
        :class="{ 'navigation-toggler--active': $store.getters['app/IS_NAVIGATION_ACTIVE'] }"
        @click="toggleNavigationActive"
    >
        <span></span>
    </button>
</template>

<script>
export default {
    methods: {
        toggleNavigationActive() {
            this.$store.commit('app/SET_IS_NAVIGATION_ACTIVE', !this.$store.getters['app/IS_NAVIGATION_ACTIVE'])
        }
    }
}
</script>

<style lang="scss" scoped>
.navigation-toggler {
    width: 32px;
    height: 32px;
    border: none;
    background-color: transparent;
    position: relative;
    padding: 0;

    span {
        width: 32px;
        height: 3px;
        background-color: #fff;
        position: absolute;
        left: 0px;

        &::before {
            content: '';
            width: 32px;
            height: 3px;
            background-color: #fff;
            position: absolute;
            left: 0px;
            top: -10px;
            transition: .3s;
        }

        &::after {
            content: '';
            width: 32px;
            height: 3px;
            background-color: #fff;
            position: absolute;
            left: 0px;
            top: 10px;
            transition: .3s;
        }
    }

    &.navigation-toggler--active {
        
        span {
             background-color: transparent;

            &::before {
                top: 0px;
                transform: rotate(45deg);
            }

            &::after {
                top: 0px;
                transform: rotate(-45deg);
            }
        }
    }
}
</style>