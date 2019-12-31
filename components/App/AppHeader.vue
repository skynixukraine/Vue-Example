<template>
    <header class="app-header" :class="{ 'app-header--transparent': isHomePage, 'app-header--with-bg': scrollTop > 68 }">
        <div class="app-header__inner">
            <div class="app-header__item">
                <Logo />
            </div>
            <div class="app-header__item">
                <Navigation />
            </div>
            <div class="app-header__item" v-if="windowWidth < 962">
                <button class="button-menu" @click="emitToggleNavigation"></button>
            </div>
        </div>
    </header>
</template>

<script>
// mixins
import window from '~/mixins/window'

// components
import Logo from "~/components/Logo/Logo"
import Navigation from "~/components/Navigation/Navigation"

export default {
    mixins: [window],
    components: {
        Logo,
        Navigation,
    },
    computed: {
        isHomePage() {
            return this.$route.name === 'index'
        }
    },
    methods: {
        emitToggleNavigation() {
            this.$root.$emit('toggleNavigation')
        }
    }
}
</script>

<style lang="scss">
.app-header {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    padding: 10px 15px;
    background: linear-gradient(0deg, #08154B, #08154B);

    &--transparent {
        background: transparent;
    }

    &--with-bg {
        background: linear-gradient(0deg, #08154B, #08154B);
    }

    &__inner {
        display: flex;
        justify-content: space-between;
        width: 100%;
        max-width: 1120px;
        margin: 0 auto;
    }

    &__item {
        display: flex;
        align-items: center;
    }
}
</style>