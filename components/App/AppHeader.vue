<template>
    <header
        class="app-header"
        :class="{ 
            'app-header--bg-transparent': isHomePage,
            'app-header--bg-white': isDashboard,
            'app-header--bg-default': scrollTop > 68 && !isDashboard
        }"
    >
        <div class="app-header__inner">
            <div class="app-header__item">
                <AppLogo />
            </div>
            <div class="app-header__item">
                <Navigation />
            </div>
            <div class="app-header__item app-header__item-logo">
                <HeaderUserInfo />
            </div>
            
            <div class="app-header__item" v-if="windowWidth < 962">
                <NavigationToggler />
            </div>
        </div>
    </header>
</template>

<script>
// mixins
import window from "~/mixins/window";

// components
import AppLogo from "~/components/App/AppLogo";
import Navigation from "~/components/Navigation/Navigation";
import NavigationToggler from "~/components/Navigation/NavigationToggler";
import HeaderUserInfo from "~/components/Header/HeaderUserInfo";

export default {
    mixins: [window],
    components: {
        AppLogo,
        Navigation,
        NavigationToggler,
        HeaderUserInfo
    },
    computed: {
        isHomePage() {
            return this.$route.name === "index";
        },
        isDashboard (){
            return this.$route.name === "dashboard";
        }
    }
};
</script>

<style lang="scss">
.app-header {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 64px;
    padding: 8px 15px;
    background: $color-stratos;

    &--bg-transparent {
        background: transparent;
    }

    &--bg-white {
        background: $color-white;
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
        
        &-logo{
            margin-left: auto;

            @include tablet-big{
                margin: 0;
            }
        }
    }

    @include tablet-big{
        height: 80px;
        padding: 8px 15px;
    }
}
</style>