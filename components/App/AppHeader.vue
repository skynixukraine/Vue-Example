<template>
    <header class="app-header" :class="{ 'app-header--bg-transparent': isHomePage, 'app-header--bg-default': scrollTop > 68 }">
        <div class="app-header__inner">
            <div class="app-header__item">
                <AppLogo />
            </div>
            <div class="app-header__item">
                <AppNavigation />
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
import AppLogo from "~/components/App/AppLogo"
import AppNavigation from "~/components/App/AppNavigation"

export default {
    mixins: [window],
    components: {
        AppLogo,
        AppNavigation,
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
    background: $color-stratos;

    &--bg-transparent {
        background: transparent;
    }

    &--bg-default {
        background: $color-stratos;
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