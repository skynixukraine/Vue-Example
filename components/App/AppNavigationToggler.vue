<template>
    <button
        class="app-navigation-toggler"
        :class="{ 'app-navigation-toggler--active': isActive }"
        @click="emitToggleNavigation"
    >
        <span></span>
    </button>
</template>

<script>
export default {
    data() {
        return {
            isActive: false
        }
    },
    methods: {
        emitToggleNavigation() {
            this.isActive = !this.isActive
            this.$root.$emit('toggleNavigation')
        }
    }
}
</script>

<style lang="scss" scoped>
.app-navigation-toggler {
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

    &.app-navigation-toggler--active {
        
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